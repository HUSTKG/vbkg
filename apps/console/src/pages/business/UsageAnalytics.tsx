// packages/console/src/pages/business/UsageAnalytics.tsx
import { useState } from "react";
import { Card, Button, Table, StatisticCard, ResultCard } from "@vbkg/ui";

interface UsageMetrics {
  id: string;
  project: string;
  apiCalls: number;
  entities: number;
  storage: number;
  users: number;
  lastUpdated: string;
}

export default function UsageAnalytics() {
  const [metrics] = useState<UsageMetrics[]>([
    {
      id: "1",
      project: "Project A",
      apiCalls: 15000,
      entities: 1500,
      storage: 2.5,
      users: 5,
      lastUpdated: "2024-04-14",
    },
    {
      id: "2",
      project: "Project B",
      apiCalls: 25000,
      entities: 2300,
      storage: 3.8,
      users: 8,
      lastUpdated: "2024-04-14",
    },
  ]);

  const totalApiCalls = metrics.reduce((acc, curr) => acc + curr.apiCalls, 0);
  const totalStorage = metrics.reduce((acc, curr) => acc + curr.storage, 0);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Usage Analytics</h1>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2">
            <option value="7d">Last 7 days</option>
            <option value="30d">Last 30 days</option>
            <option value="90d">Last 90 days</option>
          </select>
          <Button variant="outline">Download Report</Button>
        </div>
      </div>

      {/* Overview Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Total API Calls"
          value={totalApiCalls.toLocaleString()}
          trend={{
            value: totalApiCalls,
            isPositive: totalApiCalls > 0,
          }}
        />
        <StatisticCard
          title="Active Projects"
          value={metrics.length}
          trend={{
            value: metrics.length,
            isPositive: metrics.length > 0,
          }}
        />
        <StatisticCard
          title="Storage Used"
          value={`${totalStorage.toFixed(1)} GB`}
          trend={{
            value: totalStorage,
            isPositive: totalStorage > 0,
          }}
        />
        <StatisticCard
          title="Total Users"
          value={metrics.reduce((acc, curr) => acc + curr.users, 0)}
          trend={{
            value: metrics.reduce((acc, curr) => acc + curr.users, 0),
            isPositive: metrics.reduce((acc, curr) => acc + curr.users, 0) > 0,
          }}
        />
      </div>

      {/* Usage Details */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Usage by Project</h2>
        <Table>
          <thead>
            <tr>
              <th>Project</th>
              <th>API Calls</th>
              <th>Entities</th>
              <th>Storage (GB)</th>
              <th>Users</th>
              <th>Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {metrics.map((metric) => (
              <tr key={metric.id}>
                <td>{metric.project}</td>
                <td>{metric.apiCalls.toLocaleString()}</td>
                <td>{metric.entities.toLocaleString()}</td>
                <td>{metric.storage.toFixed(1)}</td>
                <td>{metric.users}</td>
                <td>{metric.lastUpdated}</td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Project Insights */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {metrics.map((metric) => (
          <ResultCard
            key={metric.id}
            name={metric.project}
            id={metric.id}
            type="project"
            properties={[
              {
                label: "API Usage",
                value: `${((metric.apiCalls / totalApiCalls) * 100).toFixed(1)}%`,
              },
              { label: "Storage", value: `${metric.storage.toFixed(1)} GB` },
              { label: "Active Users", value: metric.users.toString() },
              { label: "Last Activity", value: metric.lastUpdated },
            ]}
          />
        ))}
      </div>

      {/* Recommendations Card */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Recommendations</h2>
        <div className="space-y-4">
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="font-medium">Optimize API Usage</h3>
              <p className="text-gray-600">
                Consider implementing caching for frequently accessed data to
                reduce API calls.
              </p>
            </div>
            <Button variant="outline" size="sm">
              Learn More
            </Button>
          </div>
          <div className="flex items-start space-x-4">
            <div className="flex-1">
              <h3 className="font-medium">Storage Management</h3>
              <p className="text-gray-600">
                Clean up unused entities to optimize storage usage.
              </p>
            </div>
            <Button variant="outline" size="sm">
              View Guide
            </Button>
          </div>
        </div>
      </Card>
    </div>
  );
}
