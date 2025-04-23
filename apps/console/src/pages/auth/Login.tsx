import { AppForm, Card } from "@vbkg/ui";
import { loginSchema } from "@vbkg/schemas";
import { Link } from "react-router";
import { useLoginJson } from "@vbkg/api-client";

export default function Login() {
  const { mutate: login } = useLoginJson({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error(error);
    },
  });

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
            onSubmit={(values) => {
              login(values);
            }}
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
