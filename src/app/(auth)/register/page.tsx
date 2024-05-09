"use client";

import Link from 'next/link'
import { AuthLayout } from '@/components/AuthLayout'
import { Button } from '@/components/Button'
import { TextField } from '@/components/Fields'
import { useState } from "react";

export default function Register() {

  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    tel: "",
    name: "",
  });
  const [message, setMessage] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (result.success) {
        setMessage("注册成功！");
      } else {
        setMessage(result.message || "注册失败");
      }
    } catch (error) {
      console.error("Register Error:", error);
      setMessage("发生错误，请重试");
    }
  };

  return (
    <AuthLayout
      title="Sign up for an account"
      subtitle={
        <>
          Already registered?{' '}
          <Link href="/login" className="text-cyan-600">
            Sign in
          </Link>{' '}
          to your account.
        </>
      }
    >
      <form onSubmit={handleRegister}>
        <div className="grid grid-cols-2 gap-6">
          <TextField
            label="name"
            name="name"
            type="text"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <TextField
            label="username"
            name="username"
            type="text"
            value={formData.username}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Email address"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Telephone Number"
            name="tel"
            type="text"
            value={formData.tel}
            onChange={handleChange}
            required
          />
          <TextField
            className="col-span-full"
            label="Password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <Button type="submit" color="cyan" className="mt-8 w-full">
          Get started today
        </Button>
      </form>
      {message && <p>{message}</p>}
    </AuthLayout>
  )
}
