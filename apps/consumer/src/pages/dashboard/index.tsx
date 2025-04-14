// src/pages/Dashboard.tsx
import { useLoaderData } from "react-router";
import { StatisticCard, RecentActivityItem } from "@vbkg/ui";
import {
  Database,
  Activity,
  AlertTriangle,
  Users,
  Plus,
  FileText,
  AlertCircle,
} from "lucide-react";

interface LoaderData {
  stats: {
    nodeCount: number;
    relationCount: number;
    conflictCount: number;
    userCount: number;
  };
  recentActivities: Array<{
    id: string;
    type: "success" | "warning" | "error" | "info";
    title: string;
    description: string;
    time: string;
  }>;
}

const Dashboard = () => {
  const { stats, recentActivities } = useLoaderData() as LoaderData;

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Dashboard
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Xem tổng quan về hệ thống Knowledge Graph
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatisticCard
          title="Số lượng node"
          value={stats.nodeCount.toLocaleString()}
          icon={<Database size={20} className="text-white" />}
          color="blue"
        />
        <StatisticCard
          title="Số lượng quan hệ"
          value={stats.relationCount.toLocaleString()}
          icon={<Activity size={20} className="text-white" />}
          color="green"
        />
        <StatisticCard
          title="Xung đột cần giải quyết"
          value={stats.conflictCount.toString()}
          icon={<AlertTriangle size={20} className="text-white" />}
          color="yellow"
        />
        <StatisticCard
          title="Người dùng"
          value={stats.userCount.toString()}
          icon={<Users size={20} className="text-white" />}
          color="purple"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold">Hoạt động gần đây</h3>
          </div>
          <div className="p-5">
            {recentActivities.length > 0 ? (
              <div className="space-y-4">
                {recentActivities.map((activity) => {
                  let icon;
                  switch (activity.type) {
                    case "success":
                      icon = <Plus size={16} />;
                      break;
                    case "warning":
                      icon = <AlertTriangle size={16} />;
                      break;
                    case "error":
                      icon = <AlertCircle size={16} />;
                      break;
                    case "info":
                    default:
                      icon = <FileText size={16} />;
                  }

                  return (
                    <RecentActivityItem
                      key={activity.id}
                      title={activity.title}
                      time={activity.time}
                      icon={icon}
                      description={activity.description}
                      status={activity.type}
                    />
                  );
                })}
              </div>
            ) : (
              <p className="text-center text-gray-500 dark:text-gray-400">
                Không có hoạt động nào gần đây
              </p>
            )}
          </div>
        </div>

        <div className="bg-white dark:bg-gray-800 rounded-lg shadow">
          <div className="p-5 border-b border-gray-200 dark:border-gray-700">
            <h3 className="font-semibold">Hiệu năng hệ thống</h3>
          </div>
          <div className="p-5">
            <div className="space-y-5">
              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Memory Usage
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    65%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-blue-600 h-2.5 rounded-full"
                    style={{ width: "65%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    CPU Load
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    42%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-green-600 h-2.5 rounded-full"
                    style={{ width: "42%" }}
                  ></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Storage
                  </span>
                  <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    89%
                  </span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                  <div
                    className="bg-amber-500 h-2.5 rounded-full"
                    style={{ width: "89%" }}
                  ></div>
                </div>
              </div>

              <div className="pt-4">
                <a
                  href="/monitor-performance"
                  className="flex items-center text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300"
                >
                  <span className="mr-1">Xem chi tiết hiệu năng</span>
                  <Activity size={16} />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
