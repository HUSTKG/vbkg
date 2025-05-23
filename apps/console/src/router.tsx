import { Suspense, lazy } from "react";
import { Navigate, type RouteObject, createBrowserRouter } from "react-router";

// Layouts
import { getSession } from "@vbkg/utils";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import ConsoleLayout from "./layouts/ConsoleLayout";
import AdvancedErrorElement from "./pages/Error";

// Auth Pages
const LoginPage = lazy(() => import("./pages/auth/Login"));
const RegisterPage = lazy(() => import("./pages/auth/Register"));
const ForgotPasswordPage = lazy(() => import("./pages/auth/ForgotPassword"));

// Business User Pages
const BusinessDashboard = lazy(() => import("./pages/business/Dashboard"));
const ManageProjects = lazy(() => import("./pages/business/ManageProjects"));
const TeamManagement = lazy(() => import("./pages/business/TeamManagement"));
const DataIntegration = lazy(() => import("./pages/business/DataIntegration"));
const UsageAnalytics = lazy(() => import("./pages/business/UsageAnalytics"));
const BillingSettings = lazy(() => import("./pages/business/BillingSettings"));

// Admin Pages
const AdminDashboard = lazy(() => import("./pages/admin/dashboard"));
const ManageUser = lazy(() => import("./pages/admin/manage-users/users"));
const UserDetail = lazy(
  () => import("./pages/admin/manage-users/users/detail"),
);
const RoleManagement = lazy(() => import("./pages/admin/manage-users/roles"));
const RoleDetail = lazy(
  () => import("./pages/admin/manage-users/roles/detail"),
);
const PermissionManagement = lazy(
  () => import("./pages/admin/manage-users/permissions"),
);
const AssignRole = lazy(
  () => import("./pages/admin/manage-users/roles/assign-role"),
);
const UserDashboard = lazy(
  () => import("./pages/admin/manage-users/dashboard"),
);

const ConfigureDataSource = lazy(() => import("./pages/admin/data-sources"));
const DataSourceDetail = lazy(
  () => import("./pages/admin/data-sources/detail"),
);
const ConfigureDataPipeline = lazy(
  () => import("./pages/admin/data-pipelines"),
);
const CreateDataPipeline = lazy(
  () => import("./pages/admin/data-pipelines/create"),
);
const DataPipelineDetail = lazy(
  () => import("./pages/admin/data-pipelines/detail"),
);
const SystemMonitoring = lazy(() => import("./pages/admin/system-monitoring"));
const SystemSettings = lazy(() => import("./pages/admin/system-settings"));

// Shared Features
const ManageApiKey = lazy(() => import("./pages/shared/ManageApiKey"));
const CustomVisualization = lazy(
  () => import("./pages/shared/CustomVisualization"),
);
const UserProfile = lazy(() => import("./pages/shared/UserProfile"));
const NotFoundPage = lazy(() => import("./pages/NotFound"));

// Loading Component
const PageLoading = () => (
  <div className="min-h-screen flex items-center justify-center">
    <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
  </div>
);

// Role Guard Component
const RoleGuard = ({
  children,
  allowedRoles,
}: {
  children: React.ReactNode;
  allowedRoles: string[];
}) => {
  const session = getSession();
  const userRole = session?.user?.roles;
  if (!userRole || !allowedRoles.some((role) => userRole?.includes(role))) {
    return <Navigate to="/login" replace />;
  }
  return <>{children}</>;
};

