// src/app/api/oauth/token/route.ts

import { NextResponse } from "next/server";
import { randomBytes } from "crypto";
import { validateAuthCode, insertAccessToken } from "../../../../../utils/db"; // 假设存在数据库操作工具

export async function POST(request: Request) {
  const { clientId, client_secret, code, grant_type } = await request.json();

  // 校验授权码、客户端凭据和授权类型
  if (grant_type !== "authorization_code" || !code || clientId !== "example_client_id" || client_secret !== "example_client_secret") {
    return NextResponse.json(
      { error: "invalid_grant", error_description: "Invalid authorization code or credentials" },
      { status: 400 }
    );
  }

  // 检查授权码是否有效
  const authCodeData = await validateAuthCode(code, clientId);
  if (!authCodeData) {
    return NextResponse.json({ error: "invalid_grant", error_description: "Authorization code invalid or expired" }, { status: 400 });
  }

  // 生成访问令牌并存储
  const accessToken = randomBytes(32).toString("hex");
  await insertAccessToken({ token: accessToken, userId: authCodeData.userId, clientId, expiresAt: new Date(Date.now() + 3600000) }); // 1 小时后过期

  return NextResponse.json({ access_token: accessToken, token_type: "Bearer", expires_in: 3600 });
}
