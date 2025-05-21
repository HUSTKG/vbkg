import { useState, useEffect } from "react";
import {
  ArrowLeft,
  Users,
  ShieldCheck,
  ChevronRight,
  Plus,
  Trash2,
  Search,
  UserPlus,
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
  Checkbox,
  ConfirmDialog,
  DataTable,
  Dialog,
  DialogFooter,
  Input,
  ScrollArea,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  SimpleColumnDef,
  toast,
} from "@vbkg/ui";
import { useNavigate, useParams } from "react-router";
// Types
interface User {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  position?: string;
  is_active: boolean;
  roles: string[];
  created_at: Date;
}

interface Role {
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
    created_at: new Date("2024-01-01"),
  },
  {
    id: "2",
    email: "john.doe@example.com",
    full_name: "John Doe",
    department: "Engineering",
    position: "Senior Developer",
    is_active: true,
    roles: ["developer", "viewer"],
    created_at: new Date("2024-01-15"),
  },
  {
    id: "3",
    email: "jane.smith@example.com",
    full_name: "Jane Smith",
    department: "Data Science",
    position: "Data Analyst",
    is_active: true,
    roles: ["analyst", "viewer"],
    created_at: new Date("2024-02-01"),
  },
  {
    id: "4",
    email: "mark.wilson@example.com",
    full_name: "Mark Wilson",
    department: "Marketing",
    position: "Marketing Manager",
    is_active: false,
    roles: ["viewer"],
    created_at: new Date("2024-02-15"),
  },
  {
    id: "5",
    email: "sarah.jones@example.com",
    full_name: "Sarah Jones",
    department: "Product",
    position: "Product Manager",
    is_active: true,
    roles: ["manager", "viewer"],
    created_at: new Date("2024-03-10"),
  },
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "analyst",
    description: "Access to data and analytics",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    created_at: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "manager",
    description: "Management access to the system",
    created_at: new Date("2024-02-15"),
  },
];

// Mock API functions
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

const fetchRoleUsers = async (roleId: number): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const role = mockRoles.find((r) => r.id === roleId);
      if (!role) {
        resolve([]);
        return;
      }

      const users = mockUsers.filter((user) => user.roles.includes(role.name));
      resolve(users);
    }, 500);
  });
};

