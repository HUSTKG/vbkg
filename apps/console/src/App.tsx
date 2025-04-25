import { RouterProvider } from "react-router";
import { router } from "./router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { initializeApi } from "@vbkg/api-client";

export const queryClient = new QueryClient();

initializeApi({
  baseUrl: import.meta.env.VITE_API_URL! + import.meta.env.VITE_API_VERSION!,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}
