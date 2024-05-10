// utils/db.ts

import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
const JWT_SECRET = process.env.JWT_SECRET || 'your_secret_key';

// 实例化 Prisma 客户端
const prisma = new PrismaClient();

// 定义授权码的类型
interface AuthCodeInput {
    code: string;
    userId: number;
    clientId: string;
    expiresAt: Date;
  }

interface AccessTokenInput {
    token: string;
    userId: number;
    clientId: string;
    expiresAt: Date;
  }

interface User {
    id: number;
    email: string;
    tel: string;
    username: string;
    password: string;
    name: string;
  }

// // 获取用户信息（通过会话或其他身份标识）
// export async function getUserFromSession(session: any) {
//   // 假设 `session` 包含用户 ID
//   const userId = session.userId;
//   if (!userId) return null;

//   return await prisma.user.findUnique({ where: { id: userId } });
// }

// 从请求中获取用户信息
export async function getUserFromSession(request: Request) {
  // 从请求头或 Cookies 中获取 JWT 令牌
  const authHeader = request.headers.get('Authorization');
  console.log('utils.db request.headers.authHeader', authHeader);
  const token = authHeader && authHeader.split(' ')[1]; // 假设 `Bearer <token>` 格式
  if (!token) {
    console.log('No authorization token found');
    return null;
  }

  try {
    // 验证并解码 JWT 令牌
    const decoded = jwt.verify(token, JWT_SECRET) as jwt.JwtPayload;
    console.log('Decoded JWT:', decoded);

    // 查询用户数据库，以确保用户信息匹配并有效
    const user = await prisma.user.findUnique({ where: { id: decoded.id } });
    if (!user) {
      console.log('User not found in the database');
      return null;
    }

    return user;
  } catch (error) {
    console.error('Invalid JWT:', error);
    return null;
  }
}

// 插入新的授权码
export async function insertAuthCode({ code, userId, clientId, expiresAt }: AuthCodeInput) {
  return await prisma.authCode.create({
    data: {
      code,
      userId,
      clientId,
      expiresAt,
    },
  });
}

// 验证授权码
export async function validateAuthCode(code: string, clientId: string) {
  const authCode = await prisma.authCode.findUnique({ where: { code } });

  // 检查授权码是否存在、是否属于请求的客户端，并且未过期
  if (authCode && authCode.clientId === clientId && authCode.expiresAt > new Date()) {
    return authCode;
  }
  return null;
}

// 插入新的访问令牌
export async function insertAccessToken({ token, userId, clientId, expiresAt }: AccessTokenInput) {
  return await prisma.accessToken.create({
    data: {
      token,
      userId,
      clientId,
      expiresAt,
    },
  });
}

// 验证用户身份（使用用户名和密码）
export async function verifyUserCredentials(username: string, password: string) {
  const user = await prisma.user.findUnique({ where: { username } });

  // 检查用户是否存在以及密码是否匹配
  if (user && await bcrypt.compare(password, user.password)) {
    return user;
  }
  return null;
}

// 使用邮箱或手机号查找用户
export async function findUserByEmailOrTel(emailOrTel: string) {
  return await prisma.user.findFirst({
    where: {
      OR: [{ email: emailOrTel }, { tel: emailOrTel }],
    },
  });
}

// 添加新用户
export async function createUser({ email, tel, username, password, name }: User) {
  // 生成加密后的密码
  const passwordHash = await bcrypt.hash(password, 10);

  return await prisma.user.create({
    data: {
      email,
      tel,
      username,
      password: passwordHash,
      name,
    },
  });
}
