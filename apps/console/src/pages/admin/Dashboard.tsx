import {
  Button,
  Card,
  ConflictDetectedActivity,
  DataAddedActivity,
  ErrorActivity,
  InfoActivity,
  StatisticCard,
  Table,
} from "@vbkg/ui";
import { useState } from "react";

interface SystemStatus {
  component: string;
  status: "Healthy" | "Warning" | "Error";
  uptime: string;
  lastChecked: string;
}

export default function AdminDashboard() {
  const [systemStatus] = useState<SystemStatus[]>([
    {
      component: "API Gateway",
      status: "Healthy",
      uptime: "99.99%",
      lastChecked: "2024-04-16 10:30",
    },
    {
      component: "Database",
      status: "Healthy",
      uptime: "99.95%",
      lastChecked: "2024-04-16 10:30",
    },
    {
      component: "Data Pipeline",
      status: "Warning",
      uptime: "98.50%",
      lastChecked: "2024-04-16 10:30",
    },
    {
      component: "Storage Service",
      status: "Healthy",
      uptime: "99.97%",
      lastChecked: "2024-04-16 10:30",
    },
  ]);

  const [recentActivities] = useState([
    {
      type: "data-added",
      title: "Large Data Import",
      description: "Successfully imported 10,000 new entities",
      timestamp: "2024-04-16T10:30:00Z",
    },
    {
      type: "error",
      title: "Pipeline Error",
      description: "Data pipeline failed for Project X",
      timestamp: "2024-04-16T09:45:00Z",
    },
    {
      type: "conflict",
      title: "Schema Conflict",
      description: "Entity schema conflict detected in integration",
      timestamp: "2024-04-16T09:15:00Z",
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Admin Dashboard</h1>
        <Button variant="outline">Download System Report</Button>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Users"
          value="1,234"
          trend={{
            value: 1234,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Active Organizations"
          value="45"
          trend={{
            value: 45,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="System Uptime"
          value="99.95%"
          trend={{
            value: 99.95,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Open Issues"
          value="5"
          trend={{
            value: 5,
            isPositive: false,
          }}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* System Status */}
        <div className="lg:col-span-2">
          <Card className="p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-lg font-semibold">System Status</h2>
              <Button variant="outline" size="sm">
                Refresh
              </Button>
            </div>
            <Table>
              <thead>
                <tr>
                  <th>Component</th>
                  <th>Status</th>
                  <th>Uptime</th>
                  <th>Last Checked</th>
                </tr>
              </thead>
              <tbody>
                {systemStatus.map((status, index) => (
                  <tr key={index}>
                    <td>{status.component}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          status.status === "Healthy"
                            ? "bg-green-100 text-green-800"
                            : status.status === "Warning"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                        }`}
                      >
                        {status.status}
                      </span>
                    </td>
                    <td>{status.uptime}</td>
                    <td>{status.lastChecked}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card>

          {/* Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">System Maintenance</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Run System Check
                </Button>
                <Button variant="outline" className="w-full">
                  Clear Cache
                </Button>
                <Button variant="outline" className="w-full">
                  Backup Database
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Security</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  View Security Logs
                </Button>
                <Button variant="outline" className="w-full">
                  Check Access Logs
                </Button>
                <Button variant="outline" className="w-full">
                  Update SSL Certificates
                </Button>
              </div>
            </Card>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => {
                switch (activity.type) {
                  case "data-added":
                    return (
                      <DataAddedActivity
                        key={index}
                        title={activity.title}
                        description={activity.description}
                        time={activity.timestamp}
                      />
                    );
                  case "error":
                    return (
                      <ErrorActivity
                        key={index}
                        title={activity.title}
                        description={activity.description}
                        time={activity.timestamp}
                      />
                    );
                  case "conflict":
                    return (
                      <ConflictDetectedActivity
                        key={index}
                        title={activity.title}
                        description={activity.description}
                        time={activity.timestamp}
                      />
                    );
                  default:
                    return (
                      <InfoActivity
                        key={index}
                        title={activity.title}
                        description={activity.description}
                        time={activity.timestamp}
                      />
                    );
                }
              })}
            </div>
          </Card>

          {/* Critical Alerts */}
          <Card className="p-4 bg-red-50">
            <h2 className="text-lg font-semibold text-red-700 mb-4">
              Critical Alerts
            </h2>
            <div className="space-y-2">
              <ErrorActivity
                title="High Memory Usage"
                description="Server memory usage exceeds 85%"
                time="2024-04-16T10:15:00Z"
              />
              <ErrorActivity
                title="Failed Login Attempts"
                description="Multiple failed login attempts detected"
                time="2024-04-16T09:30:00Z"
              />
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
