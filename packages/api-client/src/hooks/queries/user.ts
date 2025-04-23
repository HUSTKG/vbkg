import { useQuery, UseQueryOptions } from "@tanstack/react-query";
import {
  IReadUsersRequest,
  IReadUsersResponse,
  IReadUserMeRequest,
  IReadUserMeResponse,
  IReadUserRequest,
  IReadUserResponse,
  IReadRolesRequest,
  IReadRolesResponse,
  IReadPermissionsRequest,
  IReadPermissionsResponse,
} from "@vbkg/types";
import { UserService } from "../../services/user";

// Fetch all users
export const useUsers = (
  input: IReadUsersRequest,
  options?: UseQueryOptions<IReadUsersResponse, Error>,
) => {
  return useQuery<IReadUsersResponse, Error>({
    queryKey: ["users", input],
    queryFn: () => UserService.readUsers(input),
    ...options,
  });
};

// Fetch current user
export const useUserMe = (
  input: IReadUserMeRequest,
  options?: UseQueryOptions<IReadUserMeResponse, Error>,
) => {
  return useQuery<IReadUserMeResponse, Error>({
    queryKey: ["userMe", input],
    queryFn: () => UserService.readUserMe(input),
    ...options,
  });
};

// Fetch specific user
export const useUser = (
  input: IReadUserRequest,
  options?: UseQueryOptions<IReadUserResponse, Error>,
) => {
  return useQuery<IReadUserResponse, Error>({
    queryKey: ["user", input.id],
    queryFn: () => UserService.readUser(input),
    ...options,
  });
};

// Fetch roles
export const useRoles = (
  input: IReadRolesRequest,
  options?: UseQueryOptions<IReadRolesResponse, Error>,
) => {
  return useQuery<IReadRolesResponse, Error>({
    queryKey: ["roles", input],
    queryFn: () => UserService.readRoles(input),
    ...options,
  });
};

// Fetch permissions
export const usePermissions = (
  input: IReadPermissionsRequest,
  options?: UseQueryOptions<IReadPermissionsResponse, Error>,
) => {
  return useQuery<IReadPermissionsResponse, Error>({
    queryKey: ["permissions", input],
    queryFn: () => UserService.readPermissions(input),
    ...options,
  });
};
