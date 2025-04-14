// pages/auth/Login.tsx
import { useState } from "react";
import { Card, Input, Button, ErrorNotification } from "@vbkg/ui";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      // Implement login logic here
      console.log("Login attempt", { email, password });
    } catch (err) {
      setError("Invalid credentials");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Welcome Back</h1>
          <p className="text-gray-600">Please sign in to continue</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <ErrorNotification
              id="login-error"
              time={new Date().toISOString()}
              title="Error"
              message={error}
            />
          )}

          <Button type="submit" className="w-full">
            Sign In
          </Button>

          <div className="text-center text-sm">
            <a href="/register" className="text-blue-600 hover:underline">
              Don't have an account? Sign up
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}
