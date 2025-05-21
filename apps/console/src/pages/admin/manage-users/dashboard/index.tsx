import React, { useState, useEffect } from "react";
import {
  Users,
  ShieldCheck,
  ShieldAlert,
  UserPlus,
  Settings,
  Activity,
  CheckCircle,
  XCircle,
  Eye,
  Filter,
  ChevronRight,
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
  CardFooter,
  CardHeader,
  CardTitle,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@vbkg/ui";
import { useNavigate } from "react-router";

// Types
interface User {
  id: string;
  email: string;
  full_name?: string;
  department?: string;
  position?: string;
  is_active: boolean;
  roles: string[];
  last_sign_in_at?: Date;
  created_at: Date;
}

interface Role {
  id: number;
  name: string;
  description?: string;
  permissions: string[];
  users_count: number;
  created_at: Date;
}

interface Permission {
  id: number;
  name: string;
  description?: string;
  category: string;
  roles_count: number;
  created_at: Date;
}

interface ActivityLog {
  id: string;
  user_id: string;
  user_email: string;
  activity_type: string;
  details: string;
  created_at: Date;
}

interface Stats {
  total_users: number;
  active_users: number;
  inactive_users: number;
  total_roles: number;
  total_permissions: number;
  new_users_last_30_days: number;
  login_activity_last_7_days: number;
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
    last_sign_in_at: new Date("2024-05-18"),
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
    last_sign_in_at: new Date("2024-05-17"),
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
    last_sign_in_at: new Date("2024-05-15"),
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
    last_sign_in_at: new Date("2024-04-10"),
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
    last_sign_in_at: new Date("2024-05-16"),
    created_at: new Date("2024-03-10"),
  },
];

const mockRoles: Role[] = [
  {
    id: 1,
    name: "admin",
    description: "Full system access with all permissions",
    permissions: ["all:read", "all:write", "all:delete", "all:admin"],
    users_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "developer",
    description: "Access to development tools and APIs",
    permissions: [
      "pipelines:read",
      "pipelines:write",
      "data:read",
      "data:write",
    ],
    users_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "analyst",
    description: "Access to data and analytics",
    permissions: ["data:read", "analytics:read", "analytics:write"],
    users_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 4,
    name: "viewer",
    description: "Read-only access to the system",
    permissions: ["data:read", "pipelines:read", "analytics:read"],
    users_count: 4,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "manager",
    description: "Management access to the system",
    permissions: ["data:read", "analytics:read", "users:read"],
    users_count: 1,
    created_at: new Date("2024-02-15"),
  },
];

const mockPermissions: Permission[] = [
  // Data permissions
  {
    id: 1,
    name: "data:read",
    description: "Read data from the system",
    category: "Data",
    roles_count: 5,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 2,
    name: "data:write",
    description: "Create and modify data",
    category: "Data",
    roles_count: 2,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 3,
    name: "data:delete",
    description: "Delete data from the system",
    category: "Data",
    roles_count: 1,
    created_at: new Date("2024-01-01"),
  },

  // Pipeline permissions
  {
    id: 4,
    name: "pipelines:read",
    description: "View pipelines",
    category: "Pipelines",
    roles_count: 3,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 5,
    name: "pipelines:write",
    description: "Create and modify pipelines",
    category: "Pipelines",
    roles_count: 2,
    created_at: new Date("2024-01-01"),
  },

  // Analytics permissions
  {
    id: 6,
    name: "analytics:read",
    description: "View analytics dashboards",
    category: "Analytics",
    roles_count: 3,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 7,
    name: "analytics:write",
    description: "Create and modify analytics",
    category: "Analytics",
    roles_count: 2,
    created_at: new Date("2024-01-01"),
  },

  // User permissions
  {
    id: 8,
    name: "users:read",
    description: "View user information",
    category: "Users",
    roles_count: 2,
    created_at: new Date("2024-01-01"),
  },

  // All access
  {
    id: 9,
    name: "all:read",
    description: "Read access to all resources",
    category: "All",
    roles_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 10,
    name: "all:write",
    description: "Write access to all resources",
    category: "All",
    roles_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 11,
    name: "all:delete",
    description: "Delete access to all resources",
    category: "All",
    roles_count: 1,
    created_at: new Date("2024-01-01"),
  },
  {
    id: 12,
    name: "all:admin",
    description: "Administrative access to all resources",
    category: "All",
    roles_count: 1,
    created_at: new Date("2024-01-01"),
  },
];

