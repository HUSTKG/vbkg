import React, { useState, useEffect } from "react";
import {
  Trash2,
  Edit,
  UserPlus,
  UserCog,
  ShieldCheck,
  CheckCircle2,
  XCircle,
} from "lucide-react";
import {
  Avatar,
  AvatarFallback,
  AvatarImage,
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  ConfirmDialog,
  DataTable,
  Dialog,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleColumnDef,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@vbkg/ui";
import { useNavigate } from "react-router";

// Types for our data
interface User {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  position?: string;
  bio?: string;
  avatar_url?: string;
  is_active: boolean;
  roles: string[];
  last_sign_in_at?: Date;
  created_at: Date;
  updated_at: Date;
}

interface Role {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
  permissions?: string[];
}

interface Permission {
  id: number;
  name: string;
  description?: string;
  created_at: Date;
}

// Mock data
const mockUsers: User[] = [
  {
    id: "1",
    email: "admin@example.com",
    full_name: "Admin User",
    department: "IT",
    position: "System Administrator",
    is_active: true,
    roles: ["admin"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=admin",
    created_at: new Date("2024-01-01"),
    updated_at: new Date("2024-01-01"),
    last_sign_in_at: new Date("2024-05-18"),
  },
  {
    id: "2",
    email: "john.doe@example.com",
    full_name: "John Doe",
    department: "Engineering",
    position: "Senior Developer",
    is_active: true,
    roles: ["developer", "viewer"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=john",
    created_at: new Date("2024-01-15"),
    updated_at: new Date("2024-02-10"),
    last_sign_in_at: new Date("2024-05-17"),
  },
  {
    id: "3",
    email: "jane.smith@example.com",
    full_name: "Jane Smith",
    department: "Data Science",
    position: "Data Analyst",
    is_active: true,
    roles: ["analyst", "viewer"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=jane",
    created_at: new Date("2024-02-01"),
    updated_at: new Date("2024-02-01"),
    last_sign_in_at: new Date("2024-05-15"),
  },
  {
    id: "4",
    email: "mark.wilson@example.com",
    full_name: "Mark Wilson",
    department: "Marketing",
    position: "Marketing Manager",
    is_active: false,
    roles: ["viewer"],
    avatar_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=mark",
    created_at: new Date("2024-02-15"),
    updated_at: new Date("2024-03-01"),
    last_sign_in_at: new Date("2024-04-10"),
  },
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    created_at: new Date("2024-01-01"),
    permissions: ["all:read", "all:write", "all:delete", "all:admin"],
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    created_at: new Date("2024-01-01"),
    permissions: [
      "pipelines:read",
      "pipelines:write",
      "data:read",
      "data:write",
    ],
  },
  {
    id: 3,
    name: "analyst",
    description: "Access to data and analytics",
    created_at: new Date("2024-01-01"),
    permissions: ["data:read", "analytics:read", "analytics:write"],
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    created_at: new Date("2024-01-01"),
    permissions: ["data:read", "pipelines:read", "analytics:read"],
  },
];

// Mock API
const fetchUsers = async (): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockUsers);
    }, 500);
  });
};

const fetchRoles = async (): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockRoles);
    }, 500);
  });
};

