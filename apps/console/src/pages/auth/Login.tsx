// packages/console/src/pages/auth/Login.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import { Card, Button, Input, ErrorNotification, AppForm } from "@vbkg/ui";
import { loginSchema } from "@vbkg/utils";

export default function Login() {
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
  };


  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Console</h1>
          <p className="mt-2 text-gray-600">Sign in to your account</p>
        </div>

        <Card className="p-8">
          <AppForm
            schema={loginSchema}
            fields={[
              {
                label: "Email",
                name: "email",
                type: "email",
              },
              {
                label: "Password",
                name: "password",
                type: "password",
              },
            ]}
          />
        </Card>

        <p className="mt-4 text-center text-sm text-gray-600">
          Don't have an account?{" "}
          <Link
            to="/register"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign up
          </Link>
        </p>
      </div>
    </div>
  );
}
