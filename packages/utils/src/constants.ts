// API Helpers
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  LOGIN_JSON: "/auth/login/json",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",

  // Data Sources
  CREATE_DATASOURCE: "/datasources",
  READ_DATASOURCES: "/datasources",
  READ_DATASOURCE: (id: string) => `/datasources/${id}`,
  UPDATE_DATASOURCE: (id: string) => `/datasources/${id}`,
  DELETE_DATASOURCE: (id: string) => `/datasources/${id}`,
  UPLOAD_FILE: (id: string) => `/datasources/${id}/upload`,
  READ_FILE_UPLOADS: "/datasources/files",
  READ_FILE_UPLOAD: (id: string) => `/datasources/files/${id}`,
  UPDATE_FILE_STATUS: (file_id: string) => `/datasources/files/${file_id}/status`,
  DELETE_FILE_UPLOAD: (file_id: string) => `/datasources/files/${file_id}`,
  READ_FILE_CONTENT: (file_id: string) =>
    `/datasources/files/${file_id}/content`,

  // Fibo
  READ_FIBO_CLASSES: "/fibo/classes",
  READ_FIBO_CLASS: (id: string) => `/fibo/classes/${id}`,
  CREATE_FIBO_CLASS: "/fibo/classes",
  UPDATE_FIBO_CLASS: (id: string) => `/fibo/classes/${id}`,
  DELETE_FIBO_CLASS: (id: string) => `/fibo/classes/${id}`,
  READ_FIBO_PROPERTIES: "/fibo/properties",
  READ_FIBO_PROPERTY: (id: string) => `/fibo/properties/${id}`,
  CREATE_FIBO_PROPERTY: "/fibo/properties",
  UPDATE_FIBO_PROPERTY: (id: string) => `/fibo/properties/${id}`,
  DELETE_FIBO_PROPERTY: (id: string) => `/fibo/properties/${id}`,
  IMPORT_ONTOLOGY: "/fibo/import",
  READ_ENTITY_MAPPINGS: "/fibo/entity-mappings",
  CREATE_ENTITY_MAPPING: "/fibo/entity-mappings",
  DELETE_ENTITY_MAPPING: (id: string) => `/fibo/entity-mappings/${id}`,
  VERIFY_ENTITY_MAPPING: (id: string) => `/fibo/entity-mappings/${id}/verify`,
  READ_RELATIONSHIP_MAPPINGS: "/fibo/relationship-mappings",
  CREATE_RELATIONSHIP_MAPPING: "/fibo/relationship-mappings",
  DELETE_RELATIONSHIP_MAPPING: (id: string) =>
    `/fibo/relationship-mappings/${id}`,
  VERIFY_RELATIONSHIP_MAPPING: (id: string) =>
    `/fibo/relationship-mappings/${id}/verify`,
  SUGGEST_FIBO_CLASSES: "/fibo/suggest/classes",
  SUGGEST_FIBO_PROPERTIES: "/fibo/suggest/properties",

  // Knowledge
  CREATE_ENTITY: "/knowledge/entities",
  READ_ENTITY: (id: string) => `/knowledge/entities/${id}`,
  READ_ENTITY_RELATIONSHIPS: (id: string) =>
    `/knowledge/entities/${id}/relationships`,
  UPDATE_ENTITY: (id: string) => `/knowledge/entities/${id}`,
  DELETE_ENTITY: (id: string) => `/knowledge/entities/${id}`,
  SEARCH_KG_ENTITIES: "/knowledge/entities/search",
  CREATE_RELATIONSHIP: "/knowledge/relationships",
  EXCUTE_QUERY: "/knowledge/query",
  GET_KNOWLEDGE_GRAPH_STATS: "/knowledge/graph/stats",
  CREATE_OR_MERGE_ENTITY: "/knowledge/entities/merge",

  // Notifications
  READ_NOTIFICATIONS: "/notifications",
  READ_NOTIFICATION: (id: string) => `/notifications/${id}`,
  CREATE_NOTIFICATION: "/notifications",
  MARK_NOTIFICATION_READ: (id: string) => `/notifications/${id}/read`,
  UPDATE_NOTIFICATION: (id: string) => `/notifications/${id}`,
  DELETE_NOTIFICATION: (id: string) => `/notifications/${id}`,

  // Pipelines
  READ_PIPELINES: "/pipelines",
  CREATE_PIPELINE: "/pipelines",
  READ_PIPELINE: (id: string) => `/pipelines/${id}`,
  UPDATE_PIPELINE: (id: string) => `/pipelines/${id}`,
  DELETE_PIPELINE: (id: string) => `/pipelines/${id}`,
  RUN_PIPELINE: (id: string) => `/pipelines/${id}/run`,
  READ_PIPELINE_RUNS: "/pipelines/runs",
  READ_PIPELINE_RUN: (run_id: string) => `/pipelines/runs/${run_id}`,
  GET_PIPELINE_RUN_STATUS: (run_id: string) =>
    `/pipelines/runs/${run_id}/status`,
  CANCEL_PIPELINE_RUN: (run_id: string) => `/pipelines/runs/${run_id}/cancel`,

  // Search
  SEARCH_ENTITIES: "/search/entities",
  FIND_SIMILAR_ENTITIES: "/search/similar",
  GRAPH_SEARCH: "/search/graph",
  GENERATE_EMBEDDINGS: "/search/embeddings",
  CREATE_ENTITY_EMBEDDING: (entity_id: string) =>
    `/search/entities/${entity_id}/embedding`,
  UPDATE_ENTITY_EMBEDDINGS_BATCH: "/search/entities/embeddings/batch",

  // Users
  READ_USERS: "/users",
  READ_USER_ME: "/users/me",
  UPDATE_USER_ME: "/users/me",
  READ_USER: (id: string) => `/users/${id}`,
  UPDATE_USER: (id: string) => `/users/${id}`,
  DELETE_USER: (id: string) => `/users/${id}`,
  READ_ROLES: "/users/roles",
  READ_PERMISSIONS: "/users/permissions",

  // Visualizations
  CREATE_VISUALIZATION: "/visualizations",
  READ_VISUALIZATIONS: "/visualizations",
  READ_PUBLIC_VISUALIZATIONS: "/visualizations/public",
  READ_VISUALIZATION: (id: string) => `/visualizations/${id}`,
  UPDATE_VISUALIZATION: (id: string) => `/visualizations/${id}`,
  DELETE_VISUALIZATION: (id: string) => `/visualizations/${id}`,
  GET_VISUALIZATION_DATA: (id: string) => `/visualizations/${id}/data`,
  CREATE_DEFAULT_VISUALIZATION: "/visualizations/default",
  GET_VISUALIZATION_TEMPLATES: "/visualizations/template",
} as const;

