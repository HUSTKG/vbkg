import { useCreateDatasource, useDatasources } from "@vbkg/api-client";
import { CreateDataSourceSchema } from "@vbkg/schemas";
import { DataSource, SourceType } from "@vbkg/types";
import {
  AppForm,
  Button,
  Card,
  ConfirmDialog,
  CustomDrawer,
  DeleteDialog,
  Dialog,
  EntityCard,
  ErrorNotification,
  SearchBar,
  SuccessNotification,
} from "@vbkg/ui";
import { useState } from "react";
import { FieldConfig } from "../../../../../packages/ui/dist/components/form";

const getConnectionFields = (type: SourceType): FieldConfig[] => {
  switch (type) {
    case SourceType.FILE:
      return [
        {
          label: "File Path",
          name: "file_path",
          type: "text",
          placeholder: "Enter file path",
          required: true,
        },
        {
          label: "File Format",
          name: "file_format",
          type: "select",
          placeholder: "Select file format",
          options: [
            { value: "csv", label: "CSV" },
            { value: "json", label: "JSON" },
            { value: "txt", label: "TXT" },
            { value: "pdf", label: "PDF" },
          ],
          required: true,
        },
        {
          label: "Encoding",
          name: "encoding",
          type: "text",
          placeholder: "Enter encoding (optional)",
          required: false,
        },
        {
          label: "Delimiter",
          name: "delimiter",
          type: "text",
          placeholder: "Enter delimiter (optional)",
          required: false,
        },
      ];
    case SourceType.DATABASE:
      return [
        {
          label: "Host",
          name: "host",
          type: "text",
          placeholder: "Enter database host",
          required: true,
        },
        {
          label: "Port",
          name: "port",
          type: "number",
          placeholder: "Enter database port",
          required: true,
        },
        {
          label: "Database Name",
          name: "database",
          type: "text",
          placeholder: "Enter database name",
          required: true,
        },
        {
          label: "Username",
          name: "username",
          type: "text",
          placeholder: "Enter username",
          required: true,
        },
        {
          label: "Password",
          name: "password",
          type: "password",
          placeholder: "Enter password (optional)",
          required: false,
        },
        {
          label: "Database Type",
          name: "db_type",
          type: "select",
          placeholder: "Select database type",
          options: [
            { value: "postgres", label: "PostgreSQL" },
            { value: "mysql", label: "MySQL" },
            { value: "mssql", label: "MS SQL Server" },
          ],
          required: true,
        },
        {
          label: "Use SSL",
          name: "ssl",
          type: "switch",
          description: "Enable secure connection",
          defaultValue: false,
          required: false,
        },
        {
          label: "SQL Query",
          name: "query",
          type: "textarea",
          placeholder: "Enter SQL query (optional)",
          required: false,
        },
        {
          label: "Table Name",
          name: "table",
          type: "text",
          placeholder: "Enter table name (optional)",
          required: false,
        },
      ];
    case SourceType.API:
      return [
        {
          label: "API URL",
          name: "url",
          type: "text",
          placeholder: "Enter API URL (e.g., https://api.example.com/v1)",
          required: true,
        },
        {
          label: "HTTP Method",
          name: "method",
          placeholder: "Select HTTP method",
          type: "select",
          options: [
            { value: "GET", label: "GET" },
            { value: "POST", label: "POST" },
            { value: "PUT", label: "PUT" },
            { value: "DELETE", label: "DELETE" },
          ],
          required: true,
        },
        {
          label: "Headers",
          name: "headers",
          type: "object",
          placeholder: "Enter headers",
          required: false,
          fields: [
            {
              label: "Content-Type",
              name: "Content-Type",
              type: "text",
              placeholder: "application/json",
              required: false,
            },
            {
              label: "Accept",
              name: "Accept",
              type: "text",
              placeholder: "application/json",
              required: false,
            },
          ],
        },
        {
          label: "Query Parameters",
          name: "query_params",
          type: "object",
          placeholder: "Enter query parameters",
          required: false,
        },
        {
          label: "Request Body",
          name: "body",
          type: "textarea",
          placeholder: "Enter request body (optional)",
          required: false,
        },
        {
          label: "Authentication Type",
          name: "auth_type",
          type: "select",
          placeholder: "Select authentication type",
          options: [
            { value: "BASIC", label: "Basic Auth" },
            { value: "BEARER", label: "Bearer Token" },
          ],
          required: false,
        },
        {
          label: "Authentication Config",
          name: "auth_config",
          type: "object",
          required: false,
          fields: [
            {
              label: "Username",
              name: "username",
              type: "text",
              placeholder: "Enter username",
              required: false,
            },
            {
              label: "Password",
              name: "password",
              type: "password",
              placeholder: "Enter password",
              required: false,
            },
            {
              label: "Token",
              name: "token",
              type: "text",
              placeholder: "Enter bearer token",
              required: false,
            },
          ],
        },
      ];
    case SourceType.URL:
      return [
        {
          label: "URL",
          name: "url",
          type: "text",
          placeholder: "Enter URL (e.g., https://example.com/data)",
          required: true,
        },
        {
          label: "Headers",
          name: "headers",
          type: "object",
          placeholder: "Enter headers",
          required: false,
          fields: [
            {
              label: "User-Agent",
              name: "User-Agent",
              type: "text",
              placeholder: "Mozilla/5.0...",
              required: false,
            },
            {
              label: "Accept",
              name: "Accept",
              type: "text",
              placeholder: "text/html,application/xhtml+xml",
              required: false,
            },
          ],
        },
        {
          label: "Scrape Configuration",
          name: "scrape_config",
          type: "object",
          required: false,
          fields: [
            {
              label: "CSS Selector",
              name: "selector",
              type: "text",
              placeholder: "Enter CSS selector",
              required: false,
            },
            {
              label: "XPath",
              name: "xpath",
              type: "text",
              placeholder: "Enter XPath",
              required: false,
            },
            {
              label: "Extract Tables",
              name: "extract_tables",
              type: "switch",
              defaultValue: false,
              required: false,
            },
            {
              label: "Extract Links",
              name: "extract_links",
              type: "switch",
              defaultValue: false,
              required: false,
            },
          ],
        },
      ];
    default:
      return [];
  }
};

