import {
  Button,
  Card,
  EntityCard,
  ErrorNotification,
  StatisticCard,
  Table,
} from "@vbkg/ui";
import { useState } from "react";

interface ServiceMetrics {
  id: string;
  name: string;
  status: "Healthy" | "Warning" | "Error";
  cpu: number;
  memory: number;
  requests: number;
  responseTime: number;
  errorRate: number;
}

export default function SystemMonitoring() {
  const [services] = useState<ServiceMetrics[]>([
    {
      id: "1",
      name: "API Gateway",
      status: "Healthy",
      cpu: 45,
      memory: 65,
      requests: 1200,
      responseTime: 120,
      errorRate: 0.1,
    },
    {
      id: "2",
      name: "Authentication Service",
      status: "Healthy",
      cpu: 35,
      memory: 55,
      requests: 800,
      responseTime: 85,
      errorRate: 0.2,
    },
    {
      id: "3",
      name: "Data Pipeline",
      status: "Warning",
      cpu: 85,
      memory: 78,
      requests: 450,
      responseTime: 250,
      errorRate: 2.5,
    },
  ]);

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Monitoring</h1>
        <div className="flex gap-2">
          <select className="border rounded-md px-3 py-2">
            <option value="5m">Last 5 minutes</option>
            <option value="15m">Last 15 minutes</option>
            <option value="1h">Last 1 hour</option>
            <option value="24h">Last 24 hours</option>
          </select>
          <Button variant="outline">Export Metrics</Button>
        </div>
      </div>

      {/* System Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <StatisticCard
          title="Overall Health"
          value={`${((services.filter((s) => s.status === "Healthy").length / services.length) * 100).toFixed(0)}%`}
          trend={{
            value: 5,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Average Response Time"
          value="152ms"
          trend={{
            value: 152,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Error Rate"
          value="0.8%"
          trend={{
            value: 0.8,
            isPositive: false,
          }}
        />
        <StatisticCard
          title="Total Requests/min"
          value="2,450"
          trend={{
            value: 2450,
            isPositive: true,
          }}
        />
      </div>

      {/* Service Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {services.map((service) => (
          <EntityCard
            key={service.id}
            name={service.name}
            id={service.id}
            type="Service"
            properties={[
              { key: "Status", value: service.status },
              { key: "CPU Usage", value: `${service.cpu}%` },
              { key: "Memory Usage", value: `${service.memory}%` },
              { key: "Requests/min", value: service.requests.toString() },
              {
                key: "Avg Response Time",
                value: `${service.responseTime}ms`,
              },
              { key: "Error Rate", value: `${service.errorRate}%` },
            ]}
          />
        ))}
      </div>

      {/* Service Metrics Table */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Detailed Metrics</h2>
        <Table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Status</th>
              <th>CPU</th>
              <th>Memory</th>
              <th>Requests/min</th>
              <th>Response Time</th>
              <th>Error Rate</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map((service) => (
              <tr key={service.id}>
                <td>{service.name}</td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      service.status === "Healthy"
                        ? "bg-green-100 text-green-800"
                        : service.status === "Warning"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {service.status}
                  </span>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          service.cpu > 80
                            ? "bg-red-500"
                            : service.cpu > 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${service.cpu}%` }}
                      />
                    </div>
                    <span className="ml-2">{service.cpu}%</span>
                  </div>
                </td>
                <td>
                  <div className="flex items-center">
                    <div className="w-24 bg-gray-200 rounded-full h-2">
                      <div
                        className={`h-2 rounded-full ${
                          service.memory > 80
                            ? "bg-red-500"
                            : service.memory > 60
                              ? "bg-yellow-500"
                              : "bg-green-500"
                        }`}
                        style={{ width: `${service.memory}%` }}
                      />
                    </div>
                    <span className="ml-2">{service.memory}%</span>
                  </div>
                </td>
                <td>{service.requests}</td>
                <td>{service.responseTime}ms</td>
                <td>{service.errorRate}%</td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        console.log("Restart service:", service.id)
                      }
                    >
                      Restart
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("View logs:", service.id)}
                    >
                      Logs
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Alerts and Warnings */}
      <Card className="p-4">
        <h2 className="text-lg font-semibold mb-4">Active Alerts</h2>
        <div className="space-y-4">
          {services
            .filter((s) => s.status !== "Healthy")
            .map((service) => (
              <ErrorNotification
                key={service.id}
                title={`${service.name} Alert`}
                time={new Date().toLocaleTimeString()}
                id={service.id}
                message={`High resource usage detected: CPU ${service.cpu}%, Memory ${service.memory}%`}
              />
            ))}
        </div>
      </Card>
    </div>
  );
