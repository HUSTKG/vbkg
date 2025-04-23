// Fetch notifications
export const useFetchNotifications = (
  options: UseQueryOptions<Notification[], Error>
) => {
  return useQuery(
    ["notifications"],
    async () => await api().get("/notifications").then(res => res.data),
    options
  );
};
