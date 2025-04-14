// src/pages/user/QueryKnowledge.tsx
import { ConfirmDialog, EmptyState, ResultCard } from "@vbkg/ui";
import {
    BarChart,
    Database,
    Download,
    Filter,
    Search,
    Share2
} from "lucide-react";
import { useState } from "react";

interface QueryResult {
  id: string | number;
  type: string;
  name: string;
  properties: Record<string, any>;
  relations?: Array<{
    type: string;
    target: string;
    targetType: string;
    targetId?: string;
  }>;
}

const QueryKnowledgePage = () => {
  const [query, setQuery] = useState(
    "MATCH (p:Person)-[:WORKS_AT]->(o:Organization) RETURN p, o",
  );
  const [results, setResults] = useState<QueryResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [viewType, setViewType] = useState<"cards" | "graph" | "table">(
    "cards",
  );
  const [showHistory, setShowHistory] = useState(false);
  const [queryHistory, setQueryHistory] = useState<
    Array<{
      id: string;
      query: string;
      timestamp: string;
      savedName: string | null;
    }>
  >([]);
  const [showSaveDialog, setShowSaveDialog] = useState(false);
  const [queryToSave, setQueryToSave] = useState<string | null>(null);
  const [queryName, setQueryName] = useState("");

  const handleRunQuery = async () => {};

  const handleSaveQuery = () => {};

  const handleLoadQuery = (query: string) => {
    setQuery(query);
    setShowHistory(false);
  };

  const handleExportResults = () => {
    // Generate CSV or JSON from results
    const json = JSON.stringify(results, null, 2);
    const blob = new Blob([json], { type: "application/json" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "query-results.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClearResults = () => {
    setResults([]);
  };

  return (
    <div>
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Truy vấn tri thức
        </h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">
          Tìm kiếm và khai thác thông tin trong Knowledge Graph
        </p>
      </div>

      {/* Query Interface */}
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4 mb-6">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center space-x-4">
            <button
              onClick={() => setShowHistory(!showHistory)}
              className={`p-2 rounded-md ${
                showHistory
                  ? "bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300"
                  : "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <polyline points="16 18 22 12 16 6"></polyline>
                <polyline points="8 6 2 12 8 18"></polyline>
              </svg>
            </button>
            <h3 className="text-lg font-medium">Truy vấn</h3>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleClearResults}
              className="p-2 text-sm text-gray-600 hover:text-gray-800 dark:text-gray-400 dark:hover:text-gray-200"
            >
              Clear
            </button>
            <button
              onClick={handleRunQuery}
              disabled={isLoading}
              className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <div className="animate-spin mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <Search size={16} className="mr-2" />
                  Thực hiện truy vấn
                </>
              )}
            </button>
          </div>
        </div>

        <div className="relative">
          {showHistory && (
            <div className="absolute top-0 left-0 w-full bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-t-md shadow-lg z-10 max-h-80 overflow-y-auto">
              <div className="p-3 border-b border-gray-200 dark:border-gray-700">
                <h4 className="font-medium">Lịch sử truy vấn</h4>
              </div>

              <ul className="divide-y divide-gray-200 dark:divide-gray-700">
                {queryHistory.length > 0 ? (
                  queryHistory.map((item) => (
                    <li
                      key={item.id}
                      className="p-3 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer"
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <p
                            onClick={() => handleLoadQuery(item.query)}
                            className="text-sm font-mono text-gray-700 dark:text-gray-300 mb-1"
                          >
                            {item.query.length > 50
                              ? item.query.substring(0, 50) + "..."
                              : item.query}
                          </p>
                          <div className="flex items-center text-xs text-gray-500 dark:text-gray-400">
                            <span>
                              {new Date(item.timestamp).toLocaleString()}
                            </span>
                            {item.savedName && (
                              <span className="ml-2 px-2 py-0.5 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300 rounded">
                                {item.savedName}
                              </span>
                            )}
                          </div>
                        </div>

                        {!item.savedName && (
                          <button
                            onClick={() => {
                              setQueryToSave(item.id);
                              setShowSaveDialog(true);
                            }}
                            className="text-gray-400 hover:text-blue-600 dark:hover:text-blue-400"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M19 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11l5 5v11a2 2 0 0 1-2 2z"></path>
                              <polyline points="17 21 17 13 7 13 7 21"></polyline>
                              <polyline points="7 3 7 8 15 8"></polyline>
                            </svg>
                          </button>
                        )}
                      </div>
                    </li>
                  ))
                ) : (
                  <li className="p-3 text-center text-gray-500 dark:text-gray-400">
                    Không có lịch sử truy vấn
                  </li>
                )}
              </ul>
            </div>
          )}

          <textarea
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            rows={5}
            className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-md font-mono text-sm dark:bg-gray-700"
            placeholder="Nhập câu truy vấn Cypher, ví dụ: MATCH (p:Person)-[:WORKS_AT]->(o:Organization) RETURN p, o"
          />
        </div>

        {error && <div className="mt-2 text-red-500 text-sm">{error}</div>}

        <div className="flex items-center justify-between mt-2 text-sm text-gray-500 dark:text-gray-400">
          <div>Sử dụng Cypher Query Language</div>
          <a
            href="#"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Xem hướng dẫn truy vấn
          </a>
        </div>
      </div>

      {/* Results */}
      {results.length > 0 ? (
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-lg font-medium">Kết quả ({results.length})</h3>

            <div className="flex items-center space-x-2">
              <div className="p-1 bg-gray-100 dark:bg-gray-700 rounded-md flex">
                <button
                  onClick={() => setViewType("cards")}
                  className={`p-1.5 rounded-md ${
                    viewType === "cards"
                      ? "bg-white dark:bg-gray-600 shadow"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <div className="grid grid-cols-2 gap-0.5">
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                    <div className="w-2 h-2 bg-current rounded-sm"></div>
                  </div>
                </button>

                <button
                  onClick={() => setViewType("graph")}
                  className={`p-1.5 rounded-md ${
                    viewType === "graph"
                      ? "bg-white dark:bg-gray-600 shadow"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <Share2 size={16} />
                </button>

                <button
                  onClick={() => setViewType("table")}
                  className={`p-1.5 rounded-md ${
                    viewType === "table"
                      ? "bg-white dark:bg-gray-600 shadow"
                      : "text-gray-500 dark:text-gray-400"
                  }`}
                >
                  <BarChart size={16} />
                </button>
              </div>

              <button className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md">
                <Filter size={16} />
              </button>

              <button
                onClick={handleExportResults}
                className="p-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 rounded-md"
              >
                <Download size={16} />
              </button>
            </div>
          </div>

          {viewType === "cards" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {results.map((result) => (
                <ResultCard
                  key={result.id}
                  id={result.id}
                  type={result.type}
                  name={result.name}
                  properties={result.properties}
                  relations={result.relations}
                  onViewDetails={(id) => console.log(`View details for ${id}`)}
                  onRelationClick={(relation) =>
                    console.log(
                      `Clicked relation: ${relation.type} -> ${relation.target}`,
                    )
                  }
                />
              ))}
            </div>
          )}

          {viewType === "graph" && (
            <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-6 h-96 flex items-center justify-center">
              <div className="text-center">
                <p className="text-gray-500 dark:text-gray-400 mb-2">
                  Đồ thị Knowledge Graph
                </p>
                <p className="text-sm text-gray-400 dark:text-gray-500">
                  Trong triển khai thực tế sẽ sử dụng thư viện đồ thị như D3.js,
                  Cytoscape hoặc React Flow
                </p>
              </div>
            </div>
          )}

          {viewType === "table" && (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-700">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      ID
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Name
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Properties
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Relations
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {results.map((result) => (
                    <tr key={result.id}>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900 dark:text-gray-100">
                          {result.id}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300">
                          {result.type}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900 dark:text-white">
                          {result.name}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-h-32 overflow-y-auto">
                          {Object.entries(result.properties).map(
                            ([key, value]) => (
                              <div key={key} className="mb-1">
                                <span className="font-medium">{key}:</span>{" "}
                                {value.toString()}
                              </div>
                            ),
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-sm text-gray-900 dark:text-white max-h-32 overflow-y-auto">
                          {result.relations?.map((relation, index) => (
                            <div key={index} className="mb-1">
                              <span className="text-xs px-1 rounded bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300">
                                {relation.type}
                              </span>
                              <span className="mx-1">→</span>
                              <span className="font-medium">
                                {relation.target}
                              </span>
                            </div>
                          )) || "No relations"}
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      ) : (
        <EmptyState
          title="Chưa có kết quả truy vấn"
          description="Nhập câu truy vấn và nhấn 'Thực hiện truy vấn' để xem kết quả."
          icon={<Database size={48} className="text-gray-400" />}
          bordered
        />
      )}

      {/* Save Query Dialog */}
      <ConfirmDialog
        isOpen={showSaveDialog}
        title="Lưu truy vấn"
        message={
          <div>
            <p className="mb-4">Nhập tên để lưu truy vấn này:</p>
            <input
              type="text"
              value={queryName}
              onChange={(e) => setQueryName(e.target.value)}
              className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded dark:bg-gray-700"
              placeholder="Nhập tên truy vấn"
            />
          </div>
        }
        confirmLabel="Lưu"
        cancelLabel="Hủy"
        onConfirm={handleSaveQuery}
        onCancel={() => {
          setShowSaveDialog(false);
          setQueryToSave(null);
          setQueryName("");
        }}
        type="info"
      />
    </div>
  );
};

export default QueryKnowledgePage;
