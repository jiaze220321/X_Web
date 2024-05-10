// src/app/api/oauth/authorize/route.ts

import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { getUserFromSession, insertAuthCode } from "../../../../../utils/db"; // 假设存在数据库操作工具
console.log('this is authorize route');

export async function GET(request: Request) {
  const url = new URL(request.url);
  // console.log('url', url);
  // console.log('request.headers', request.headers);
  // console.log('request.headers.cookie', request.headers.get('cookie'));
  const clientId = url.searchParams.get('client_id');
  const redirectUri = url.searchParams.get('redirect_uri');
  const responseType = url.searchParams.get('response_type');
  const state = url.searchParams.get('state');
  const token = url.searchParams.get('token');
  console.log('token~~~~~', token);

  // 验证客户端 ID、重定向 URI 和响应类型
  if (!clientId || !redirectUri || responseType !== "code") {
    return NextResponse.json(
      { error: "invalid_request", error_description: "Invalid authorization request" },
      { status: 400 }
    );
  }

  // 检查用户是否登录
  const user = await getUserFromSession(request);
  console.log('user', user);
  if (!user) {
    // 用户未登录，重定向到登录页面
    // 使用完整的 URL 重定向到登录页面，并附加原始授权请求的 URL
    console.log('user not login');
    const absoluteLoginUrl = `http://localhost:3000/login?redirect=${encodeURIComponent(request.url)}`;
    console.log('absoluteLoginUrl', absoluteLoginUrl);
    return NextResponse.redirect(absoluteLoginUrl);
  }

  // 生成授权码并保存
  const authorizationCode = randomBytes(16).toString("hex");
  await insertAuthCode({ code: authorizationCode, userId: user.id, clientId, expiresAt: new Date(Date.now() + 600000) }); // 10 分钟后过期

  // 返回到客户端应用，附带授权码
  const redirectUrl = `${redirectUri}?code=${authorizationCode}&state=${state}`;
  console.log('redirectUrl');
  console.log(`Redirect URL: ${redirectUrl}`);
  return NextResponse.redirect(redirectUrl);
}