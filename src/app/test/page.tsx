// src/app/test/page.tsx

'use client';

import { useState, useEffect } from 'react';

export default function AuthorizePage() {
  const [clientId] = useState('example_client_id');
  const [redirectUri] = useState('http://localhost:3000/test');
  const [responseType] = useState('code');
  const [state] = useState('xyz123');

  // 初始化 `token` 状态为空
  const [token, setToken] = useState<string | undefined>('');

  // 使用 `useEffect` 在客户端环境中获取 `localStorage` 数据
  useEffect(() => {
    const tokenFromStorage = localStorage.getItem('token');
    setToken(tokenFromStorage || '');
  }, []);

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

  return (
    <div>
      <h1>Authorize Request</h1>
      <form id="authorize-form" onSubmit={handleSubmit}>
        <input type="hidden" name="client_id" value={clientId} />
        <input type="hidden" name="redirect_uri" value={redirectUri} />
        <input type="hidden" name="response_type" value={responseType} />
        <input type="hidden" name="state" value={state} />
        <input type="hidden" name="token" value={token} />
        <button type="submit">Authorize</button>
      </form>
    </div>
  );
}
