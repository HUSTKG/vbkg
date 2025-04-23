import {
  IDeleteUserRequest,
  IDeleteUserResponse,
  IReadPermissionsRequest,
  IReadPermissionsResponse,
  IReadRolesRequest,
  IReadRolesResponse,
  IReadUserMeRequest,
  IReadUserMeResponse,
  IReadUserRequest,
  IReadUserResponse,
  IReadUsersRequest,
  IReadUsersResponse,
  IUpdateUserMeRequest,
  IUpdateUserMeResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
} from "@vbkg/types";
import { api } from "../config/axios";
import { API_ENDPOINTS } from "@vbkg/utils";

const readUsers = async (
  input: IReadUsersRequest,
): Promise<IReadUsersResponse> => {
  return await api()
    .get<IReadUsersResponse>(API_ENDPOINTS.READ_USERS, {
      params: input,
    })
    .then((res) => res.data);
};

const readUserMe = async (
  input: IReadUserMeRequest,
): Promise<IReadUserMeResponse> => {
  return await api()
    .get<IReadUserResponse>(API_ENDPOINTS.READ_USER_ME, {
      params: input,
    })
    .then((res) => res.data);
};

const updateUserMe = async (
  input: IUpdateUserMeRequest,
): Promise<IUpdateUserMeResponse> => {
  return await api()
    .put<IUpdateUserResponse>(API_ENDPOINTS.UPDATE_USER_ME, input)
    .then((res) => res.data);
};

const readUser = async (
  input: IReadUserRequest,
): Promise<IReadUserResponse> => {
  return await api()
    .get<IReadUserResponse>(API_ENDPOINTS.READ_USER(input.id), {
      params: input,
    })
    .then((res) => res.data);
};

const updateUser = async (
  input: IUpdateUserRequest,
): Promise<IUpdateUserResponse> => {
  return await api()
    .put<IUpdateUserResponse>(API_ENDPOINTS.UPDATE_USER(input.id), input)
    .then((res) => res.data);
};

const deleteUser = async (
  input: IDeleteUserRequest,
): Promise<IDeleteUserResponse> => {
  return await api()
    .delete<IDeleteUserResponse>(API_ENDPOINTS.DELETE_USER(input.id))
    .then((res) => res.data);
};

const readRoles = async (
  input: IReadRolesRequest,
): Promise<IReadRolesResponse> => {
  return await api()
    .get<IReadRolesResponse>(API_ENDPOINTS.READ_ROLES, {
      params: input,
    })
    .then((res) => res.data);
};

const readPermissions = async (
  input: IReadPermissionsRequest
): Promise<IReadPermissionsResponse> => {
  return await api()
	.get<IReadPermissionsResponse>(API_ENDPOINTS.READ_PERMISSIONS, {
	  params: input,
	})
	.then((res) => res.data);
}

export const UserService = {
  readUsers,
  readUserMe,
  updateUserMe,
  readUser,
  updateUser,
  deleteUser,
  readRoles,
  readPermissions
};