// Add users to role dialog
const AddUsersDialog = ({
  isOpen,
  onClose,
  onAddUsers,
  role,
  allUsers,
  currentUserIds,
}: {
  isOpen: boolean;
  onClose: () => void;
  onAddUsers: (userIds: string[]) => void;
  role: Role | null;
  allUsers: User[];
  currentUserIds: string[];
}) => {
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    if (isOpen) {
      setSelectedUsers([]);
      setSearchQuery("");
    }
  }, [isOpen]);

  if (!role) return null;

  // Filter users
  const filteredUsers = allUsers.filter(
    (user) =>
      // Exclude users who already have this role
      !currentUserIds.includes(user.id) &&
      // Apply search filter if any
      (searchQuery === "" ||
        user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (user.full_name &&
          user.full_name.toLowerCase().includes(searchQuery.toLowerCase())) ||
        (user.department &&
          user.department.toLowerCase().includes(searchQuery.toLowerCase()))),
  );

  const toggleUser = (userId: string) => {
    setSelectedUsers((prev) =>
      prev.includes(userId)
        ? prev.filter((id) => id !== userId)
        : [...prev, userId],
    );
  };

  const handleSubmit = () => {
    onAddUsers(selectedUsers);
    onClose();
  };

  return (
    <Dialog
      title={`Add Users to "${role.name}" Role`}
      open={isOpen}
      showFooter={false}
      description="Select users to assign to this role."
      onOpenChange={onClose}
    >
      <div className="relative mb-4">
        <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search users..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="pl-8"
        />
      </div>

      <ScrollArea className="h-[300px] border rounded-md p-2">
        {filteredUsers.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center p-4">
            <Users className="h-8 w-8 text-muted-foreground mb-2" />
            {searchQuery ? (
              <p className="text-muted-foreground">
                No users match your search criteria
              </p>
            ) : (
              <p className="text-muted-foreground">
                All users already have this role
              </p>
            )}
          </div>
        ) : (
          <div className="space-y-2">
            {filteredUsers.map((user) => (
              <div
                key={user.id}
                className="flex items-center space-x-3 p-2 hover:bg-muted/50 rounded-md cursor-pointer"
                onClick={() => toggleUser(user.id)}
              >
                <Checkbox
                  checked={selectedUsers.includes(user.id)}
                  onCheckedChange={() => toggleUser(user.id)}
                />
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`}
                  />
                  <AvatarFallback>
                    {user.full_name
                      ?.split(" ")
                      .map((n) => n[0])
                      .join("") || user.email[0].toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <div className="font-medium">
                    {user.full_name || "Unnamed User"}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {user.email}
                  </div>
                </div>
                <div className="ml-auto">
                  {user.department && (
                    <Badge variant="outline" className="mr-1">
                      {user.department}
                    </Badge>
                  )}
                  <Badge
                    className={
                      user.is_active
                        ? "bg-green-100 text-green-800"
                        : "bg-gray-100 text-gray-800"
                    }
                  >
                    {user.is_active ? "Active" : "Inactive"}
                  </Badge>
                </div>
              </div>
            ))}
          </div>
        )}
      </ScrollArea>

      <DialogFooter className="gap-2">
        <div className="mr-auto text-sm text-muted-foreground">
          {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""}{" "}
          selected
        </div>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={selectedUsers.length === 0}>
          Add Users
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

// Confirmation dialog
const ConfirmRemoveDialog = ({
  isOpen,
  onClose,
  onConfirm,
  user,
  role,
}: {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  user: User | null;
  role: Role | null;
}) => {
  if (!user || !role) return null;

  return (
    <ConfirmDialog
      title="Remove Role Assignment"
      message={`
            Are you sure you want to remove the "${role.name}" role from{" "}
            ${user.full_name || user.email}?`}
      isOpen={isOpen}
      onCancel={onClose}
      confirmLabel="Remove Role"
      onConfirm={onConfirm}
    />
  );
};

// Bulk edit roles dialog
const BulkEditRolesDialog = ({
  isOpen,
  onClose,
  onSubmit,
  selectedUsers,
  allRoles,
}: {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (action: "add" | "remove", roleId: number) => void;
  selectedUsers: User[];
  allRoles: Role[];
}) => {
  const [selectedRole, setSelectedRole] = useState<string>("");
  const [action, setAction] = useState<"add" | "remove">("add");

  useEffect(() => {
    if (isOpen) {
      setSelectedRole("");
      setAction("add");
    }
  }, [isOpen]);

  const handleSubmit = () => {
    if (!selectedRole) return;

    onSubmit(action, parseInt(selectedRole, 10));
    onClose();
  };

  return (
    <Dialog
      title="Bulk Edit Roles"
      description={`
            Add or remove a role from ${selectedUsers.length} selected user
            ${selectedUsers.length !== 1 ? "s" : ""}.
		`}
      open={isOpen}
      onOpenChange={onClose}
    >
      <div className="space-y-4 py-4">
        <div className="space-y-2">
          <label className="text-sm font-medium">Action</label>
          <Select
            value={action}
            onValueChange={(value: "add" | "remove") => setAction(value)}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select an action" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="add">Add Role</SelectItem>
              <SelectItem value="remove">Remove Role</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <label className="text-sm font-medium">Role</label>
          <Select value={selectedRole} onValueChange={setSelectedRole}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              {allRoles.map((role) => (
                <SelectItem key={role.id} value={role.id.toString()}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="text-sm text-muted-foreground">
          This will {action === "add" ? "add" : "remove"} the selected role
          {action === "add" ? " to " : " from "}
          {selectedUsers.length} user{selectedUsers.length !== 1 ? "s" : ""}.
        </div>
      </div>

      <DialogFooter>
        <Button onClick={onClose}>Cancel</Button>
        <Button onClick={handleSubmit} disabled={!selectedRole}>
          {action === "add" ? "Add Role" : "Remove Role"}
        </Button>
      </DialogFooter>
    </Dialog>
  );
};

export default function RoleAssignmentPage() {
  const navigate = useNavigate();
  const { id: roleIdParam } = useParams() as { id: string }; // For role-specific view

  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedRole, setSelectedRole] = useState<Role | null>(null);
  const [showAddUsersDialog, setShowAddUsersDialog] = useState(false);
  const [showRemoveDialog, setShowRemoveDialog] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [selectedUserIds, setSelectedUserIds] = useState<string[]>([]); // For bulk actions
  const [showBulkEditDialog, setShowBulkEditDialog] = useState(false);
  const [roleFilter, setRoleFilter] = useState<string>("all"); // Filter by role

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);

        // Fetch all roles and users
        const [rolesData, usersData] = await Promise.all([
          fetchRoles(),
          fetchUsers(),
        ]);

        setRoles(rolesData);
        setUsers(usersData);

        // If a role ID is provided, select that role
        if (roleIdParam) {
          const roleId = parseInt(roleIdParam as string, 10);
          const role = rolesData.find((r) => r.id === roleId);
          if (role) {
            setSelectedRole(role);
            setRoleFilter(role.name);
          }
        }
      } catch (error) {
        console.error("Failed to load data:", error);
        toast("Error", {
          description: "Failed to load data. Please try again.",
          className: "bg-red-500 text-white",
        });
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [roleIdParam]);

  const handleAddUsersToRole = async (userIds: string[]) => {
    if (!selectedRole) return;

    try {
      // In a real app, make API call to add users to role

      // Update local state
      const updatedUsers = users.map((user) => {
        if (
          userIds.includes(user.id) &&
          !user.roles.includes(selectedRole.name)
        ) {
          return {
            ...user,
            roles: [...user.roles, selectedRole.name],
          };
        }
        return user;
      });

      setUsers(updatedUsers);

      toast("Success", {
        description: `Added ${userIds.length} user${userIds.length !== 1 ? "s" : ""} to "${selectedRole.name}" role.`,
      });
    } catch (error) {
      console.error("Failed to add users to role:", error);
      toast("Error", {
        description: "Failed to add users to role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleRemoveUserFromRole = async () => {
    if (!selectedUser || !selectedRole) return;

    try {
      // In a real app, make API call to remove user from role

      // Update local state
      const updatedUsers = users.map((user) => {
        if (user.id === selectedUser.id) {
          return {
            ...user,
            roles: user.roles.filter((r) => r !== selectedRole.name),
          };
        }
        return user;
      });

      setUsers(updatedUsers);
      setShowRemoveDialog(false);

      toast("Success", {
        description: `Removed "${selectedRole.name}" role from ${selectedUser.full_name || selectedUser.email}.`,
      });
    } catch (error) {
      console.error("Failed to remove user from role:", error);
      toast("Error", {
        description: "Failed to remove user from role. Please try again.",
        className: "bg-red-500 text-white",
      });
    }
  };

  const handleBulkEditRoles = async (
    action: "add" | "remove",
    roleId: number,
  ) => {
    try {
      const role = roles.find((r) => r.id === roleId);
      if (!role) return;

      // In a real app, make API call to add/remove role from multiple users

      // Update local state
      const updatedUsers = users.map((user) => {
        if (selectedUserIds.includes(user.id)) {
          if (action === "add" && !user.roles.includes(role.name)) {
            return {
              ...user,
              roles: [...user.roles, role.name],
            };
          } else if (action === "remove" && user.roles.includes(role.name)) {
            return {
              ...user,
              roles: user.roles.filter((r) => r !== role.name),
            };
          }
        }
        return user;
      });

      setUsers(updatedUsers);
      setSelectedUserIds([]); // Clear selection

      toast("Success", {
        description: `${action === "add" ? "Added" : "Removed"} "${role.name}" role ${action === "add" ? "to" : "from"} ${selectedUserIds.length} user${selectedUserIds.length !== 1 ? "s" : ""}.`,
      });
    } catch (error) {
      console.error("Failed to update roles:", error);
      toast("Error", {
        description: "Failed to update roles. Please try again.",
        className: "text-white bg-red-500",
      });
    }
  };

  // Filter users based on role selection
  const filteredUsers =
    roleFilter === "all"
      ? users
      : users.filter((user) => user.roles.includes(roleFilter));

  // Table columns
  const columns: SimpleColumnDef<User, any>[] = [
    {
      header: "User",
      accessorKey: "email",
      cell: (row) => (
        <div className="flex items-center space-x-3">
          <Avatar className="h-8 w-8">
            <AvatarImage
              src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${row?.email}`}
            />
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
            <div className="text-xs text-muted-foreground">{row?.email}</div>
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
      header: "Status",
      accessorKey: "is_active",
      cell: (row) => (
        <Badge
          className={
            row?.is_active
              ? "bg-green-100 text-green-800"
              : "bg-gray-100 text-gray-800"
          }
        >
          {row?.is_active ? "Active" : "Inactive"}
        </Badge>
      ),
    },
    {
      header: "Roles",
      accessorKey: "roles",
      cell: (row) => (
        <div className="flex flex-wrap gap-1">
          {row?.roles.map((roleName: string) => (
            <Badge
              key={roleName}
              variant="outline"
              className={roleName === roleFilter ? "bg-primary/20" : ""}
            >
              {roleName}
            </Badge>
          ))}
        </div>
      ),
    },
  ];

  // Action buttons
  const renderRoleSpecificActions = (user: User) => {
    if (!selectedRole) return null;

    const hasRole = user.roles.includes(selectedRole.name);

    return hasRole ? (
      <Button
        size="sm"
        className="text-red-600"
        onClick={() => {
          setSelectedUser(user);
          setShowRemoveDialog(true);
        }}
      >
        <Trash2 className="h-3.5 w-3.5 mr-1" /> Remove Role
      </Button>
    ) : (
      <Button size="sm" onClick={() => handleAddUsersToRole([user.id])}>
        <Plus className="h-3.5 w-3.5 mr-1" /> Add Role
      </Button>
    );
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center mb-4">
        <Button size="sm" onClick={() => navigate("-1")}>
          <ArrowLeft className="mr-2 h-4 w-4" /> Back
        </Button>
      </div>

      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold tracking-tight flex items-center">
            <Users className="mr-2 h-7 w-7" />
            {selectedRole
              ? `Users with "${selectedRole.name}" Role`
              : "Role Assignments"}
          </h1>
          <p className="text-muted-foreground mt-1">
            {selectedRole
              ? selectedRole.description ||
                `Users assigned to the ${selectedRole.name} role`
              : "Manage which roles are assigned to each user"}
          </p>
        </div>
        {selectedRole && (
          <Button onClick={() => setShowAddUsersDialog(true)}>
            <UserPlus className="mr-2 h-4 w-4" /> Add Users to Role
          </Button>
        )}
      </div>

      <Card>
        <CardHeader className="pb-3">
          <CardTitle>
            {selectedRole
              ? `Users with "${selectedRole.name}" Role`
              : "User Role Assignments"}
          </CardTitle>
          <CardDescription>
            {selectedRole
              ? `Showing users with the ${selectedRole.name} role`
              : "Filter users by role to manage assignments"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          {/* Role filter */}
          <div className="mb-6 flex items-center space-x-4">
            <div className="text-sm font-medium">Filter by role:</div>
            <Select value={roleFilter} onValueChange={setRoleFilter}>
              <SelectTrigger className="w-[200px]">
                <SelectValue placeholder="Select a role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Roles</SelectItem>
                {roles.map((role) => (
                  <SelectItem key={role.id} value={role.name}>
                    {role.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {loading ? (
            <div className="flex justify-center py-8">
              <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
            </div>
          ) : (
            <>
              {/* Bulk actions */}
              {selectedUserIds.length > 0 && (
                <div className="bg-muted/50 p-2 rounded-md mb-4 flex items-center justify-between">
                  <div className="text-sm">
                    {selectedUserIds.length} user
                    {selectedUserIds.length !== 1 ? "s" : ""} selected
                  </div>
                  <div className="flex gap-2">
                    <Button size="sm" onClick={() => setSelectedUserIds([])}>
                      Clear Selection
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => setShowBulkEditDialog(true)}
                    >
                      <ShieldCheck className="mr-1 h-4 w-4" /> Edit Roles
                    </Button>
                  </div>
                </div>
              )}

              {/* Users table */}
              <DataTable<User, any>
                data={filteredUsers}
                columns={columns}
                showGlobalFilter={true}
                showColumnFilters={true}
                showPagination={true}
                showRowSelection={true}
                onRowSelectionChange={(rows) => {
                  setSelectedUserIds(rows.map((r) => r.id));
                }}
                actionsOptions={
                  selectedRole
                    ? {
                        show: true,
                        position: "end",
                        actions: [
                          {
                            label: "View User",
                            icon: <ChevronRight className="h-4 w-4" />,
                            onClick: navigate(`/users/1`), // TODO: add user id
                            variant: "ghost",
                          },
                          {
                            label: () =>
                              // TODO: check user.roles.includes(selectedRole.name)
                              // ? "Remove Role"
                              "Add Role",
                            icon: () => (
                              // TODO: check user.roles.includes(selectedRole.name) ? (
                              //   <Trash2 className="h-4 w-4" />
                              // ) : (
                              <Plus className="h-4 w-4" />
                            ),
                            // ),
                            onClick: (user) => {
                              if (user.roles.includes(selectedRole.name)) {
                                setSelectedUser(user);
                                setShowRemoveDialog(true);
                              } else {
                                handleAddUsersToRole([user.id]);
                              }
                            },
                            variant: "outline",
                            className: () =>
                              // TODO: check user.roles.includes(selectedRole.name)
                              "text-red-600",
                            // : "",
                          },
                        ],
                        showInDropdown: false,
                      }
                    : undefined
                }
              />
            </>
          )}
        </CardContent>
      </Card>

      {/* Add Users Dialog */}
      {selectedRole && (
        <AddUsersDialog
          isOpen={showAddUsersDialog}
          onClose={() => setShowAddUsersDialog(false)}
          onAddUsers={handleAddUsersToRole}
          role={selectedRole}
          allUsers={users}
          currentUserIds={users
            .filter((u) => u.roles.includes(selectedRole.name))
            .map((u) => u.id)}
        />
      )}

      {/* Remove User from Role Dialog */}
      <ConfirmRemoveDialog
        isOpen={showRemoveDialog}
        onClose={() => setShowRemoveDialog(false)}
        onConfirm={handleRemoveUserFromRole}
        user={selectedUser}
        role={selectedRole}
      />

      {/* Bulk Edit Roles Dialog */}
      <BulkEditRolesDialog
        isOpen={showBulkEditDialog}
        onClose={() => setShowBulkEditDialog(false)}
        onSubmit={handleBulkEditRoles}
        selectedUsers={users.filter((u) => selectedUserIds.includes(u.id))}
        allRoles={roles}
      />
    </div>
  );
}
