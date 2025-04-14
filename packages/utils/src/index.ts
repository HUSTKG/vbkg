// packages/utils/src/index.ts
export * from "./api/request";
export * from "./validation/schema";
export * from "./formatting/date";
export * from "./helpers/graph";

// API Helpers
export const API_ENDPOINTS = {
  // Auth
  LOGIN: "/auth/login",
  REGISTER: "/auth/register",
  LOGOUT: "/auth/logout",
  REFRESH_TOKEN: "/auth/refresh",

  // User
  USER_PROFILE: "/user/profile",
  USER_SETTINGS: "/user/settings",
  API_KEYS: "/user/api-keys",

  // Knowledge
  KNOWLEDGE_GRAPH: "/knowledge/graph",
  CONFLICTS: "/knowledge/conflicts",
  REVIEWS: "/knowledge/reviews",
  ONTOLOGY: "/knowledge/ontology",

  // Admin
  SYSTEM_METRICS: "/admin/metrics",
  USERS: "/admin/users",
  DATA_SOURCES: "/admin/data-sources",
  PIPELINES: "/admin/pipelines",
} as const;

// Common Types
export type ApiResponse<T> = {
  data: T;
  status: number;
  message: string;
};

export type PaginatedResponse<T> = {
  data: T[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
};

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

// Common Functions
export function isValidJson(str: string): boolean {
  try {
    JSON.parse(str);
    return true;
  } catch (e) {
    return false;
  }
}

export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number,
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout;
  return function (...args: Parameters<T>) {
    clearTimeout(timeout);
    timeout = setTimeout(() => func(...args), wait);
  };
}

export function generateUUID(): string {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0;
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

// Type Guards
export function isApiError(
  error: unknown,
): error is Error & { response?: { status: number } } {
  return error instanceof Error && "response" in error;
}

export function isPaginatedResponse<T>(
  response: unknown,
): response is PaginatedResponse<T> {
  return (
    typeof response === "object" &&
    response !== null &&
    "data" in response &&
    "meta" in response &&
    Array.isArray((response as PaginatedResponse<T>).data)
  );
}
