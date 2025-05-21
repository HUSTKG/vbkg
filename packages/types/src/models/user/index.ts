export type UserBase = {
  email: string;
  full_name?: string;
  department?: string;
  position?: string;
  bio?: string;
};

export type UserCreate = UserBase & {
  password: string;
  roles?: string[];
};

export type UserUpdate = Partial<UserBase> & {
  avatar_url?: string;
  roles?: string[];
};

export type UserLogin = {
  email: string;
  password: string;
};

export type User = UserBase & {
  id: string;
  is_active?: boolean;
  roles?: string[];
  avatar_url?: string;
};

export type Token = {
  access_token: string;
  refresh_token: string;
};

export type TokenPayload = {
  sub?: string;
  exp?: number;
};
