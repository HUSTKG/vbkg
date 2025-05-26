import {
  Activity,
  AlertCircle,
  BarChart3,
  CheckCircle,
  Database,
  Download,
  GitBranch,
  Layers,
  Link,
  Network,
  Plus,
  RefreshCw,
  Target,
  TrendingUp,
  Upload,
  Zap,
} from "lucide-react";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  StatisticCard,
} from "@vbkg/ui";
import { useKGStats } from "@vbkg/api-client";

export default function KnowledgeGraphOverview() {
  const { data: stats, isFetching: loading } = useKGStats();

  const recentActivities = [
    {
      title: "New entity created",
      description: "Microsoft Corporation added to knowledge graph",
      time: "5 minutes ago",
      status: "success",
      icon: <Plus size={16} />,
    },
    {
      title: "Relationship verified",
      description: "WORKS_FOR relationship between John Doe and Apple Inc.",
      time: "12 minutes ago",
      status: "info",
      icon: <CheckCircle size={16} />,
    },
    {
      title: "Conflict detected",
      description: "Duplicate entity detected: Apple Inc.",
      time: "1 hour ago",
      status: "warning",
      icon: <AlertCircle size={16} />,
    },
    {
      title: "Batch import completed",
      description: "150 new entities imported from external source",
      time: "2 hours ago",
      status: "success",
      icon: <Upload size={16} />,
    },
    {
      title: "Quality check failed",
      description: "Low confidence relationships detected",
      time: "3 hours ago",
      status: "error",
      icon: <AlertCircle size={16} />,
    },
  ];

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">📊 Knowledge Graph Overview</h1>
        </div>
        <div className="flex gap-2">
          <Button onClick={() => window.location.reload()}>
            <RefreshCw size={16} className="mr-2" />
            Refresh
          </Button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4">
        <StatisticCard
          title="Total Entities"
          value={loading ? "..." : stats?.total_entities?.toLocaleString() || 0}
          icon={<Database size={20} />}
          color="blue"
          loading={loading}
          trend={{ value: 12, isPositive: true }}
        />
        <StatisticCard
          title="Total Relationships"
          value={
            loading ? "..." : stats?.total_relationships?.toLocaleString() || 0
          }
          icon={<Network size={20} />}
          color="green"
          loading={loading}
          trend={{ value: 8, isPositive: true }}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-2 gap-6">
        {/* Entity Types Distribution */}
        <Card className="lg:col-span-1 overflow-y-auto max-h-[60vh]">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Layers size={20} />
              Entity Types
            </CardTitle>
            <CardDescription>Distribution by entity type</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-muted rounded w-24 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.entity_types?.map((type: any, i: any) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="outline">{type.entity_type}</Badge>
                      <span className="font-medium">
                        {type.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-blue-500 h-2 rounded-full"
                        style={{
                          width: `${(type.count / stats.total_entities) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Relationship Types Distribution */}
        <Card className="lg:col-span-1 overflow-y-auto p-0 max-h-[60vh]">
          <CardHeader className="sticky top-0 bg-white/95 p-4">
            <CardTitle className="flex items-center gap-2">
              <GitBranch size={20} />
              Relationship Types
            </CardTitle>
            <CardDescription>Distribution by relationship type</CardDescription>
          </CardHeader>
          <CardContent className="p-4">
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="flex justify-between items-center">
                    <div className="h-4 bg-muted rounded w-28 animate-pulse" />
                    <div className="h-4 bg-muted rounded w-12 animate-pulse" />
                  </div>
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {stats?.relationship_types?.map((type: any, i: any) => (
                  <div key={i} className="space-y-2">
                    <div className="flex justify-between items-center">
                      <Badge variant="secondary">
                        {type.relationship_type}
                      </Badge>
                      <span className="font-medium">
                        {type.count.toLocaleString()}
                      </span>
                    </div>
                    <div className="w-full bg-muted rounded-full h-2">
                      <div
                        className="bg-green-500 h-2 rounded-full"
                        style={{
                          width: `${(type.count / stats.total_relationships) * 100}%`,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
