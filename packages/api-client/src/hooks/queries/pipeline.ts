// Fetch Pipelines
export const useFetchPipelines = (
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["pipelines"],
    async () => await api().get("/").then(res => res.data),
    options
  );
};

// Fetch Pipeline Run Status
export const useFetchPipelineRunStatus = (
  runId: string,
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["pipelineRunStatus", runId],
    async () => await api().get(`/pipelines/runs/${runId}/status`).then(res => res.data),
    options
  );
};

// Fetch Pipeline Runs
export const useFetchPipelineRuns = (
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["pipelineRuns"],
    async () => await api().get("/pipelines/runs").then(res => res.data),
    options
  );
};

// Fetch Specific Pipeline Run
export const useFetchPipelineRun = (
  runId: string,
  options: UseQueryOptions<any, Error>
) => {
  return useQuery(
    ["pipelineRun", runId],
    async () => await api().get(`/pipelines/runs/${runId}`).then(res => res.data),
    options
  );
};
