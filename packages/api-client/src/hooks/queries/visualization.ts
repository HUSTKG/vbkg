// Fetch Visualizations
export const useFetchVisualizations = (
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["visualizations"],
    async () => await api().get("/visualizations").then(res => res.data),
    options
  );
};

// Get Visualization Templates
export const useGetVisualizationTemplates = (
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["visualizationTemplates"],
    async () => await api().get("/visualizations/templates").then(res => res.data),
    options
  );
};
