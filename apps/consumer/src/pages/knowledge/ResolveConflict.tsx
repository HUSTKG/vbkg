// src/pages/knowledge/ResolveConflict.tsx
import { ConfirmDialog, EmptyState, EntityCard } from "@vbkg/ui";
import { AlertTriangle, ArrowLeft, ArrowRight, Check, X } from "lucide-react";
import { useState } from "react";

interface Conflict {
  id: string;
  status: "pending" | "resolved" | "rejected";
  entityA: Entity;
  entityB: Entity;
}

interface Entity {
  id: string;
  name: string;
  type: string;
  source: string;
  properties: Array<{ key: string; value: string | number | boolean }>;
}

const ResolveConflictPage = () => {
  const [conflicts, setConflicts] = useState<Conflict[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedProperties, setSelectedProperties] = useState<{
    [entityId: string]: string[];
  }>({});
  const [filter, setFilter] = useState<"all" | "pending" | "resolved">("all");
  const [showMergeDialog, setShowMergeDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);

  const filteredConflicts = conflicts.filter((conflict) => {
    if (filter === "all") return true;
    return conflict.status === filter;
  });

  const currentConflict = filteredConflicts[currentIndex];

  const handlePropertySelect = (property: any, entityId: string) => {
    setSelectedProperties((prev) => {
      // Check if property is already selected
      const isSelected = prev[entityId]?.includes(property.key);

      if (isSelected) {
        // If selected, remove it
        return {
          ...prev,
          [entityId]: prev[entityId].filter((key) => key !== property.key),
        };
      } else {
        // If not selected, add it
        return {
          ...prev,
          [entityId]: [...(prev[entityId] || []), property.key],
        };
      }
    });
  };

  const handleNavigate = (direction: "prev" | "next") => {
    if (direction === "prev" && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    } else if (
      direction === "next" &&
      currentIndex < filteredConflicts.length - 1
    ) {
      setCurrentIndex(currentIndex + 1);
    }

    // Reset selected properties when navigating
    if (currentConflict) {
      setSelectedProperties({
        [currentConflict.entityA.id]: [],
        [currentConflict.entityB.id]: [],
      });
    }
  };

  const handleResolveConflict = async () => {};

  const handleRejectConflict = async () => {};

  if (false) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (filteredConflicts.length === 0) {
    return (
      <EmptyState
        title="Không có xung đột"
        description={
          filter === "all"
            ? "Không có xung đột nào cần giải quyết."
            : `Không có xung đột nào với trạng thái "${filter}".`
        }
        icon={<AlertTriangle size={48} className="text-gray-400" />}
        size="lg"
        bordered
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Giải quyết xung đột dữ liệu
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Xử lý các xung đột giữa các entity từ các nguồn dữ liệu khác nhau
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5 mb-6">
        <div className="flex items-center justify-between pb-4 border-b dark:border-gray-700">
          <div>
            <h2 className="text-lg font-medium">Danh sách xung đột</h2>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              {filteredConflicts.length} xung đột{" "}
              {filter !== "all" ? `(${filter})` : ""}
            </p>
          </div>

          <div className="flex space-x-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                filter === "all"
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Tất cả
            </button>
            <button
              onClick={() => setFilter("pending")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                filter === "pending"
                  ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Chưa giải quyết
            </button>
            <button
              onClick={() => setFilter("resolved")}
              className={`px-3 py-1.5 text-sm rounded-md ${
                filter === "resolved"
                  ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              Đã giải quyết
            </button>
          </div>
        </div>

        {currentConflict && (
          <>
            <div className="mt-4 flex justify-between items-center mb-6">
              <button
                onClick={() => handleNavigate("prev")}
                disabled={currentIndex === 0}
                className="flex items-center px-3 py-1.5 border rounded-md disabled:opacity-50"
              >
                <ArrowLeft size={16} className="mr-1" />
                Xung đột trước
              </button>

              <div className="text-sm text-gray-500 dark:text-gray-400">
                {currentIndex + 1} / {filteredConflicts.length}
              </div>

              <button
                onClick={() => handleNavigate("next")}
                disabled={currentIndex === filteredConflicts.length - 1}
                className="flex items-center px-3 py-1.5 border rounded-md disabled:opacity-50"
              >
                Xung đột sau
                <ArrowRight size={16} className="ml-1" />
              </button>
            </div>

            <>
              <div className="mb-4">
                <div className="flex items-center space-x-2 mb-2">
                  {currentConflict.status === "pending" ? (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      Chưa giải quyết
                    </span>
                  ) : (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                      <Check size={12} className="mr-1" />
                      Đã giải quyết
                    </span>
                  )}

                  <h3 className="text-lg font-medium">
                    ID: #{currentConflict.id} - Xung đột giữa "
                    {currentConflict.entityA.name}" và "
                    {currentConflict.entityB.name}"
                  </h3>
                </div>

                <div className="bg-blue-50 dark:bg-blue-900/30 p-3 rounded-md text-sm flex items-start mb-4">
                  <AlertTriangle
                    size={16}
                    className="text-blue-500 dark:text-blue-400 mr-2 mt-0.5"
                  />
                  <p>
                    Chọn các property từ hai entity để so sánh. Để merge các
                    entity, chọn property nào giữ lại cho entity cuối cùng.
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <EntityCard
                  id={currentConflict.entityA.id}
                  name={currentConflict.entityA.name}
                  type={currentConflict.entityA.type}
                  source={currentConflict.entityA.source}
                  properties={currentConflict.entityA.properties}
                  selectedProperties={
                    selectedProperties[currentConflict.entityA.id] || []
                  }
                  isSelectable={currentConflict.status === "pending"}
                  onPropertyClick={(property) =>
                    handlePropertySelect(property, currentConflict.entityA.id)
                  }
                />

                <EntityCard
                  id={currentConflict.entityB.id}
                  name={currentConflict.entityB.name}
                  type={currentConflict.entityB.type}
                  source={currentConflict.entityB.source}
                  properties={currentConflict.entityB.properties}
                  selectedProperties={
                    selectedProperties[currentConflict.entityB.id] || []
                  }
                  isSelectable={currentConflict.status === "pending"}
                  onPropertyClick={(property) =>
                    handlePropertySelect(property, currentConflict.entityB.id)
                  }
                />
              </div>

              {currentConflict.status === "pending" && (
                <div className="mt-6 flex space-x-4 justify-end">
                  <button
                    onClick={() => setShowRejectDialog(true)}
                    className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100 dark:border-gray-600 dark:hover:bg-gray-700 flex items-center"
                  >
                    <X size={16} className="mr-2" />
                    Bỏ qua
                  </button>

                  <button
                    onClick={() => setShowMergeDialog(true)}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
                  >
                    <Check size={16} className="mr-2" />
                    Merge và giải quyết
                  </button>
                </div>
              )}
            </>
          </>
        )}
      </div>

      {/* Merge Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showMergeDialog}
        title="Xác nhận merge dữ liệu"
        message="Bạn có chắc chắn muốn merge các dữ liệu đã chọn? Hành động này sẽ tạo ra một entity mới từ các thuộc tính đã chọn."
        confirmLabel="Merge"
        cancelLabel="Hủy"
        onConfirm={handleResolveConflict}
        onCancel={() => setShowMergeDialog(false)}
        type="confirm"
      />

      {/* Reject Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showRejectDialog}
        title="Xác nhận bỏ qua xung đột"
        message="Bạn có chắc chắn muốn bỏ qua xung đột này? Dữ liệu sẽ không được merge."
        confirmLabel="Bỏ qua"
        cancelLabel="Hủy"
        onConfirm={handleRejectConflict}
        onCancel={() => setShowRejectDialog(false)}
        type="warning"
      />
    </div>
  );
};

export default ResolveConflictPage;
