export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: "admin" | "user";
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
}

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  name: string;
  confirmPassword: string;
}

export interface AuthResponse {
  user: AuthUser;
  token: string;
  refreshToken: string;
}
