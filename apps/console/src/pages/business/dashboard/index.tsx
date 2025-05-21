import {
    ConflictDetectedActivity,
    DataAddedActivity,
    EntityCard,
    InfoActivity,
    SearchBar,
    StatisticCard,
} from "@vbkg/ui";
import { useState } from "react";

export default function BusinessDashboard() {
  const [_searchQuery, setSearchQuery] = useState("");

  const recentActivities = [
    {
      type: "data-added",
      title: "New Data Added",
      description: "150 new entities added to Project A",
      timestamp: "2024-04-14T10:30:00Z",
    },
    {
      type: "conflict",
      title: "Conflict Detected",
      description: "Data conflict in Project B needs resolution",
      timestamp: "2024-04-14T09:15:00Z",
    },
    {
	  type: "info",
      title: "Pipeline Completed",
      description: "Data processing pipeline completed successfully",
      timestamp: "2024-04-14T08:45:00Z",
    },
  ];

  const projects = [
    {
      id: "1",
      name: "Project A",
      entities: 1500,
      relations: 3200,
      lastUpdated: "2024-04-14",
    },
    {
      id: "2",
      name: "Project B",
      entities: 2300,
      relations: 4500,
      lastUpdated: "2024-04-13",
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <SearchBar
          onSearch={setSearchQuery}
          placeholder="Search across projects..."
        />
      </div>

      {/* Statistics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatisticCard
          title="Total Entities"
          value={3800}
          trend={{
            value: 10,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Total Relations"
          value={7700}
          trend={{
            value: -5,
            isPositive: false,
          }}
        />
        <StatisticCard
          title="API Usage"
          value="85%"
          trend={{
            value: 20,
            isPositive: true,
          }}
        />
        <StatisticCard
          title="Active Projects"
          value={2}
          trend={{
            value: 0,
            isPositive: false,
          }}
        />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Projects */}
        <div className="lg:col-span-2 space-y-4">
          <h2 className="text-lg font-semibold">Active Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {projects.map((project) => (
              <EntityCard
                key={project.id}
                id={project.id}
                type="project"
                name={project.name}
                properties={[
                  { key: "Entities", value: project.entities.toString() },
                  { key: "Relations", value: project.relations.toString() },
                  { key: "Last Updated", value: project.lastUpdated },
                ]}
              />
            ))}
          </div>
        </div>

        {/* Recent Activity */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold">Recent Activity</h2>
          <div className="bg-white rounded-lg shadow p-4 space-y-4">
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
        </div>
      </div>
    </div>
  );
}
