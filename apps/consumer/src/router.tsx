import {
  createBrowserRouter,
  createRoutesFromElements,
  Outlet,
  Route,
} from "react-router";

// Layouts
import { AppLayout } from "@vbkg/ui";

// Pages
import Dashboard from "./pages/dashboard";
import ResolveConflict from "./pages/knowledge/ResolveConflict";
import ReviewNewData from "./pages/knowledge/ReviewNewData";
import AddDataManually from "./pages/knowledge/AddDataManually";
import MonitorPerformance from "./pages/admin/MonitorPerformance";
import QueryKnowledge from "./pages/user/QueryKnowledge";
import ManageOntology from "./pages/admin/ManageOntology";
import NotificationsPage from "./pages/notifcations";
import ManageUser from "./pages/admin/ManageUser";
import ConfigureDataSource from "./pages/admin/ConfigDataSource";
import ConfigureDataPipeline from "./pages/admin/ConfigDataPipeline";
import SendFeedback from "./pages/user/SendFeedback";
import ManageApiKey from "./pages/user/ManageApiKey";
import CustomVisualization from "./pages/user/CustomVisualization";
import LoginPage from "./pages/auth/Login";
import RegisterPage from "./pages/auth/Register";
import NotFoundPage from "./pages/NotFound";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      {/* Auth routes */}
      <Route
        element={
          <>
            <Outlet />
          </>
        }
      >
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register" element={<RegisterPage />} />
      </Route>

      {/* Protected routes */}
      <Route element={<AppLayout children={<Outlet />} />}>
        <Route
          path="/"
          element={<Dashboard />}
          loader={async () => {
            return {
              stats: {
                nodeCount: 1000,
                relationCount: 500,
                conflictCount: 5,
                userCount: 100,
              },
              recentActivities: [
                {
                  id: "1",
                  type: "success",
                  title: "Thêm node mới",
                  description: "Đã thêm node mới thành công.",
                  time: "2023-10-01T10:00:00Z",
                },
                {
                  id: "2",
                  type: "warning",
                  title: "Cảnh báo xung đột dữ liệu",
                  description: "Có xung đột trong dữ liệu.",
                  time: "2023-10-02T12:00:00Z",
                },
              ],
            };
          }}
        />

        {/* Knowledge Management */}
        <Route path="/resolve-conflict" element={<ResolveConflict />} />
        <Route path="/review-new-data" element={<ReviewNewData />} />
        <Route path="/add-data-manually" element={<AddDataManually />} />

        {/* Administration */}
        <Route path="/monitor-performance" element={<MonitorPerformance />} />
        <Route path="/manage-users" element={<ManageUser />} />
        <Route path="/manage-ontology" element={<ManageOntology />} />
        <Route
          path="/configure-data-source"
          element={<ConfigureDataSource />}
        />
        <Route
          path="/configure-data-pipeline"
          element={<ConfigureDataPipeline />}
        />

        {/* User Interaction */}
        <Route path="/send-feedback" element={<SendFeedback />} />
        <Route path="/manage-api-key" element={<ManageApiKey />} />
        <Route path="/query-knowledge" element={<QueryKnowledge />} />
        <Route
          path="/manage-custom-visualization"
          element={<CustomVisualization />}
        />

        {/* Notifications */}
        <Route path="/notifications" element={<NotificationsPage />} />
      </Route>

      {/* Not Found */}
      <Route path="*" element={<NotFoundPage />} />
    </>,
  ),
);

export default router;
