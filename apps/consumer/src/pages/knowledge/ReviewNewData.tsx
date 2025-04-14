// src/pages/knowledge/ReviewNewData.tsx
import { ConfirmDialog, EmptyState, EntityCard, SearchBar } from "@vbkg/ui";
import { AlertTriangle, Check, Database, Filter, X } from "lucide-react";
import { useState } from "react";

interface NewDataEntity {
  id: string;
  name: string;
  type: string;
  source: string;
  properties: Array<{ key: string; value: string | number | boolean }>;
  status: "pending" | "approved" | "rejected";
  importedAt: string;
}

const ReviewNewDataPage = () => {
  const [entities, setEntities] = useState<NewDataEntity[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [filter, setFilter] = useState<
    "all" | "pending" | "approved" | "rejected"
  >("pending");
  const [searchTerm, setSearchTerm] = useState("");
  const [showApproveDialog, setShowApproveDialog] = useState(false);
  const [showRejectDialog, setShowRejectDialog] = useState(false);
  const [selectedEntityId, setSelectedEntityId] = useState<string | null>(null);
  const [entityTypeFilter, setEntityTypeFilter] = useState<string | null>(null);
  const [entityTypes, setEntityTypes] = useState<string[]>([]);

  const handleApproveEntity = async () => {};

  const handleRejectEntity = async () => {};

  // Apply filters
  const filteredEntities = entities.filter((entity) => {
    // Filter by status
    if (filter !== "all" && entity.status !== filter) return false;

    // Filter by entity type
    if (entityTypeFilter && entity.type !== entityTypeFilter) return false;

    // Search term filter
    if (searchTerm) {
      const term = searchTerm.toLowerCase();
      return (
        entity.name.toLowerCase().includes(term) ||
        entity.properties.some(
          (prop) =>
            prop.key.toLowerCase().includes(term) ||
            String(prop.value).toLowerCase().includes(term),
        )
      );
    }

    return true;
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (entities.length === 0) {
    return (
      <EmptyState
        title="Không có dữ liệu mới"
        description="Không có dữ liệu mới nào để xem xét."
        icon={<Database size={48} className="text-gray-400" />}
        bordered
        size="lg"
      />
    );
  }

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Xem xét dữ liệu mới
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Xem xét và phê duyệt dữ liệu mới trước khi thêm vào Knowledge Graph
        </p>
      </div>

      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-5">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-5 border-b border-gray-200 dark:border-gray-700">
          <div className="w-full md:w-1/3">
            <SearchBar
              placeholder="Tìm kiếm dữ liệu..."
              onSearch={setSearchTerm}
              onChange={setSearchTerm}
            />
          </div>

          <div className="flex flex-wrap gap-2">
            <div className="flex rounded-md overflow-hidden">
              <button
                onClick={() => setFilter("all")}
                className={`px-3 py-1.5 text-sm ${
                  filter === "all"
                    ? "bg-blue-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Tất cả
              </button>
              <button
                onClick={() => setFilter("pending")}
                className={`px-3 py-1.5 text-sm ${
                  filter === "pending"
                    ? "bg-yellow-500 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Chờ duyệt
              </button>
              <button
                onClick={() => setFilter("approved")}
                className={`px-3 py-1.5 text-sm ${
                  filter === "approved"
                    ? "bg-green-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Đã duyệt
              </button>
              <button
                onClick={() => setFilter("rejected")}
                className={`px-3 py-1.5 text-sm ${
                  filter === "rejected"
                    ? "bg-red-600 text-white"
                    : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
                }`}
              >
                Đã từ chối
              </button>
            </div>

            <div className="relative">
              <button
                onClick={() => setEntityTypeFilter(null)}
                className="px-3 py-1.5 text-sm bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-md flex items-center"
              >
                <Filter size={14} className="mr-1" />
                {entityTypeFilter || "Tất cả loại"}
              </button>
              {entityTypes.length > 0 && (
                <div className="absolute z-10 mt-1 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg border border-gray-200 dark:border-gray-700 max-h-60 overflow-y-auto">
                  <div className="py-1">
                    <button
                      onClick={() => setEntityTypeFilter(null)}
                      className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                    >
                      Tất cả loại
                    </button>
                    {entityTypes.map((type) => (
                      <button
                        key={type}
                        onClick={() => setEntityTypeFilter(type)}
                        className="w-full px-4 py-2 text-sm text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 text-left"
                      >
                        {type}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {filteredEntities.length > 0 ? (
          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredEntities.map((entity) => (
              <div key={entity.id} className="relative">
                <EntityCard
                  id={entity.id}
                  name={entity.name}
                  type={entity.type}
                  source={entity.source}
                  properties={entity.properties}
                />

                {entity.status === "pending" && (
                  <div className="absolute top-2 right-2 flex space-x-1">
                    <button
                      onClick={() => {
                        setSelectedEntityId(entity.id);
                        setShowApproveDialog(true);
                      }}
                      className="p-1.5 bg-green-100 text-green-600 rounded-md hover:bg-green-200 dark:bg-green-900/30 dark:text-green-400 dark:hover:bg-green-900/50"
                      title="Phê duyệt"
                    >
                      <Check size={16} />
                    </button>
                    <button
                      onClick={() => {
                        setSelectedEntityId(entity.id);
                        setShowRejectDialog(true);
                      }}
                      className="p-1.5 bg-red-100 text-red-600 rounded-md hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400 dark:hover:bg-red-900/50"
                      title="Từ chối"
                    >
                      <X size={16} />
                    </button>
                  </div>
                )}

                <div className="absolute top-2 left-2">
                  {entity.status === "approved" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 flex items-center">
                      <Check size={12} className="mr-1" />
                      Đã duyệt
                    </span>
                  )}
                  {entity.status === "rejected" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300 flex items-center">
                      <X size={12} className="mr-1" />
                      Đã từ chối
                    </span>
                  )}
                  {entity.status === "pending" && (
                    <span className="px-2 py-1 text-xs rounded-full bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300 flex items-center">
                      <AlertTriangle size={12} className="mr-1" />
                      Chờ duyệt
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="py-8 text-center text-gray-500 dark:text-gray-400">
            Không tìm thấy dữ liệu nào phù hợp với bộ lọc hiện tại
          </div>
        )}
      </div>

      {/* Approve Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showApproveDialog}
        title="Xác nhận phê duyệt"
        message="Bạn có chắc chắn muốn phê duyệt entity này? Entity sẽ được thêm vào Knowledge Graph."
        confirmLabel="Phê duyệt"
        cancelLabel="Hủy"
        onConfirm={handleApproveEntity}
        onCancel={() => {
          setShowApproveDialog(false);
          setSelectedEntityId(null);
        }}
        type="confirm"
      />

      {/* Reject Confirmation Dialog */}
      <ConfirmDialog
        isOpen={showRejectDialog}
        title="Xác nhận từ chối"
        message="Bạn có chắc chắn muốn từ chối entity này? Entity sẽ không được thêm vào Knowledge Graph."
        confirmLabel="Từ chối"
        cancelLabel="Hủy"
        onConfirm={handleRejectEntity}
        onCancel={() => {
          setShowRejectDialog(false);
          setSelectedEntityId(null);
        }}
        type="warning"
      />
    </div>
  );
};

export default ReviewNewDataPage;
