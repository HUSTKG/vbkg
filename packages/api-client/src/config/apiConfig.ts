interface InitializeApiProps {
  baseUrl: string;
  headers?: Record<string, string>;
}

let config: {
  baseUrl: string;
  headers: Record<string, string>;
} = {
  baseUrl: "",
  headers: {
    "Content-Type": "application/json",
  },
};

export const initializeApi = (userConfig: InitializeApiProps): void => {
  if (!userConfig?.baseUrl) {
    throw new Error("Base URL is required");
  }

  config = {
    ...config,
    ...userConfig,
  };
};

export const getConfig = () => {
  return config;
};
