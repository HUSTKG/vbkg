// pages/admin/ManageUser.tsx
import {
    AppLayout,
    Button,
    DeleteDialog,
    EmptyState,
    SearchBar,
    Table,
    UserStatisticCard,
} from "@vbkg/ui";
import { useState } from "react";

interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  status: string;
  lastLogin: string;
}

export default function ManageUser() {
  const [users, setUsers] = useState<User[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Admin",
      status: "Active",
      lastLogin: "2024-04-13",
    },
    // Add more mock data
  ]);

  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    // Implement search logic
  };

  const handleDelete = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDelete = () => {
    if (selectedUser) {
      setUsers(users.filter((u) => u.id !== selectedUser.id));
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  return (
    <AppLayout>
      <div className="p-6 space-y-6">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold">User Management</h1>
          <Button>Add New User</Button>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <UserStatisticCard
            value={users.length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
          <UserStatisticCard
            value={users.filter((u) => u.status === "Active").length}
            trend={{
              value: 3,
              isPositive: true,
            }}
          />
          <UserStatisticCard
            value={users.filter((u) => u.status === "Active").length}
            trend={{
              value: 4,
              isPositive: true,
            }}
          />
          <UserStatisticCard
            value={users.filter((u) => u.status === "Active").length}
            trend={{
              value: 5,
              isPositive: true,
            }}
          />
        </div>

        {/* User Table */}
        <div className="bg-white rounded-lg shadow">
          <div className="p-4 border-b">
            <SearchBar onSearch={handleSearch} placeholder="Search users..." />
          </div>

          {users.length > 0 ? (
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Status</th>
                  <th>Last Login</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user.id}>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.role}</td>
                    <td>
                      <span
                        className={`px-2 py-1 rounded-full text-xs ${
                          user.status === "Active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {user.status}
                      </span>
                    </td>
                    <td>{user.lastLogin}</td>
                    <td>
                      <div className="flex space-x-2">
                        <Button variant="outline" size="sm">
                          Edit
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleDelete(user)}
                        >
                          Delete
                        </Button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <EmptyState
              title="No users found"
              description="No users match your search criteria."
              type="error"
            />
          )}
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={confirmDelete}
        title="Delete User"
        message={`Are you sure you want to delete ${selectedUser?.name}?`}
      />
    </AppLayout>
  );
}
