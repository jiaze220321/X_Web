// src/app/test/page.tsx

'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/Button'

export default function AuthorizePage() {
  const [clientId] = useState('example_client_id');
  // const [clientId] = useState('Ov23liY2rg1xvGNkw6pX');
  const [redirectUri] = useState('http://localhost:3000/test');
  const [responseType] = useState('code');
  const [state] = useState('xyz123');

  const [token, setToken] = useState<string | undefined>('');
  const [authorizationCode, setAuthorizationCode] = useState<string | undefined>('');
  const [accessToken, setAccessToken] = useState<string | undefined>('');

  // 使用 `useEffect` 在客户端环境中获取 `localStorage` 数据
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage || '');

    const currentUrl = new URL(window.location.href);
    const searchParams = new URLSearchParams(currentUrl.search);
    const code = searchParams.get('authorizationCode');  // 确保这里的参数名称与URL中的一致
    console.log('Authorization Code~~~~~:', code);
    setAuthorizationCode(code || '');
  }, []);

  useEffect(() => {
    if(authorizationCode) {
      fetchAccessToken();
    }
  }, [authorizationCode]);

  console.log('token---', token);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // 防止默认表单提交
    const formData = new FormData(e.currentTarget);

    // 构建查询参数的字符串
    const params = new URLSearchParams();
    formData.forEach((value, key) => params.append(key, String(value)));
    console.log('params', params.toString());

    // 重定向到指定的授权 URL
    const url = `http://localhost:3000/api/oauth/authorize?${params.toString()}`;
    window.location.href = url;
  };

  // 使用授权码获取访问令牌
  const fetchAccessToken = async () => {
    const body = {
      grant_type: 'authorization_code',
      code: authorizationCode || '',
      clientId: clientId,
      client_secret: '3dff924cd7ce3718220b73c9103c0b999841ed0b',
      redirectUri: redirectUri
    };

    try {
      const response = await fetch('http://localhost:3000/api/oauth/token', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(body),
      });

      const data = await response.json();
      if (data.access_token) {
        setAccessToken(data.access_token);
        console.log('访问令牌:', data.access_token);
      } else {
        console.error('获取访问令牌失败:', data);
      }
    } catch (error) {
      console.error('请求访问令牌过程中发生错误:', error);
    }
  };

  return (
    <div>
      <h1>Authorize Request</h1>
      <form id="authorize-form" onSubmit={handleSubmit}>
        <input type="hidden" name="client_id" value={clientId} />
        <input type="hidden" name="redirect_uri" value={redirectUri} />
        <input type="hidden" name="response_type" value={responseType} />
        <input type="hidden" name="state" value={state} />
        <input type="hidden" name="token" value={token} />
        <Button type="submit">Authorize</Button>
        {/* {!accessToken && (
          <div>
            <button type="submit">Authorize</button>
          </div>
        )} */}
      </form>
      {authorizationCode && (
        <div>
          {/* <button onClick={fetchAccessToken}>Get Access Token</button> */}
          <p>Authorization Code: {authorizationCode}</p>
          <p>Access token: {accessToken}</p>
        </div>
      )}
    </div>
  );
}
