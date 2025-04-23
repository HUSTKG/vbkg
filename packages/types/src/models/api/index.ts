export interface ApiKey {
  id: string;
  name: string;
  key: string;
  createdAt: Date;
  expiresAt?: Date;
  lastUsed?: Date;
  permissions: string[];
}

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