const mockActivities: ActivityLog[] = [
  {
    id: "act1",
    user_id: "1",
    user_email: "admin@example.com",
    activity_type: "login",
    details: "User logged in successfully",
    created_at: new Date("2024-05-18T08:30:00"),
  },
  {
    id: "act2",
    user_id: "1",
    user_email: "admin@example.com",
    activity_type: "user_create",
    details: "Created new user sarah.jones@example.com",
    created_at: new Date("2024-03-10T14:20:00"),
  },
  {
    id: "act3",
    user_id: "2",
    user_email: "john.doe@example.com",
    activity_type: "login",
    details: "User logged in successfully",
    created_at: new Date("2024-05-17T09:15:00"),
  },
  {
    id: "act4",
    user_id: "3",
    user_email: "jane.smith@example.com",
    activity_type: "login",
    details: "User logged in successfully",
    created_at: new Date("2024-05-15T10:30:00"),
  },
  {
    id: "act5",
    user_id: "5",
    user_email: "sarah.jones@example.com",
    activity_type: "password_change",
    details: "User changed their password",
    created_at: new Date("2024-05-14T11:20:00"),
  },
  {
    id: "act6",
    user_id: "1",
    user_email: "admin@example.com",
    activity_type: "role_update",
    details: "Updated permissions for the 'analyst' role",
    created_at: new Date("2024-05-12T16:45:00"),
  },
  {
    id: "act7",
    user_id: "4",
    user_email: "mark.wilson@example.com",
    activity_type: "login_failed",
    details: "Failed login attempt (incorrect password)",
    created_at: new Date("2024-04-10T09:30:00"),
  },
  {
    id: "act8",
    user_id: "1",
    user_email: "admin@example.com",
    activity_type: "user_update",
    details: "Deactivated user mark.wilson@example.com",
    created_at: new Date("2024-04-10T10:15:00"),
  },
];

// Mock statistics
const mockStats: Stats = {
  total_users: 5,
  active_users: 4,
  inactive_users: 1,
  total_roles: 5,
  total_permissions: 12,
  new_users_last_30_days: 0,
  login_activity_last_7_days: 3,
};

// Mock API functions
const fetchRecentUsers = async (): Promise<User[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedUsers = [...mockUsers].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      resolve(sortedUsers.slice(0, 5));
    }, 500);
  });
};

const fetchRecentActivities = async (): Promise<ActivityLog[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedActivities = [...mockActivities].sort(
        (a, b) =>
          new Date(b.created_at).getTime() - new Date(a.created_at).getTime(),
      );
      resolve(sortedActivities.slice(0, 5));
    }, 500);
  });
};

const fetchTopRoles = async (): Promise<Role[]> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      const sortedRoles = [...mockRoles].sort(
        (a, b) => b.users_count - a.users_count,
      );
      resolve(sortedRoles.slice(0, 5));
    }, 500);
  });
};

const fetchStats = async (): Promise<Stats> => {
  // Simulate API call
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(mockStats);
    }, 500);
  });
};

// Activity badge component
const ActivityBadge = ({ type }: { type: string }) => {
  switch (type) {
    case "login":
      return (
        <Badge className="bg-green-100 text-green-800">
          <CheckCircle className="w-3 h-3 mr-1" />
          Login
        </Badge>
      );
    case "login_failed":
      return (
        <Badge className="bg-red-100 text-red-800">
          <XCircle className="w-3 h-3 mr-1" />
          Failed Login
        </Badge>
      );
    case "user_create":
      return (
        <Badge className="bg-blue-100 text-blue-800">
          <UserPlus className="w-3 h-3 mr-1" />
          User Created
        </Badge>
      );
    case "user_update":
      return (
        <Badge className="bg-amber-100 text-amber-800">
          <Users className="w-3 h-3 mr-1" />
          User Updated
        </Badge>
      );
    case "role_update":
      return (
        <Badge className="bg-purple-100 text-purple-800">
          <ShieldCheck className="w-3 h-3 mr-1" />
          Role Updated
        </Badge>
      );
    case "password_change":
      return (
        <Badge className="bg-indigo-100 text-indigo-800">
          <Settings className="w-3 h-3 mr-1" />
          Password Changed
        </Badge>
      );
    default:
      return (
        <Badge variant="outline">
          <Activity className="w-3 h-3 mr-1" />
          {type.replace(/_/g, " ")}
        </Badge>
      );
  }
};

