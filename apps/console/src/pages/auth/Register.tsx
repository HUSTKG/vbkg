import { useState } from "react";
import { Link, useNavigate } from "react-router";
import {
  Card,
  Button,
  Input,
  ErrorNotification,
  SuccessNotification,
  AppForm,
} from "@vbkg/ui";
import { registerSchema } from "@vbkg/schemas";

export default function Register() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-2 text-gray-600">Register your organization</p>
        </div>

        <Card className="p-8">
          <AppForm
            fields={[
              {
                label: "Email",
                name: "email",
                type: "email",
                placeholder: "Enter your email",
                required: true,
              },
              {
                label: "Password",
                name: "password",
                type: "password",
                placeholder: "Enter your password",
                required: true,
              },
              {
                label: "Confirm Password",
                name: "confirmPassword",
                type: "password",
                placeholder: "Confirm your password",
                required: true,
              },
              {
                label: "Full Name",
                name: "fullname",
                type: "text",
                placeholder: "Enter your full name",
                required: true,
              },
            ]}
            onSubmit={(values) => {
              console.log(values);
              // Simulate a successful registration
            }}
            schema={registerSchema}
          />
        </Card>

        <p className="mt-4 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            to="/login"
            className="font-medium text-blue-600 hover:text-blue-500"
          >
            Sign in
          </Link>
        </p>
      </div>
    </div>
  );
}
