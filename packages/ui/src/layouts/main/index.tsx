import { Database, Settings, Users } from "lucide-react";
import React, { useState } from "react";
import { cn } from "../../lib/utils";
import { Header } from "./header";
import Sidebar from "./sidebar";
import { Toaster } from "../../components/ui/sonner";

// Interfaces
export interface MenuSubItem {
  title: string;
  path: string;
}

export interface MenuItem {
  title: string;
  path?: string;
  icon: React.ReactNode;
  submenu?: MenuSubItem[];
}

export interface AppLayoutProps {
  children: React.ReactNode;
  menuItems?: MenuItem[];
  onSearch?: (query: string) => void;
  onNotificationClick?: () => void;
  notificationCount?: number;
  userName?: string;
  userAvatar?: string;
  userEmail?: string;
  onLogout?: () => void;
  profileMenuItems?: {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
  }[];
}

// Default menu items that can be overridden via props
const defaultMenuItems: MenuItem[] = [
  {
    title: "Knowledge Management",
    icon: <Database size={20} />,
    submenu: [
      { title: "Resolve Data Conflicts", path: "/resolve-conflict" },
      { title: "Review New Data", path: "/review-new-data" },
      { title: "Add Data Manually", path: "/add-data-manually" },
    ],
  },
  {
    title: "Monitoring and Administration",
    icon: <Settings size={20} />,
    submenu: [
      { title: "Monitor System Performance", path: "/monitor-performance" },
      { title: "Manage Users", path: "/manage-users" },
      { title: "Manage Ontology Structure", path: "/manage-ontology" },
      { title: "Configure Data Sources", path: "/configure-data-source" },
      { title: "Configure Data Pipeline", path: "/configure-data-pipeline" },
    ],
  },
  {
    title: "User Interaction",
    icon: <Users size={20} />,
    submenu: [
      { title: "Send Feedback", path: "/send-feedback" },
      { title: "Manage API Keys", path: "/manage-api-key" },
      { title: "Query Knowledge", path: "/query-knowledge" },
      {
        title: "Manage Custom Visualization",
        path: "/manage-custom-visualization",
      },
    ],
  },
];

const AppLayout: React.FC<AppLayoutProps> = ({
  children,
  menuItems = defaultMenuItems,
  onSearch,
  onNotificationClick,
  notificationCount = 0,
  userName = "User",
  userAvatar,
  onLogout,
  userEmail,
  profileMenuItems,
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 dark:bg-gray-900">
      {/* Sidebar */}
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        menuItems={menuItems}
      />
      {/* Main Content */}
      <div
        className={cn(
          "w-screen transition-all duration-300",
          isSidebarOpen ? "pl-64" : "pl-20",
        )}
      >
        {/* Top Navigation */}

        <Header
          onSearch={onSearch}
          onNotificationClick={onNotificationClick}
          notificationCount={notificationCount}
          userName={userName}
          userAvatar={userAvatar}
          isSidebarOpen={isSidebarOpen}
          userEmail={userEmail}
          onLogout={onLogout}
          profileMenuItems={profileMenuItems}
        />
        {/* Page Content */}
        <main className="pt-16 h-full overflow-auto">
          <div className="p-6">{children}</div>
        </main>
      </div>
      <Toaster />
    </div>
  );
};

export default AppLayout;
