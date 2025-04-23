import { useMutation, UseMutationOptions } from "@tanstack/react-query";
import {
  IUpdateUserMeRequest,
  IUpdateUserMeResponse,
  IUpdateUserRequest,
  IUpdateUserResponse,
  IDeleteUserRequest,
  IDeleteUserResponse,
} from "@vbkg/types";
import { UserService } from "../../services/user";

// Update current user
export const useUpdateUserMe = (
  options: UseMutationOptions<IUpdateUserMeResponse, Error, IUpdateUserMeRequest>,
) => {
  return useMutation<IUpdateUserMeResponse, Error, IUpdateUserMeRequest>({
    mutationFn: UserService.updateUserMe,
    ...options,
  });
};

// Update specific user
export const useUpdateUser = (
  options: UseMutationOptions<IUpdateUserResponse, Error, IUpdateUserRequest>,
) => {
  return useMutation<IUpdateUserResponse, Error, IUpdateUserRequest>({
    mutationFn: UserService.updateUser,
    ...options,
  });
};

// Delete user
export const useDeleteUser = (
  options: UseMutationOptions<IDeleteUserResponse, Error, IDeleteUserRequest>,
) => {
  return useMutation<IDeleteUserResponse, Error, IDeleteUserRequest>({
    mutationFn: UserService.deleteUser,
    ...options,
  });
};
