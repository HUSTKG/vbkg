import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@vbkg/ui";
import { Plus } from "lucide-react";
import { useNavigate } from "react-router";
import DataPipelineTable from "./components/table/list";

export default function PipelineListPage() {
  const navigate = useNavigate();
  const handleCreatePipeline = () => {
    navigate("./create");
  };

  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold tracking-tight">Pipelines</h1>
        <Button onClick={handleCreatePipeline}>
          <Plus className="mr-2 h-4 w-4" /> Create Pipeline
        </Button>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Pipeline Management</CardTitle>
          <CardDescription>
            View, create, edit and run your data pipelines.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <DataPipelineTable />
        </CardContent>
      </Card>
    </div>
  );
}
