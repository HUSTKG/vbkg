import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../config/axios";
import { User, UserUpdate } from "../schemas/user.schemas";


// Update current user's profile
export const useUpdateCurrentUser = (
  options: UseMutationOptions<User, Error, UserUpdate>
) => {
  return useMutation({
    mutationFn: async (input: UserUpdate) =>
      await api().patch("/users/me", input).then(res => res.data),
    ...options,
  });
};


// Update a specific user (admin only)
export const useUpdateUser = (
  options: UseMutationOptions<User, Error, { userId: string; data: UserUpdate }>
) => {
  return useMutation({
    mutationFn: async ({ userId, data }) =>
      await api().patch(`/users/${userId}`, data).then(res => res.data),
    ...options,
  });
};

// Delete a user (admin only)
export const useDeleteUser = (
  options: UseMutationOptions<void, Error, string>
) => {
  return useMutation({
    mutationFn: async (userId: string) =>
      await api().delete(`/users/${userId}`).then(res => res.data),
    ...options,
  });
};
