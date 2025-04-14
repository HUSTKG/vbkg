import { dirname, join } from "path";
import path from "path"
import type { StorybookConfig } from "@storybook/react-vite";
import { ConfigEnv, loadConfigFromFile, mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: [
	  '../src/introduction.mdx', // Đưa introduction.mdx lên đầu tiên
	  '../src/**/*.mdx', 
	  '../src/**/*.stories.@(js|jsx|mjs|ts|tsx)'
  ],
  addons: [
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
    "@chromatic-com/storybook",
	{
      name: getAbsolutePath('@storybook/addon-themes'),
      options: {
        default: 'light',
        list: [
          { name: 'light', class: '', color: '#ffffff' },
          { name: 'dark', class: 'dark', color: '#1a202c' },
        ],
      },
    },
  ],

  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },

  typescript: {
    reactDocgen: "react-docgen-typescript"
  },
  core: {
    builder: '@storybook/builder-vite', // 👈 The builder enabled here.
  },
  viteFinal: async (config) => {
	 const userConfig = await loadConfigFromFile(
      path.resolve(__dirname, "../vite.config.ts") as unknown as ConfigEnv
    );

	return mergeConfig(config, {
      ...userConfig,
      // manually specify plugins to avoid conflict
      optimizeDeps: {
        ...config.optimizeDeps,
        include: [
          ...(config.optimizeDeps?.include || []),
          'tailwind-merge',
          'clsx',
        ],
        exclude: [
          ...(config.optimizeDeps?.exclude || []),
          '@tailwindcss/vite',
        ],
      },
      plugins: [],
    });
  },
};
export default config;

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