// Route Definitions
const routes: RouteObject[] = [
  // Auth Routes
  {
    path: "/",
    element: <AuthLayout />,
    children: [
      {
        path: "login",
        element: (
          <Suspense fallback={<PageLoading />}>
            <LoginPage />
          </Suspense>
        ),
      },
      {
        path: "register",
        element: (
          <Suspense fallback={<PageLoading />}>
            <RegisterPage />
          </Suspense>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <Suspense fallback={<PageLoading />}>
            <ForgotPasswordPage />
          </Suspense>
        ),
      },
    ],
  },

  // Business Routes
  {
    path: "/",
    element: (
      <RoleGuard allowedRoles={["business"]}>
        <ConsoleLayout />
      </RoleGuard>
    ),
    children: [
      {
        index: true,
        element: <Navigate to="/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoading />}>
            <BusinessDashboard />
          </Suspense>
        ),
      },
      {
        path: "projects",
        element: (
          <Suspense fallback={<PageLoading />}>
            <ManageProjects />
          </Suspense>
        ),
      },
      {
        path: "team",
        element: (
          <Suspense fallback={<PageLoading />}>
            <TeamManagement />
          </Suspense>
        ),
      },
      {
        path: "integration",
        element: (
          <Suspense fallback={<PageLoading />}>
            <DataIntegration />
          </Suspense>
        ),
      },
      {
        path: "usage",
        element: (
          <Suspense fallback={<PageLoading />}>
            <UsageAnalytics />
          </Suspense>
        ),
      },
      {
        path: "billing",
        element: (
          <Suspense fallback={<PageLoading />}>
            <BillingSettings />
          </Suspense>
        ),
      },
      // Shared Features for Business Users
      {
        path: "api-keys",
        element: (
          <Suspense fallback={<PageLoading />}>
            <ManageApiKey />
          </Suspense>
        ),
      },
      {
        path: "visualizations",
        element: (
          <Suspense fallback={<PageLoading />}>
            <CustomVisualization />
          </Suspense>
        ),
      },
      {
        path: "profile",
        element: (
          <Suspense fallback={<PageLoading />}>
            <UserProfile />
          </Suspense>
        ),
      },
    ],
  },

  // Admin Routes
  {
    path: "/admin",
    element: (
      <RoleGuard allowedRoles={["admin"]}>
        <AdminLayout />
      </RoleGuard>
    ),
    errorElement: <AdvancedErrorElement />,
    children: [
      {
        index: true,
        element: <Navigate to="/admin/dashboard" replace />,
      },
      {
        path: "dashboard",
        element: (
          <Suspense fallback={<PageLoading />}>
            <AdminDashboard />
          </Suspense>
        ),
      },
      {
        path: "users",
        children: [
          {
            path: "",
            index: true,
            element: (
              <Suspense fallback={<PageLoading />}>
                <UserDashboard />
              </Suspense>
            ),
          },
          {
            path: "user",
            element: (
              <Suspense fallback={<PageLoading />}>
                <ManageUser />
              </Suspense>
            ),
          },
          {
            path: "user/:id",
            element: (
              <Suspense fallback={<PageLoading />}>
                <UserDetail />
              </Suspense>
            ),
          },
          {
            path: "roles",
            element: (
              <Suspense fallback={<PageLoading />}>
                <RoleManagement />
              </Suspense>
            ),
          },
          {
            path: "roles/:id",
            element: (
              <Suspense fallback={<PageLoading />}>
                <RoleDetail />
              </Suspense>
            ),
          },
          {
            path: "roles/assigns",
            element: (
              <Suspense fallback={<PageLoading />}>
                <AssignRole />
              </Suspense>
            ),
          },
          {
            path: "permissions",
            element: (
              <Suspense fallback={<PageLoading />}>
                <PermissionManagement />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "data-sources",
        children: [
          {
            path: "",
            index: true,
            element: (
              <Suspense fallback={<PageLoading />}>
                <ConfigureDataSource />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoading />}>
                <DataSourceDetail />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "data-pipelines",
        children: [
          {
            path: "",
            index: true,
            element: (
              <Suspense fallback={<PageLoading />}>
                <ConfigureDataPipeline />
              </Suspense>
            ),
          },
          {
            path: "create",
            element: (
              <Suspense fallback={<PageLoading />}>
                <CreateDataPipeline />
              </Suspense>
            ),
          },
          {
            path: ":id",
            element: (
              <Suspense fallback={<PageLoading />}>
                <DataPipelineDetail />
              </Suspense>
            ),
          },
          {
            path: ":id/edit",
            element: (
              <Suspense fallback={<PageLoading />}>
                <CreateDataPipeline />
              </Suspense>
            ),
          },
        ],
      },
      {
        path: "monitoring",
        element: (
          <Suspense fallback={<PageLoading />}>
            <SystemMonitoring />
          </Suspense>
        ),
      },
      {
        path: "settings",
        element: (
          <Suspense fallback={<PageLoading />}>
            <SystemSettings />
          </Suspense>
        ),
      },
    ],
  },

  // 404 Route
  {
    path: "*",
    element: (
      <Suspense fallback={<PageLoading />}>
        <NotFoundPage />
      </Suspense>
    ),
  },
];

export const router = createBrowserRouter(routes);

// Export route paths for programmatic navigation
export const ROUTES = {
  // Auth Routes
  LOGIN: "/login",
  REGISTER: "/register",
  FORGOT_PASSWORD: "/forgot-password",

  // Business Routes
  DASHBOARD: "/dashboard",
  PROJECTS: "/projects",
  TEAM: "/team",
  INTEGRATION: "/integration",
  USAGE: "/usage",
  BILLING: "/billing",

  // Admin Routes
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_USERS: "/admin/users",
  ADMIN_DATA_SOURCES: "/admin/data-sources",
  ADMIN_DATA_PIPELINES: "/admin/data-pipelines",
  ADMIN_MONITORING: "/admin/monitoring",
  ADMIN_SETTINGS: "/admin/settings",

  // Shared Features
  API_KEYS: "/api-keys",
  VISUALIZATIONS: "/visualizations",
  PROFILE: "/profile",
} as const;
