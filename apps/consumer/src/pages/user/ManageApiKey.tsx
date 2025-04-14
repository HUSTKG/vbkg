// pages/user/ManageApiKey.tsx
import {
  AppLayout,
  Button,
  Card,
  ConfirmDialog,
  DeleteDialog,
  ErrorNotification,
  SuccessNotification,
  Table,
} from "@vbkg/ui";
import { useState } from "react";

interface ApiKey {
  id: string;
  name: string;
  key: string;
  created: string;
  lastUsed: string;
  status: "Active" | "Inactive";
}

export default function ManageApiKey() {
  const [apiKeys, setApiKeys] = useState<ApiKey[]>([
    {
      id: "1",
      name: "Production API Key",
      key: "pk_live_xxxxx",
      created: "2024-04-01",
      lastUsed: "2024-04-13",
      status: "Active",
    },
  ]);

  const [selectedKey, setSelectedKey] = useState<ApiKey | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [showKey, setShowKey] = useState<string | null>(null);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleCreateKey = () => {
    const newKey = {
      id: String(apiKeys.length + 1),
      name: "New API Key",
      key: `pk_live_${Math.random().toString(36).substring(2, 15)}`,
      created: new Date().toISOString().split("T")[0],
      lastUsed: "-",
      status: "Active" as const,
    };

    setApiKeys((prev) => [...prev, newKey]);
    setShowCreateDialog(false);
    setShowKey(newKey.key);
    setNotification({
      type: "success",
      message: "API key created successfully",
    });
  };

  const handleDeleteKey = () => {
    if (selectedKey) {
      setApiKeys((prev) => prev.filter((key) => key.id !== selectedKey.id));
      setShowDeleteDialog(false);
      setSelectedKey(null);
      setNotification({
        type: "success",
        message: "API key deleted successfully",
      });
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">API Keys</h1>
          <Button onClick={() => setShowCreateDialog(true)}>
            Create New API Key
          </Button>
        </div>

        <Card className="p-6">
          <div className="space-y-4">
            <h2 className="text-lg font-semibold">Your API Keys</h2>

            {notification &&
              (notification.type === "success" ? (
                <SuccessNotification
                  title="Success"
                  message={notification.message}
                  id="notification-success"
                  time={new Date().toISOString()}
                  onDelete={() => setNotification(null)}
                />
              ) : (
                <ErrorNotification
                  title="Error"
                  message={notification.message}
                  id="notification-error"
                  time={new Date().toISOString()}
                  onDelete={() => setNotification(null)}
                />
              ))}

            {showKey && (
              <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-md">
                <p className="font-medium">New API Key Created</p>
                <p className="text-sm text-gray-600 mt-1">
                  Make sure to copy your API key now. You won't be able to see
                  it again!
                </p>
                <div className="mt-2 flex items-center space-x-2">
                  <code className="bg-white px-2 py-1 rounded border">
                    {showKey}
                  </code>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      navigator.clipboard.writeText(showKey);
                      setNotification({
                        type: "success",
                        message: "API key copied to clipboard",
                      });
                    }}
                  >
                    Copy
                  </Button>
                </div>
              </div>
            )}

            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Created</th>
                  <th>Last Used</th>
                  <th>Status</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {apiKeys.map((key) => (
                  <tr key={key.id}>
                    <td>{key.name}</td>
                    <td>{key.created}</td>
                    <td>{key.lastUsed}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          key.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {key.status}
                      </span>
                    </td>
                    <td>
                      <div className="flex space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            const newStatus =
                              key.status === "Active" ? "Inactive" : "Active";
                            setApiKeys((prev) =>
                              prev.map((k) =>
                                k.id === key.id
                                  ? { ...k, status: newStatus }
                                  : k,
                              ),
                            );
                          }}
                        >
                          {key.status === "Active" ? "Deactivate" : "Activate"}
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => {
                            setSelectedKey(key);
                            setShowDeleteDialog(true);
                          }}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </Card>

        {/* Create API Key Dialog */}
        <ConfirmDialog
          isOpen={showCreateDialog}
          onCancel={() => setShowCreateDialog(false)}
          message="Are you sure you want to create a new API key? This action cannot be undone."
          onConfirm={handleCreateKey}
          title="Create New API Key"
        />

        {/* Delete API Key Dialog */}
        <DeleteDialog
          isOpen={showDeleteDialog}
          onCancel={() => setShowDeleteDialog(false)}
          onConfirm={handleDeleteKey}
          title="Delete API Key"
          message={`Are you sure you want to delete this API key? This action cannot be undone.`}
        />
      </div>
    </AppLayout>
  );
}