// New user dialog component
const NewUserDialog = ({
  isOpen,
  onClose,
  onAddUser,
  roles,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddUser: (user: any) => void;
  roles: Role[];
}) => {
  const [formData, setFormData] = useState({
    email: "",
    full_name: "",
    department: "",
    position: "",
    password: "",
    roles: ["viewer"],
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (isOpen) {
      // Reset form when dialog opens
      setFormData({
        email: "",
        full_name: "",
        department: "",
        position: "",
        password: "",
        roles: ["viewer"],
      });
      setErrors({});
    }
  }, [isOpen]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error when field is edited
    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleRoleChange = (roleIds: string[]) => {
    setFormData((prev) => ({ ...prev, roles: roleIds }));
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      // Add id and other required fields
      const newUser = {
        ...formData,
        id: Date.now().toString(),
        is_active: true,
        created_at: new Date(),
        updated_at: new Date(),
      };

      onAddUser(newUser);
      onClose();
    }
  };

  return (
    <Dialog
      title="Add New User"
      description="Create a new user account in the system."
      primaryActionText="Create User"
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="grid gap-4 py-4">
        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="email" className="text-right">
            Email <span className="text-red-500">*</span>
          </Label>
          <Input
            id="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="user@example.com"
            className="col-span-3"
          />
          {errors.email && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errors.email}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="password" className="text-right">
            Password <span className="text-red-500">*</span>
          </Label>
          <Input
            id="password"
            name="password"
            type="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="••••••••"
            className="col-span-3"
          />
          {errors.password && (
            <div className="col-span-3 col-start-2 text-sm text-red-500">
              {errors.password}
            </div>
          )}
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="full_name" className="text-right">
            Full Name
          </Label>
          <Input
            id="full_name"
            name="full_name"
            value={formData.full_name}
            onChange={handleInputChange}
            placeholder="John Doe"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="department" className="text-right">
            Department
          </Label>
          <Input
            id="department"
            name="department"
            value={formData.department}
            onChange={handleInputChange}
            placeholder="Engineering"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="position" className="text-right">
            Position
          </Label>
          <Input
            id="position"
            name="position"
            value={formData.position}
            onChange={handleInputChange}
            placeholder="Software Developer"
            className="col-span-3"
          />
        </div>

        <div className="grid grid-cols-4 items-center gap-4">
          <Label htmlFor="roles" className="text-right">
            Roles
          </Label>
          <Select
            onValueChange={(value) => handleRoleChange([value])}
            defaultValue="viewer"
          >
            <SelectTrigger className="col-span-3">
              <SelectValue placeholder="Select role" />
            </SelectTrigger>
            <SelectContent>
              {roles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </Dialog>
  );
};

export default function UserManagementPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("users");
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [showNewUserDialog, setShowNewUserDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, rolesData] = await Promise.all([
          fetchUsers(),
          fetchRoles(),
        ]);
        setUsers(usersData);
        setRoles(rolesData);
      } catch (error) {
        console.error("Failed to load data:", error);
        toast("Error", {
          description: "Failed to load user data. Please try again.",
          className: "bg-red-500 text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  const handleAddUser = (user: User) => {
    // In a real app, make API call to add user
    // Here we just update the local state
    setUsers((prev) => [...prev, user]);

    toast("Success", {
      description: `User ${user.email} created successfully.`,
    });
  };

  const handleEditUser = (user: User) => {
    navigate(`/admin/users/${user.id}`);
  };

  const handleDeleteUser = (user: User) => {
    setSelectedUser(user);
    setShowDeleteDialog(true);
  };

  const confirmDeleteUser = async () => {
    if (!selectedUser) return;

    try {
      // In a real app, make API call to delete
      // Here we just update the local state
      setUsers(users.filter((u) => u.id !== selectedUser.id));

      toast("Success", {
        description: `User ${selectedUser.email} deleted successfully.`,
      });
    } catch (error) {
      console.error("Failed to delete user:", error);
      toast("Error", {
        description: "Failed to delete user. Please try again.",
        className: "bg-red-500 text-white",
      });
    } finally {
      setShowDeleteDialog(false);
      setSelectedUser(null);
    }
  };

  const handleToggleUserStatus = async (user: User) => {
    try {
      // In a real app, make API call to update
      // Here we just update the local state
      const updatedUsers = users.map((u) => {
        if (u.id === user.id) {
          return { ...u, is_active: !u.is_active };
        }
        return u;
      });

      setUsers(updatedUsers);

      toast("Success", {
        description: `User ${user.email} ${user.is_active ? "deactivated" : "activated"} successfully.`,
      });
    } catch (error) {
      console.error("Failed to update user status:", error);
      toast("Error", {
        description: "Failed to update user status. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleManageUserRoles = (user: User) => {
    navigate(`/admin/users/${user.id}/roles`);
  };

  // User columns
  const userColumns: SimpleColumnDef<User, any>[] = [
    {
      header: "User",
      accessorKey: "email",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar>
            <AvatarImage src={row?.avatar_url} />
            <AvatarFallback>
              {row?.full_name
                ?.split(" ")
                .map((n) => n[0])
                .join("") || row?.email?.[0].toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">
              {row?.full_name || "Unnamed User"}
            </div>
            <div className="text-sm text-muted-foreground">{row?.email}</div>
          </div>
        </div>
      ),
    },
    {
      header: "Department",
      accessorKey: "department",
      cell: (row) => <div>{row?.department || "—"}</div>,
    },
    {
      header: "Position",
      accessorKey: "position",
      cell: (row) => <div>{row?.position || "—"}</div>,
    },
    {
      header: "Roles",
      accessorKey: "roles",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row?.roles.map((role) => (
            <Badge key={role} variant="outline">
              {role}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Status",
      accessorKey: "is_active",
      cell: (row) => (
        <div>
          {row?.is_active ? (
            <Badge className="bg-green-100 text-green-800 hover:bg-green-100">
              <CheckCircle2 className="w-3 h-3 mr-1" />
              Active
            </Badge>
          ) : (
            <Badge
              variant="outline"
              className="bg-gray-100 text-gray-800 hover:bg-gray-100"
            >
              <XCircle className="w-3 h-3 mr-1" />
              Inactive
            </Badge>
          )}
        </div>
      ),
    },
    {
      header: "Last Login",
      accessorKey: "last_sign_in_at",
      cell: (row) => (
        <div className="text-sm">
          {row?.last_sign_in_at
            ? new Date(row.last_sign_in_at).toLocaleDateString()
            : "Never"}
        </div>
      ),
    },
  ];

  // Role columns
  const roleColumns: SimpleColumnDef<Role, any>[] = [
    {
      header: "Role Name",
      accessorKey: "name",
      cell: (row) => <div className="font-medium capitalize">{row?.name}</div>,
    },
    {
      header: "Description",
      accessorKey: "description",
      cell: (row) => <div>{row?.description || "—"}</div>,
    },
    {
      header: "Permissions",
      accessorKey: "permissions",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row?.permissions?.map((permission) => (
            <Badge key={permission} variant="outline" className="text-xs">
              {permission}
            </Badge>
          ))}
        </div>
      ),
    },
    {
      header: "Created",
      accessorKey: "created_at",
      cell: (row) => (
        <div className="text-sm">
          {row?.created_at
            ? new Date(row.created_at).toLocaleDateString()
            : "—"}
        </div>
      ),
    },
  ];

  // Confirmation dialog component
  const DeleteConfirmDialog = () => {
    return (
      <ConfirmDialog
        title="Confirm Deletion"
        isOpen={showDeleteDialog}
        onConfirm={confirmDeleteUser}
        onCancel={() => setShowDeleteDialog(false)}
        closeOnEsc
        message={`Are you sure you want to delete user "${selectedUser?.email}"? This action cannot be undone.`}
      />
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">User Management</h1>
        {activeTab === "users" && (
          <Button onClick={() => setShowNewUserDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add User
          </Button>
        )}
        {activeTab === "roles" && (
          <Button onClick={() => navigate("/admin/roles/create")}>
            <ShieldCheck className="mr-2 h-4 w-4" /> Add Role
          </Button>
        )}
      </div>

      <Tabs defaultValue="users" onValueChange={setActiveTab}>
        <TabsList>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="roles">Roles</TabsTrigger>
        </TabsList>

        <TabsContent value="users">
          <Card>
            <CardHeader>
              <CardTitle>System Users</CardTitle>
              <CardDescription>
                Manage user accounts and their access to the system.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable<User, any>
                data={users}
                columns={userColumns}
                showGlobalFilter={true}
                showColumnFilters={true}
                showPagination={true}
                actionsOptions={{
                  show: true,
                  position: "end",
                  actions: [
                    {
                      label: "Edit User",
                      icon: <Edit className="h-4 w-4" />,
                      onClick: handleEditUser,
                      variant: "ghost",
                    },
                    {
                      label: "Manage Roles",
                      icon: <UserCog className="h-4 w-4" />,
                      onClick: handleManageUserRoles,
                      variant: "outline",
                    },
                    {
                      label: true ? "Deactivate" : "Activate",
                      icon: true ? (
                        <XCircle className="h-4 w-4" />
                      ) : (
                        <CheckCircle2 className="h-4 w-4" />
                      ),
                      onClick: handleToggleUserStatus,
                      variant: "outline",
                      className: true ? "text-amber-600" : "text-green-600",
                    },
                    {
                      label: "Delete",
                      icon: <Trash2 className="h-4 w-4" />,
                      onClick: handleDeleteUser,
                      variant: "outline",
                      className: "text-red-600 hover:text-red-700",
                    },
                  ],
                  showInDropdown: true,
                  dropdownLabel: "Actions",
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="roles">
          <Card>
            <CardHeader>
              <CardTitle>System Roles</CardTitle>
              <CardDescription>
                Manage roles and their associated permissions.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DataTable<Role, any>
                data={roles}
                columns={roleColumns}
                showGlobalFilter={true}
                showPagination={true}
                actionsOptions={{
                  show: true,
                  position: "end",
                  actions: [
                    {
                      label: "Edit Role",
                      icon: <Edit className="h-4 w-4" />,
                      onClick: (role) => navigate(`/admin/roles/${role.id}`),
                      variant: "ghost",
                    },
                    {
                      label: "Manage Permissions",
                      icon: <ShieldCheck className="h-4 w-4" />,
                      onClick: (role) =>
                        navigate(`/admin/roles/${role.id}/permissions`),
                      variant: "outline",
                    },
                    {
                      label: "Delete",
                      icon: <Trash2 className="h-4 w-4" />,
                      onClick: () => {
                        // In a real app, would show confirmation dialog and delete
                        toast("Not Implemented", {
                          description:
                            "Role deletion would be implemented here",
                        });
                      },
                      variant: "outline",
                      className: "text-red-600 hover:text-red-700",
                    },
                  ],
                  showInDropdown: true,
                  dropdownLabel: "Actions",
                }}
              />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* New User Dialog */}
      <NewUserDialog
        isOpen={showNewUserDialog}
        onClose={() => setShowNewUserDialog(false)}
        onAddUser={handleAddUser}
        roles={roles}
      />

      {/* Delete Confirmation Dialog */}
      <DeleteConfirmDialog />
    </div>
  );
}
