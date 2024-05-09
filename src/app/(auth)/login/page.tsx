"use client";

import Link from 'next/link'

import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { useState } from "react";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault(); // 阻止默认提交行为

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      const result = await response.json();

      if (result.success) {
        // 存储 JWT 令牌或其他会话信息
        localStorage.setItem("token", result.token);
        setMessage("登录成功！");
      } else {
        setMessage(result.message || "登录失败");
      }
    } catch (error) {
      console.error("Login Error:", error);
      setMessage("发生错误，请重试");
    }
  };

  return (
    <AuthLayout
      title="Sign in to account"
      subtitle={
        <>
          Don’t have an account?{' '}
          <Link href="/register" className="text-cyan-600">
            Sign up
          </Link>{' '}
          for a free trial.
        </>
      }
    >
      <form onSubmit={handleLogin}>
        <div className="space-y-6">
          <TextField
            label="Username"
            name="username"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            name="password"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Sign in to account
        </Button>
      </form>
      {message && <p>{message}</p>}
    </AuthLayout>
  )
}
