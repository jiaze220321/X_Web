// src/app/api/register/route.ts
import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

export async function POST(request: Request) {
  // 从请求体中获取用户数据
  const { username, email, password, tel, name} = await request.json();
  console.log('register username and password', username, password);

  // 检查用户名或邮箱是否已存在
  const existingUser = await prisma.user.findFirst({
    where: {
      OR: [{ username }, { email }, { tel }],
    },
  });

  if (existingUser) {
    return NextResponse.json(
      { success: false, message: "用户名/邮箱/电话已存在" },
      { status: 400 }
    );
  }

  // 哈希密码
  const hashedPassword = await bcrypt.hash(password, 10);

  // 插入新用户
  try {
    const newUser = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
        tel, // 使用表单或默认值
        name,
      },
    });

    return NextResponse.json({ success: true, user: newUser });
  } catch (error) {
    console.error("Error creating new user:", error);
    return NextResponse.json({ success: false, message: "注册失败" }, { status: 500 });
  }
}
