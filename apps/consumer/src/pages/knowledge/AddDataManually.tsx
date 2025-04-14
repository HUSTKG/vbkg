// src/pages/knowledge/AddDataManually.tsx
import { ConfirmDialog, EmptyState } from "@vbkg/ui";
import { AlertTriangle, Save } from "lucide-react";
import { useState } from "react";

interface EntityType {
  id: string;
  name: string;
  properties: Array<{
    name: string;
    type: string;
    required: boolean;
  }>;
}

interface PropertyValue {
  name: string;
  value: string;
  type: string;
  required: boolean;
}

const AddDataManuallyPage = () => {
  const [entityTypes, setEntityTypes] = useState<EntityType[]>([]);
  const [selectedType, setSelectedType] = useState<string>("");
  const [entityName, setEntityName] = useState<string>("");
  const [propertyValues, setPropertyValues] = useState<PropertyValue[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showSuccessDialog, setShowSuccessDialog] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const initializePropertyValues = (entityType: EntityType) => {
    const initialValues = entityType.properties.map((prop) => ({
      name: prop.name,
      value: "",
      type: prop.type,
      required: prop.required,
    }));

    setPropertyValues(initialValues);
  };

  const handleTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const typeId = e.target.value;
    setSelectedType(typeId);

    // Find the selected entity type
    const entityType = entityTypes.find((type) => type.id === typeId);
    if (entityType) {
      initializePropertyValues(entityType);
    }

    // Clear any previous errors
    setErrors({});
  };

  const handlePropertyChange = (index: number, value: string) => {
    const updatedValues = [...propertyValues];
    updatedValues[index].value = value;
    setPropertyValues(updatedValues);

    // Clear error for this property
    const propName = propertyValues[index].name;
    if (errors[propName]) {
      const newErrors = { ...errors };
      delete newErrors[propName];
      setErrors(newErrors);
    }
  };

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!entityName.trim()) {
      newErrors.name = "Tên entity không được để trống";
    }

    propertyValues.forEach((prop) => {
      if (prop.required && !prop.value.trim()) {
        newErrors[prop.name] = `Trường ${prop.name} là bắt buộc`;
      } else if (
        prop.value.trim() &&
        prop.type === "number" &&
        isNaN(Number(prop.value))
      ) {
        newErrors[prop.name] = `Trường ${prop.name} phải là số`;
      } else if (
        prop.value.trim() &&
        prop.type === "date" &&
        isNaN(Date.parse(prop.value))
      ) {
        newErrors[prop.name] = `Trường ${prop.name} phải là ngày hợp lệ`;
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // Convert property values to the expected format
    const properties = propertyValues.reduce(
      (acc, prop) => {
        if (prop.value.trim()) {
          // Convert value to the appropriate type
          let value = prop.value;
          if (prop.type === "number") {
            value = Number(prop.value).toString();
          } else if (prop.type === "boolean") {
            value = (prop.value.toLowerCase() === "true").toString();
          }

          acc[prop.name] = value;
        }
        return acc;
      },
      {} as Record<string, string>,
    );

    try {
      await api.createEntity(selectedType, entityName, properties);
      setShowSuccessDialog(true);

      // Reset form
      setEntityName("");
      const entityType = entityTypes.find((type) => type.id === selectedType);
      if (entityType) {
        initializePropertyValues(entityType);
      }
    } catch (error) {
      console.error("Error creating entity:", error);
      // Handle API error
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (entityTypes.length === 0) {
    return (
      <EmptyState
        title="Không có loại entity"
        description="Không thể thêm dữ liệu vì chưa có loại entity nào được định nghĩa. Vui lòng tạo cấu trúc ontology trước."
        icon={<AlertTriangle size={48} className="text-gray-400" />}
        action={
          <a
            href="/manage-ontology"
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            Quản lý Ontology
          </a>
        }
        bordered
        size="lg"
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Thêm dữ liệu thủ công
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Thêm dữ liệu mới vào Knowledge Graph
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label
                htmlFor="entityType"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Loại Entity
              </label>
              <select
                id="entityType"
                value={selectedType}
                onChange={handleTypeChange}
                className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              >
                {entityTypes.map((type) => (
                  <option key={type.id} value={type.id}>
                    {type.name}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label
                htmlFor="entityName"
                className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
              >
                Tên Entity
              </label>
              <input
                id="entityName"
                type="text"
                value={entityName}
                onChange={(e) => setEntityName(e.target.value)}
                className={`w-full p-2 border ${errors.name ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                placeholder="Nhập tên entity"
              />
              {errors.name && (
                <p className="mt-1 text-sm text-red-500">{errors.name}</p>
              )}
            </div>
          </div>

          <div className="mb-6">
            <h3 className="text-lg font-medium mb-2">Properties</h3>
            <div className="space-y-4">
              {propertyValues.map((prop, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start"
                >
                  <div className="md:col-span-1">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                      {prop.name}
                      {prop.required && (
                        <span className="text-red-500 ml-1">*</span>
                      )}
                    </label>
                    <span className="text-xs text-gray-500 dark:text-gray-400 block mt-0.5">
                      {prop.type}
                    </span>
                  </div>
                  <div className="md:col-span-2">
                    {prop.type === "boolean" ? (
                      <select
                        value={prop.value}
                        onChange={(e) =>
                          handlePropertyChange(index, e.target.value)
                        }
                        className={`w-full p-2 border ${errors[prop.name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                      >
                        <option value="">-- Chọn --</option>
                        <option value="true">True</option>
                        <option value="false">False</option>
                      </select>
                    ) : prop.type === "date" ? (
                      <input
                        type="date"
                        value={prop.value}
                        onChange={(e) =>
                          handlePropertyChange(index, e.target.value)
                        }
                        className={`w-full p-2 border ${errors[prop.name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                      />
                    ) : (
                      <input
                        type={prop.type === "number" ? "number" : "text"}
                        value={prop.value}
                        onChange={(e) =>
                          handlePropertyChange(index, e.target.value)
                        }
                        className={`w-full p-2 border ${errors[prop.name] ? "border-red-500" : "border-gray-300 dark:border-gray-600"} rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white`}
                        placeholder={`Nhập ${prop.name}`}
                      />
                    )}
                    {errors[prop.name] && (
                      <p className="mt-1 text-sm text-red-500">
                        {errors[prop.name]}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-end">
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center"
            >
              <Save size={16} className="mr-2" />
              Lưu Entity
            </button>
          </div>
        </form>
      </div>

      {/* Success Dialog */}
      <ConfirmDialog
        isOpen={showSuccessDialog}
        title="Entity đã được tạo thành công"
        message="Entity mới đã được thêm vào Knowledge Graph."
        confirmLabel="OK"
        cancelLabel=""
        onConfirm={() => setShowSuccessDialog(false)}
        onCancel={() => setShowSuccessDialog(false)}
        type="success"
      />
    </div>
  );
};

export default AddDataManuallyPage;