// Stat card component
const StatCard = ({
  title,
  value,
  icon,
  description,
  trend,
  trendValue,
}: {
  title: string;
  value: number | string;
  icon: React.ReactNode;
  description?: string;
  trend?: "up" | "down" | "neutral";
  trendValue?: string;
}) => {
  return (
    <Card>
      <CardContent className="p-6">
        <div className="flex items-center justify-between space-y-0 pb-2">
          <h3 className="text-sm font-medium leading-none tracking-tight text-muted-foreground">
            {title}
          </h3>
          <div className="text-muted-foreground">{icon}</div>
        </div>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground mt-1">{description}</p>
        )}
        {trend && trendValue && (
          <div className="flex items-center mt-2">
            <div
              className={`mr-2 text-xs font-medium ${
                trend === "up"
                  ? "text-green-600"
                  : trend === "down"
                    ? "text-red-600"
                    : "text-muted-foreground"
              }`}
            >
              {trend === "up" ? "↑" : trend === "down" ? "↓" : "→"} {trendValue}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default function UserManagementDashboard() {
  const navigate = useNavigate();
  const [recentUsers, setRecentUsers] = useState<User[]>([]);
  const [recentActivities, setRecentActivities] = useState<ActivityLog[]>([]);
  const [topRoles, setTopRoles] = useState<Role[]>([]);
  const [stats, setStats] = useState<Stats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const [usersData, activitiesData, rolesData, statsData] =
          await Promise.all([
            fetchRecentUsers(),
            fetchRecentActivities(),
            fetchTopRoles(),
            fetchStats(),
          ]);

        setRecentUsers(usersData);
        setRecentActivities(activitiesData);
        setTopRoles(rolesData);
        setStats(statsData);
      } catch (error) {
        console.error("Failed to load dashboard data:", error);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <div className="container mx-auto py-6">
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-6 space-y-8">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">
          User Management Dashboard
        </h1>
        <p className="text-muted-foreground mt-1">
          Overview of user accounts, roles, and permissions.
        </p>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatCard
          title="Total Users"
          value={stats?.total_users || 0}
          icon={<Users className="h-4 w-4" />}
          description={`${stats?.active_users || 0} active, ${stats?.inactive_users || 0} inactive`}
        />
        <StatCard
          title="Total Roles"
          value={stats?.total_roles || 0}
          icon={<ShieldCheck className="h-4 w-4" />}
          description="Unique role configurations"
        />
        <StatCard
          title="Total Permissions"
          value={stats?.total_permissions || 0}
          icon={<ShieldAlert className="h-4 w-4" />}
          description="Available system permissions"
        />
        <StatCard
          title="Recent Logins"
          value={stats?.login_activity_last_7_days || 0}
          icon={<Activity className="h-4 w-4" />}
          description="In the last 7 days"
          trend="up"
          trendValue="23% from last week"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent users */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Recent Users</CardTitle>
            <CardDescription>Recently added user accounts</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentUsers.slice(0, 4).map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-3">
                    <Avatar>
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
                        {user.full_name || user.email}
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {user.email}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <Badge
                      className={
                        user.is_active
                          ? "bg-green-100 text-green-800"
                          : "bg-gray-100 text-gray-800"
                      }
                    >
                      {user.is_active ? "Active" : "Inactive"}
                    </Badge>
                    <TooltipProvider>
                      <Tooltip>
                        <TooltipTrigger asChild>
                          <Button
                            size="icon"
                            className="ml-2"
                            onClick={() => navigate(`/users/${user.id}`)}
                          >
                            <ChevronRight className="h-4 w-4" />
                          </Button>
                        </TooltipTrigger>
                        <TooltipContent>
                          <p>View details</p>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full" onClick={() => navigate("/users")}>
              <Users className="mr-2 h-4 w-4" /> View All Users
            </Button>
          </CardFooter>
        </Card>

        {/* Recent activity */}
        <Card className="col-span-1">
          <CardHeader className="pb-2">
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Latest user and security events</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.slice(0, 4).map((activity) => (
                <div key={activity.id} className="space-y-1">
                  <div className="flex items-center justify-between">
                    <ActivityBadge type={activity.activity_type} />
                    <span className="text-xs text-muted-foreground">
                      {new Date(activity.created_at).toLocaleString()}
                    </span>
                  </div>
                  <div className="text-sm">{activity.details}</div>
                  <div className="text-xs text-muted-foreground">
                    {activity.user_email}
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter className="border-t pt-4">
            <Button className="w-full" onClick={() => navigate("/activity")}>
              <Activity className="mr-2 h-4 w-4" /> View Activity Log
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* Role & Permission Insights */}
      <Card>
        <CardHeader>
          <CardTitle>Role & Permission Insights</CardTitle>
          <CardDescription>
            Overview of role usage and permission distribution
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="roles">
            <TabsList>
              <TabsTrigger value="roles">Top Roles</TabsTrigger>
              <TabsTrigger value="permissions">
                Permission Categories
              </TabsTrigger>
            </TabsList>

            <TabsContent value="roles" className="pt-4">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Role Name</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>User Count</TableHead>
                    <TableHead>Permission Count</TableHead>
                    <TableHead className="text-right">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {topRoles.map((role) => (
                    <TableRow key={role.id}>
                      <TableCell className="font-medium capitalize">
                        {role.name}
                      </TableCell>
                      <TableCell>{role.description}</TableCell>
                      <TableCell>
                        <Badge variant="outline">{role.users_count}</Badge>
                      </TableCell>
                      <TableCell>
                        <Badge variant="outline">
                          {role.permissions.length}
                        </Badge>
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          size="sm"
                          onClick={() => navigate(`/roles/${role.id}`)}
                        >
                          <Eye className="h-4 w-4 mr-1" /> View
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
              <div className="mt-4 text-center">
                <Button onClick={() => navigate("/roles")}>
                  <ShieldCheck className="mr-2 h-4 w-4" /> Manage Roles
                </Button>
              </div>
            </TabsContent>

            <TabsContent value="permissions" className="pt-4">
              {/* Group permissions by category */}
              {(() => {
                const categories = mockPermissions.reduce(
                  (acc, permission) => {
                    if (!acc[permission.category]) {
                      acc[permission.category] = [];
                    }
                    acc[permission.category].push(permission);
                    return acc;
                  },
                  {} as Record<string, Permission[]>,
                );

                return (
                  <div className="space-y-6">
                    {Object.entries(categories).map(
                      ([category, permissions]) => (
                        <div key={category}>
                          <h3 className="font-medium text-lg mb-2">
                            {category}
                          </h3>
                          <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                            {permissions.map((permission) => (
                              <div
                                key={permission.id}
                                className="border rounded-md p-3"
                              >
                                <div className="font-medium font-mono text-sm">
                                  {permission.name}
                                </div>
                                <div className="text-sm">
                                  {permission.description}
                                </div>
                                <div className="text-xs text-muted-foreground mt-1">
                                  Used in {permission.roles_count} role
                                  {permission.roles_count !== 1 ? "s" : ""}
                                </div>
                              </div>
                            ))}
                          </div>
                        </div>
                      ),
                    )}

                    <div className="mt-4 text-center">
                      <Button onClick={() => navigate("/permissions")}>
                        <ShieldAlert className="mr-2 h-4 w-4" /> Manage
                        Permissions
                      </Button>
                    </div>
                  </div>
                );
              })()}
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>

      {/* Quick actions */}
      <Card>
        <CardHeader>
          <CardTitle>Quick Actions</CardTitle>
          <CardDescription>Common user management tasks</CardDescription>
        </CardHeader>
        <CardContent className="flex flex-wrap gap-4">
          <Button onClick={() => navigate("/users/create")}>
            <UserPlus className="mr-2 h-4 w-4" /> Add New User
          </Button>
          <Button onClick={() => navigate("/roles/create")}>
            <ShieldCheck className="mr-2 h-4 w-4" /> Create New Role
          </Button>
          <Button onClick={() => navigate("/permissions")}>
            <ShieldAlert className="mr-2 h-4 w-4" /> Manage Permissions
          </Button>
          <Button onClick={() => navigate("/users")}>
            <Filter className="mr-2 h-4 w-4" /> Filter Users
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
