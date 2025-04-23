
// Fetch current user
export const useCurrentUser = (
  options: UseQueryOptions<User, Error>
) => {
  return useQuery(
    ["currentUser"],
    async () => await api().get("/users/me").then(res => res.data),
    options
  );
};
// Fetch users (admin only)
export const useFetchUsers = (
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["users"],
    async () => await api().get("/users").then(res => res.data),
    options
  );
};

// Fetch a specific user (admin only)
export const useFetchUser = (
  userId: string,
  options: UseQueryOptions<User, Error>
) => {
  return useQuery(
    ["user", userId],
    async () => await api().get(`/users/${userId}`).then(res => res.data),
    options
  );
};