export default function ConfigureDataSource() {
  const { mutate: createDatasource } = useCreateDatasource({
    onSuccess: (data) => {
      console.log(data);
    },
    onError: (error) => {
      console.error("Error creating data source", error);
    },
  });

  const dataSources = useDatasources({})?.data?.data || [];

  const [selectedSource, setSelectedSource] = useState<DataSource | null>(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showTestDialog, setShowTestDialog] = useState(false);
  const [notification, setNotification] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handleTestConnection = () => {
    setShowTestDialog(false);
    setNotification({
      type: "success",
      message: "Connection test successful",
    });
  };

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold">Data Sources</h1>
        <Button onClick={() => setShowAddDialog(true)}>Add Data Source</Button>
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

      {/* Data Sources Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {dataSources.map((source) => (
          <EntityCard
            key={source.id}
            id={source.id}
            type="data-source"
            name={source.name}
            properties={[
              { key: "Type", value: source.source_type },
              {
                key: "Status",
                value: source.is_active ? "Active" : "Inactive",
              },
            ]}
          />
        ))}
      </div>

      {/* Data Sources Table */}
      <Card className="p-4">
        <div className="mb-4">
          <SearchBar
            onSearch={(query) => console.log("Search:", query)}
            placeholder="Search data sources..."
          />
        </div>
      </Card>

      {/* Add Data Source Dialog */}
      <CustomDrawer
        open={showAddDialog}
        setOpen={setShowAddDialog}
        title="Add Data Source"
        showFooter={false}
        contentClassName="max-w-4xl max-h-[80vh] overflow-y-auto w-screen"
      >
        <div>
          <AppForm
            fields={(formData) => [
              {
                label: "Name",
                name: "name",
                type: "text",
                placeholder: "Enter data source name",
                required: true,
              },
              {
                label: "Type",
                name: "source_type",
                type: "select",
                placeholder: "Select data source type",
                options: [
                  { value: SourceType.API, label: "REST API" },
                  { value: SourceType.DATABASE, label: "Database" },
                  { value: SourceType.FILE, label: "File" },
                  { value: SourceType.URL, label: "URL" },
                ],
                required: true,
              },
              {
                label: "Description",
                name: "description",
                type: "textarea",
                placeholder: "Enter description",
                required: false,
              },
              {
                label: "Connection Details",
                name: "connection_details",
                type: "object",
                placeholder: "Enter connection details",
                required: true,
                fields: formData?.source_type
                  ? getConnectionFields(formData.source_type)
                  : [],
              },
              {
                label: "Credentials",
                name: "credentials",
                type: "object",
                placeholder: "Enter credentials",
                required: false,
                collapsible: true,
                fields: [
                  {
                    label: "OAuth Token",
                    name: "oauth_token",
                    type: "text",
                    placeholder: "Enter OAuth token",
                    required: false,
                  },
                ],
              },
            ]}
            schema={CreateDataSourceSchema}
            watchFields={["source_type"]}
            onSubmit={(values) => {
              createDatasource({
                name: values.name,
                description: values.description,
                source_type: values.source_type,
                credentials: values.credentials,
                connection_details: values.connection_details,
              });
            }}
          />
        </div>
      </Dialog>

      {/* Test Connection Dialog */}
      <ConfirmDialog
        message="Testing connection to the data source..."
        isOpen={showTestDialog}
        onCancel={() => setShowTestDialog(false)}
        onConfirm={handleTestConnection}
        title="Test Connection"
      />

      {/* Delete Data Source Dialog */}
      <DeleteDialog
        isOpen={showDeleteDialog}
        onCancel={() => setShowDeleteDialog(false)}
        onConfirm={() => {
          if (selectedSource) {
            setShowDeleteDialog(false);
            setNotification({
              type: "success",
              message: "Data source deleted successfully",
            });
          }
        }}
        title="Delete Data Source"
        message={`Are you sure you want to delete "${selectedSource?.name}"? This action cannot be undone.`}
      />
    </div>
  );
}
