import { ApiResponse, PaginatedResponse, User, UserUpdate } from "../models";

export interface IReadUsersRequest {
  skip?: number;
  limit?: number;
}
export interface IReadUsersResponse extends PaginatedResponse<User> {}

export interface IReadUserMeRequest {}
export interface IReadUserMeResponse extends ApiResponse<User> {}

export interface IUpdateUserMeRequest extends UserUpdate {}
export interface IUpdateUserMeResponse extends ApiResponse<User> {}

export interface IReadUserRequest {
  id: string;
}
export interface IReadUserResponse extends ApiResponse<User> {}

export interface IUpdateUserRequest extends UserUpdate {
  id: string;
}
export interface IUpdateUserResponse extends ApiResponse<User> {}

export interface IDeleteUserRequest {
  id: string;
}
export interface IDeleteUserResponse extends ApiResponse<unknown> {}

export interface IReadRolesRequest {}
export interface IReadRolesResponse extends ApiResponse<unknown[]> {}

export interface IReadPermissionsRequest {}
export interface IReadPermissionsResponse extends ApiResponse<unknown[]> {}
