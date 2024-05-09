// src/app/api/login/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

// JWT 密钥（需要保存在环境变量中）
const JWT_SECRET = process.env.JWT_SECRET || "your_secret_key";

// 登录 API
export async function POST(request: Request) {
  // 从请求体中获取用户名和密码
  const { username, password } = await request.json();
  console.log('login username and password', username, password);

  // 查找数据库中的用户
  const user = await prisma.user.findUnique({
    where: { username },
  });

  if (!user) {
    return NextResponse.json({ success: false, message: "用户不存在" }, { status: 401 });
  }

  // 验证密码
  const isPasswordValid = await bcrypt.compare(password, user.password);

  if (!isPasswordValid) {
    return NextResponse.json({ success: false, message: "密码错误" }, { status: 401 });
  }

  // 生成 JWT 令牌
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      email: user.email,
    },
    JWT_SECRET,
    { expiresIn: "1h" } // 令牌有效期为 1 小时
  );

  // 返回登录成功的状态和令牌
  return NextResponse.json({
    success: true,
    token,
    user: {
      id: user.id,
      username: user.username,
      email: user.email,
      avatar: user.avatar,
    },
  });
}
