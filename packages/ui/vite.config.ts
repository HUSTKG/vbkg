import path, { resolve } from "path"
import tailwindcss from "@tailwindcss/vite"
import dts from 'vite-plugin-dts';
import react from "@vitejs/plugin-react"
import { defineConfig } from "vite"
import { peerDependencies, dependencies } from './package.json';

// https://vite.dev/config/
export default defineConfig({
  plugins: [
	  react(), 
	  tailwindcss(), 
	  dts({
      insertTypesEntry: true,
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/**/*.stories.{ts,tsx}', 'src/**/*.test.{ts,tsx}'],
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      name: 'ui',
      formats: ['es', 'cjs'],
      fileName: (format) => `index.${format === 'es' ? 'mjs' : 'cjs'}`,
    },
    rollupOptions: {
      external: [
        ...Object.keys(peerDependencies || {}),
        ...Object.keys(dependencies || {}),
      ],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        preserveModules: true,
        preserveModulesRoot: 'src',
      },
    },
    outDir: 'dist',
    emptyOutDir: true,
    sourcemap: true,
  },
})