// Common Constants
export const DEFAULT_PAGE_SIZE = 10;

export const SORT_DIRECTIONS = {
  ASC: "asc",
  DESC: "desc",
} as const;

// Error Messages
export const ERROR_MESSAGES = {
  NETWORK_ERROR: "Network error occurred. Please check your connection.",
  UNAUTHORIZED: "Unauthorized access. Please login again.",
  FORBIDDEN: "You do not have permission to perform this action.",
  NOT_FOUND: "The requested resource was not found.",
  VALIDATION_ERROR: "Please check your input and try again.",
  SERVER_ERROR: "An unexpected error occurred. Please try again later.",
  CONFLICT_ERROR: "A conflict occurred with the existing data.",
} as const;

// Validation Constants
export const VALIDATION = {
  PASSWORD_MIN_LENGTH: 8,
  USERNAME_MIN_LENGTH: 3,
  USERNAME_MAX_LENGTH: 50,
  EMAIL_MAX_LENGTH: 255,
  BIO_MAX_LENGTH: 500,
  API_KEY_LENGTH: 32,
} as const;

// Graph Constants
export const GRAPH_CONFIG = {
  DEFAULT_NODE_SIZE: 30,
  DEFAULT_EDGE_WIDTH: 2,
  DEFAULT_FONT_SIZE: 12,
  LAYOUTS: {
    FORCE: "force",
    HIERARCHICAL: "hierarchical",
    CIRCULAR: "circular",
  },
  THEMES: {
    LIGHT: {
      background: "#ffffff",
      node: "#1a73e8",
      edge: "#90a4ae",
      text: "#263238",
    },
    DARK: {
      background: "#1a1a1a",
      node: "#4dabf7",
      edge: "#546e7a",
      text: "#eceff1",
    },
  },
} as const;

// Date Formats
export const DATE_FORMATS = {
  DISPLAY: "PPpp", // e.g., "Apr 13, 2024, 12:00 PM"
  ISO: "yyyy-MM-dd'T'HH:mm:ss.SSSxxx",
  SHORT: "PP", // e.g., "Apr 13, 2024"
  TIME: "p", // e.g., "12:00 PM"
} as const;
