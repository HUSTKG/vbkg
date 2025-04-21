// packages/console/src/pages/admin/SystemSettings.tsx
import {
    Button,
    Card,
    ConfirmDialog,
    ErrorNotification,
    SuccessNotification,
    Table,
    Tabs,
    TabsContent,
    TabsList,
    TabsTrigger,
} from "@vbkg/ui";
import { useState } from "react";

interface SystemConfig {
  key: string;
  value: string;
  description: string;
  category: "Security" | "Performance" | "Integration" | "Notifications";
  lastModified: string;
}

export default function SystemSettings() {
  const [configs, setConfigs] = useState<SystemConfig[]>([
    {
      key: "MAX_API_REQUESTS",
      value: "1000",
      description: "Maximum API requests per minute per user",
      category: "Performance",
      lastModified: "2024-04-16",
    },
    {
      key: "SESSION_TIMEOUT",
      value: "30",
      description: "Session timeout in minutes",
      category: "Security",
      lastModified: "2024-04-15",
    },
    {
      key: "ENABLE_2FA",
      value: "true",
      description: "Enforce two-factor authentication",
      category: "Security",
      lastModified: "2024-04-14",
    },
  ]);

  const [showEditDialog, setShowEditDialog] = useState(false);
  const [selectedConfig, setSelectedConfig] = useState<SystemConfig | null>(
    null,
  );
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleSaveConfig = () => {
    setShowEditDialog(false);
    setNotification({
      type: "success",
      message: "Configuration updated successfully",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">System Settings</h1>
        <Button onClick={() => console.log("Export settings")}>
          Export Settings
        </Button>
      </div>

      {/* Notifications */}
      {notification &&
        (notification.type === "success" ? (
          <SuccessNotification
            title="Success"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ) : (
          <ErrorNotification
            title="Error"
            message={notification.message}
            onDelete={() => setNotification(null)}
            id="notification"
            time={new Date().toLocaleTimeString()}
          />
        ))}

      {/* Settings Categories */}
      <Tabs defaultValue="security">
        <TabsList>
          {[
            { label: "Security", value: "security" },
            { label: "Performance", value: "performance" },
            { label: "Integration", value: "integration" },
            { label: "Notifications", value: "notifications" },
          ].map((tab) => (
            <TabsTrigger value={tab.value} key={tab.value}>
              {tab.label}
            </TabsTrigger>
          ))}
        </TabsList>
        {/* Security Settings */}
        <TabsContent value="security" className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">
              Security Configurations
            </h2>
            <Table>
              <thead>
                <tr>
                  <th>Setting</th>
                  <th>Value</th>
                  <th>Description</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {configs
                  .filter((config) => config.category === "Security")
                  .map((config) => (
                    <tr key={config.key}>
                      <td>{config.key}</td>
                      <td>{config.value}</td>
                      <td>{config.description}</td>
                      <td>{config.lastModified}</td>
                      <td>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedConfig(config);
                            setShowEditDialog(true);
                          }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>

          {/* Security Quick Actions */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h3 className="font-semibold mb-2">Security Checks</h3>
              <div className="space-y-2">
                <Button variant="outline" className="w-full">
                  Run Security Audit
                </Button>
                <Button variant="outline" className="w-full">
                  Update SSL Certificates
                </Button>
                <Button variant="outline" className="w-full">
                  Review Access Logs
                </Button>
              </div>
            </Card>

            <Card className="p-4">
              <h3 className="font-semibold mb-2">Authentication Settings</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <span>Enforce 2FA</span>
                  <input type="checkbox" checked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span>Password Expiry</span>
                  <input type="checkbox" checked className="toggle" />
                </div>
                <div className="flex items-center justify-between">
                  <span>IP Whitelisting</span>
                  <input type="checkbox" className="toggle" />
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        {/* Performance Settings */}
        <TabsContent value="performance" className="space-y-6">
          <Card className="p-4">
            <h2 className="text-lg font-semibold mb-4">Performance Settings</h2>
            <Table>
              <thead>
                <tr>
                  <th>Setting</th>
                  <th>Value</th>
                  <th>Description</th>
                  <th>Last Modified</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {configs
                  .filter((config) => config.category === "Performance")
                  .map((config) => (
                    <tr key={config.key}>
                      <td>{config.key}</td>
                      <td>{config.value}</td>
                      <td>{config.description}</td>
                      <td>{config.lastModified}</td>
                      <td>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            setSelectedConfig(config);
                            setShowEditDialog(true);
                          }}
                        >
                          Edit
                        </Button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </Table>
          </Card>

          {/* Performance Optimization */}
          <Card className="p-4">
            <h3 className="font-semibold mb-4">Cache Settings</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">
                  Cache TTL (minutes)
                </label>
                <input
                  type="number"
                  className="border rounded-md p-2 w-full"
                  value="60"
                />
              </div>
              <div>
                <label className="block text-sm font-medium mb-1">
                  Max Cache Size (MB)
                </label>
                <input
                  type="number"
                  className="border rounded-md p-2 w-full"
                  value="1024"
                />
              </div>
              <Button variant="outline">Clear Cache</Button>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Edit Configuration Dialog */}
      <ConfirmDialog
        isOpen={showEditDialog}
        onCancel={() => setShowEditDialog(false)}
        message="Are you sure you want to save the changes?"
        onConfirm={handleSaveConfig}
        title="Edit Configuration"
      />
    </div>
  );
}
