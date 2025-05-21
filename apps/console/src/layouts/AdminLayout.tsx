import { useLogout } from "@vbkg/api-client";
import { AppLayout } from "@vbkg/ui";
import { getSession, setSession } from "@vbkg/utils";
import {
  Database,
  GitGraph,
  Home,
  Monitor,
  Settings,
  Users,
} from "lucide-react";
import { Outlet, useNavigate } from "react-router";
import { queryClient } from "../App";

const AdminLayout = () => {
  const session = getSession();
  const { mutateAsync: logout } = useLogout({});
  const navigate = useNavigate();
  return (
    <AppLayout
      menuItems={[
        {
          title: "Dashboard",
          icon: <Home />,
          path: "/admin/dashboard",
        },
        {
          title: "Users",
          icon: <Users />,
          submenu: [
            {
              title: "Manage User Dashboard",
              path: "/admin/users",
            },
            {
              title: "Manage Users",
              path: "/admin/users/user",
            },
            {
              title: "Manage Roles",
              path: "/admin/users/roles",
            },
            {
              title: "Manage Permissions",
              path: "/admin/users/permissions",
            },
          ],
        },
        {
          title: "Data Sources",
          icon: <Database />,
          path: "/admin/data-sources",
        },
        {
          title: "Data Pipelines",
          icon: <GitGraph />,
          path: "/admin/data-pipelines",
        },
        {
          title: "Monitoring",
          icon: <Monitor />,
          path: "/admin/monitoring",
        },
        {
          title: "Settings",
          icon: <Settings />,
          path: "/admin/settings",
        },
      ]}
      userEmail={session?.user?.email}
      userName={session?.user?.name}
      userAvatar={""}
      onLogout={async () => {
        await logout();
        queryClient.removeQueries();
        setSession(null);
        navigate("/login");
      }}
      profileMenuItems={[
        {
          icon: <Users />,
          label: "Profile",
          onClick: () => {
            // Handle profile click
          },
        },
        {
          icon: <Settings />,
          label: "Settings",
          onClick: () => {
            // Handle settings click
          },
        },
      ]}
    >
      <Outlet />
    </AppLayout>
  );
};

export default AdminLayout;
