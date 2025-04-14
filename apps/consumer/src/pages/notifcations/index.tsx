// src/pages/Notifications.tsx
import { EmptyState, NotificationItem } from "@vbkg/ui";
import {
    AlertCircle,
    AlertTriangle,
    Bell,
    CheckCircle,
    Info
} from "lucide-react";
import { useState } from "react";

interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "success" | "warning" | "error";
  read: boolean;
  notification: boolean;
  time: string;
}

const NotificationsPage = () => {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const handleMarkAsRead = async (id: string | number) => {};

  const handleMarkAllAsRead = async () => {};

  const handleDeleteNotification = async (id: string | number) => {};

  const filteredNotifications = notifications.filter((notification) => {
    if (filter === "all") return true;
    return !notification.notification;
  });

  const getNotificationIcon = (
    type: "info" | "success" | "warning" | "error",
  ) => {
    switch (type) {
      case "success":
        return <CheckCircle size={16} />;
      case "warning":
        return <AlertTriangle size={16} />;
      case "error":
        return <AlertCircle size={16} />;
      case "info":
      default:
        return <Info size={16} />;
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (notifications.length === 0) {
    return (
      <EmptyState
        title="Không có thông báo"
        description="Bạn không có thông báo nào."
        icon={<Bell size={48} className="text-gray-400" />}
        bordered
      />
    );
  }

  const unreadCount = notifications.filter((n) => !n.read).length;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Thông báo
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Quản lý thông báo từ hệ thống
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <h2 className="font-medium text-lg">Thông báo của bạn</h2>
            {unreadCount > 0 && (
              <span className="ml-2 bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded dark:bg-blue-900 dark:text-blue-300">
                {unreadCount} chưa đọc
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <div className="flex rounded-md overflow-hidden">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1 text-sm ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("unread")}
                className={`px-3 py-1 text-sm ${
                  filter === "unread"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Chưa đọc
              </button>
            </div>

            {unreadCount > 0 && (
              <button
                onClick={handleMarkAllAsRead}
                className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                Đánh dấu tất cả đã đọc
              </button>
            )}
          </div>
        </div>

        <div>
          {filteredNotifications.length > 0 ? (
            <div>
              {filteredNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  id={notification.id}
                  title={notification.title}
                  message={notification.message}
                  time={notification.time}
                  type={notification.type}
                  read={notification.read}
                  icon={getNotificationIcon(notification.type)}
                  onMarkAsRead={handleMarkAsRead}
                  onDelete={handleDeleteNotification}
                />
              ))}
            </div>
          ) : (
            <div className="p-8 text-center text-gray-500 dark:text-gray-400">
              {filter === "unread"
                ? "Không có thông báo chưa đọc"
                : "Không có thông báo nào"}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default NotificationsPage;
