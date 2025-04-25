import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";
import { initializeApi } from "@vbkg/api-client";
import { getSession } from "@vbkg/utils";

initializeApi({
  baseUrl: import.meta.env.VITE_API_URL! + import.meta.env.VITE_API_VERSION!,
  bearerToken: getSession()?.accessToken,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
