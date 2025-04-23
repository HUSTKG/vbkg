import { useMutation, useQuery, UseMutationOptions, UseQueryOptions } from "@tanstack/react-query";
import { api } from "../config/axios";
import { Notification, NotificationCreate } from "../schemas/notification.schemas";


// Create a notification
export const useCreateNotification = (
  options: UseMutationOptions<Notification, Error, NotificationCreate>
) => {
  return useMutation({
    mutationFn: async (input: NotificationCreate) =>
      await api().post("/notifications", input).then(res => res.data),
    ...options,
  });
};

// Mark notification as read
export const useMarkNotificationAsRead = (
  options: UseMutationOptions<Notification, Error, string>
) => {
  return useMutation({
    mutationFn: async (notificationId: string) =>
      await api().put(`/notifications/${notificationId}/read`).then(res => res.data),
    ...options,
  });
};
