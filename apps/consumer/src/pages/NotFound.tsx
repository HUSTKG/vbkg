// pages/NotFound.tsx
import { Button } from "@vbkg/ui";
import { useNavigate } from "react-router";

export default function NotFoundPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <h1 className="text-6xl font-bold text-gray-900">404</h1>
        <p className="text-xl text-gray-600 mt-4">Page not found</p>
        <p className="text-gray-500 mt-2">
          The page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-6">
          <Button onClick={() => navigate("/")} className="mx-auto">
            Return to Home
          </Button>
        </div>
      </div>
    </div>
  );
}
