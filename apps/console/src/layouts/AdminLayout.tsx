import {
  AppLayout,
  Database,
  Graph,
  Home,
  Monitor,
  Settings,
  Users,
} from "@vbkg/ui";
import { getSession, setSession } from "@vbkg/utils";
import { Outlet } from "react-router";
import { queryClient } from "../App";

const AdminLayout = () => {
  const session = getSession();
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
          path: "/admin/users",
        },
        {
          title: "Data Sources",
          icon: <Database />,
          path: "/admin/data-sources",
        },
        {
          title: "Data Pipelines",
          icon: <Graph />,
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
      onLogout={() => {
        setSession(null);
        queryClient.removeQueries();
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
