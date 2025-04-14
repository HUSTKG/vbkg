// pages/auth/Register.tsx
import { useState } from "react";
import {
  Card,
  Input,
  Button,
  ErrorNotification,
  SuccessNotification,
} from "@vbkg/ui";

export default function RegisterPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess(false);

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Implement registration logic here
      console.log("Registration attempt", formData);
      setSuccess(true);
    } catch (err) {
      setError("Registration failed");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <Card className="w-full max-w-md p-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-bold">Create Account</h1>
          <p className="text-gray-600">Sign up to get started</p>
        </div>

        <form onSubmit={handleRegister} className="space-y-6">
          <div className="space-y-2">
            <label className="text-sm font-medium">Full Name</label>
            <Input
              name="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Email</label>
            <Input
              type="email"
              name="email"
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Password</label>
            <Input
              type="password"
              name="password"
              placeholder="Create a password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Confirm Password</label>
            <Input
              type="password"
              name="confirmPassword"
              placeholder="Confirm your password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
          </div>

          {error && (
            <ErrorNotification
              id="register-error"
              time={new Date().toISOString()}
              title="Error"
              message={error}
            />
          )}
          {success && (
            <SuccessNotification
              id="register-success"
              time={new Date().toISOString()}
              title="Success"
              message="Registration successful! Please check your email to verify your account."
            />
          )}

          <Button type="submit" className="w-full">
            Sign Up
          </Button>

          <div className="text-center text-sm">
            <a href="/login" className="text-blue-600 hover:underline">
              Already have an account? Sign in
            </a>
          </div>
        </form>
      </Card>
    </div>
  );
}
