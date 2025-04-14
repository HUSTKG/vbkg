// src/pages/admin/ManageOntology.tsx
import {
  ClassDetails,
  ConfirmDialog,
  EmptyState,
  OntologyGraph,
  SearchBar,
} from "@vbkg/ui";
import { AlertTriangle, Plus } from "lucide-react";
import { useEffect, useState } from "react";

interface OntologyClass {
  id: string | number;
  name: string;
  description: string;
  properties: Array<{
    name: string;
    type: string;
    required: boolean;
    description: string;
  }>;
}

interface OntologyRelation {
  id: string;
  name: string;
  source: string;
  target: string;
  description: string;
}

const ManageOntologyPage = () => {
  const [classes, setClasses] = useState<OntologyClass[]>([]);
  const [relations, setRelations] = useState<OntologyRelation[]>([]);
  const [selectedClass, setSelectedClass] = useState<OntologyClass | null>(
    null,
  );
  const [isLoading, setIsLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [classToDelete, setClassToDelete] = useState<string | null>(
    null,
  );

  useEffect(() => {}, []);

  const handleSelectNode = (
    type: "class" | "relation",
    id: string | number,
  ) => {
    // Handle relation selection if needed
  };

  const handleUpdateClass = async (updatedClass: OntologyClass) => {};

  const handleAddClass = async () => {};

  const handleDeleteClass = async (id: string) => {};

  const confirmDelete = (id: string | number) => {
    setClassToDelete(id as string);
    setShowDeleteDialog(true);
  };

  // Filter classes based on search term
  const filteredClasses = classes.filter(
    (cls) =>
      cls.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cls.description.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (classes.length === 0) {
    return (
      <EmptyState
        title="Không có cấu trúc ontology"
        description="Bắt đầu bằng cách tạo class đầu tiên cho ontology của bạn."
        icon={<AlertTriangle size={48} className="text-gray-400" />}
        action={
          <button
            onClick={handleAddClass}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
          >
            <Plus size={16} className="inline mr-2" />
            Tạo Class mới
          </button>
        }
        size="lg"
        bordered
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Quản lý cấu trúc Ontology
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Xây dựng và quản lý cấu trúc dữ liệu cho Knowledge Graph
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Class list and search */}
        <div className="lg:col-span-1">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
            <div className="mb-4">
              <SearchBar
                placeholder="Tìm kiếm class..."
                onSearch={setSearchTerm}
                onChange={setSearchTerm}
              />
            </div>

            <div className="flex justify-between items-center mb-2">
              <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                Classes ({filteredClasses.length})
              </h3>
              <button
                onClick={handleAddClass}
                className="p-1 flex items-center text-xs text-blue-600 hover:text-blue-800 dark:text-blue-400"
              >
                <Plus size={12} className="mr-1" />
                Thêm class
              </button>
            </div>

            <ul className="divide-y divide-gray-200 dark:divide-gray-700 max-h-96 overflow-y-auto">
              {filteredClasses.length > 0 ? (
                filteredClasses.map((cls) => (
                  <li key={cls.id} className="py-2">
                    <div className="flex justify-between items-center">
                      <button
                        onClick={() => setSelectedClass(cls)}
                        className={`flex items-center text-sm hover:text-blue-600 dark:hover:text-blue-400 ${
                          selectedClass && selectedClass.id === cls.id
                            ? "font-medium text-blue-600 dark:text-blue-400"
                            : "text-gray-700 dark:text-gray-300"
                        }`}
                      >
                        {cls.name}
                      </button>
                      <button
                        onClick={() => confirmDelete(cls.id)}
                        className="text-gray-400 hover:text-red-500 dark:hover:text-red-400 p-1"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="16"
                          height="16"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M3 6h18"></path>
                          <path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path>
                          <path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path>
                        </svg>
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 dark:text-gray-400 ml-5 mt-1 truncate">
                      {cls.description}
                    </p>
                  </li>
                ))
              ) : (
                <li className="py-6 text-center text-gray-500 dark:text-gray-400">
                  Không tìm thấy class nào phù hợp
                </li>
              )}
            </ul>
          </div>
        </div>

        {/* Ontology graph and class details */}
        <div className="lg:col-span-2 space-y-6">
          <OntologyGraph
            classes={classes}
            relations={relations}
            onSelectNode={handleSelectNode}
            selectedNodeId={selectedClass?.id}
            height={400}
            showControls={true}
          />

          <ClassDetails
            classItem={selectedClass}
            onUpdate={handleUpdateClass}
            onCancel={() => setSelectedClass(null)}
            onDelete={confirmDelete}
          />
        </div>
      </div>

      {/* Delete Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showDeleteDialog}
        title="Xác nhận xóa class"
        message={`Bạn có chắc chắn muốn xóa class này? Hành động này không thể hoàn tác và có thể ảnh hưởng đến dữ liệu liên quan.`}
        confirmLabel="Xóa"
        cancelLabel="Hủy"
        onConfirm={() => classToDelete && handleDeleteClass(classToDelete)}
        onCancel={() => {
          setShowDeleteDialog(false);
          setClassToDelete(null);
        }}
        type="delete"
      />
    </div>
  );
};

export default ManageOntologyPage;
