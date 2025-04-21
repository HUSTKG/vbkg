// packages/console/src/pages/business/TeamManagement.tsx
import { useState } from "react";
import {
  Card,
  Button,
  Table,
  SearchBar,
  DeleteDialog,
  ConfirmDialog,
  StatisticCard,
  SuccessNotification,
  ErrorNotification,
} from "@vbkg/ui";

interface TeamMember {
  id: string;
  name: string;
  email: string;
  role: "Owner" | "Admin" | "Editor" | "Viewer";
  status: "Active" | "Pending" | "Inactive";
  joinedAt: string;
  lastActive: string;
}

export default function TeamManagement() {
  const [members, setMembers] = useState<TeamMember[]>([
    {
      id: "1",
      name: "John Doe",
      email: "john@example.com",
      role: "Owner",
      status: "Active",
      joinedAt: "2024-01-15",
      lastActive: "2024-04-14",
    },
    {
      id: "2",
      name: "Jane Smith",
      email: "jane@example.com",
      role: "Admin",
      status: "Active",
      joinedAt: "2024-02-01",
      lastActive: "2024-04-13",
    },
  ]);

  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showInviteDialog, setShowInviteDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleInviteMember = () => {
    setShowInviteDialog(false);
    setNotification({
      type: "success",
      message: "Invitation sent successfully",
    });
  };

  const handleDeleteMember = () => {
    if (selectedMember) {
      setMembers(members.filter((m) => m.id !== selectedMember.id));
      setShowDeleteDialog(false);
      setSelectedMember(null);
      setNotification({
        type: "success",
        message: "Team member removed successfully",
      });
    }
  };

  const handleRoleChange = (memberId: string, newRole: TeamMember["role"]) => {
    setMembers(
      members.map((member) =>
        member.id === memberId ? { ...member, role: newRole } : member,
      ),
    );
    setNotification({
      type: "success",
      message: "Role updated successfully",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Team Management</h1>
        <Button onClick={() => setShowInviteDialog(true)}>
          Invite Team Member
        </Button>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatisticCard
          title="Total Members"
          value={members.length}
          trend={{
            value: members.length,
            isPositive: members.length > 0,
          }}
        />
        <StatisticCard
          title="Active Members"
          value={members.filter((m) => m.status === "Active").length}
          trend={{
            value: members.filter((m) => m.status === "Active").length,
            isPositive: members.filter((m) => m.status === "Active").length > 0,
          }}
        />
        <StatisticCard
          title="Pending Invites"
          value={members.filter((m) => m.status === "Pending").length}
          trend={{
            value: members.filter((m) => m.status === "Pending").length,
            isPositive:
              members.filter((m) => m.status === "Pending").length > 0,
          }}
        />
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

      {/* Team Members Table */}
      <Card className="p-4">
        <div className="mb-4">
          <SearchBar
            onSearch={(query) => console.log("Search:", query)}
            placeholder="Search team members..."
          />
        </div>

        <Table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Joined</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {members.map((member) => (
              <tr key={member.id}>
                <td>{member.name}</td>
                <td>{member.email}</td>
                <td>
                  <select
                    className="border rounded-md px-2 py-1"
                    value={member.role}
                    onChange={(e) =>
                      handleRoleChange(
                        member.id,
                        e.target.value as TeamMember["role"],
                      )
                    }
                    disabled={member.role === "Owner"}
                  >
                    <option value="Admin">Admin</option>
                    <option value="Editor">Editor</option>
                    <option value="Viewer">Viewer</option>
                  </select>
                </td>
                <td>
                  <span
                    className={`px-2 py-1 rounded-full text-xs ${
                      member.status === "Active"
                        ? "bg-green-100 text-green-800"
                        : member.status === "Pending"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                    }`}
                  >
                    {member.status}
                  </span>
                </td>
                <td>{member.joinedAt}</td>
                <td>{member.lastActive}</td>
                <td>
                  <div className="flex space-x-2">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => console.log("View member:", member.id)}
                    >
                      View
                    </Button>
                    {member.role !== "Owner" && (
                      <Button
                        variant="destructive"
                        size="sm"
                        onClick={() => {
                          setSelectedMember(member);
                          setShowDeleteDialog(true);
                        }}
                      >
                        Remove
                      </Button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </Card>

      {/* Invite Member Dialog */}
      <ConfirmDialog
        isOpen={showInviteDialog}
        onCancel={() => setShowInviteDialog(false)}
        message="Enter the email address of the team member you want to invite."
        onConfirm={handleInviteMember}
        title="Invite Team Member"
      />

      {/* Delete Confirmation Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={handleDeleteMember}
        title="Remove Team Member"
        message={`Are you sure you want to remove ${selectedMember?.name} from the team?`}
      />
    </div>
  );
}
