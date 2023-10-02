import path from 'node:path';
import react from '@vitejs/plugin-react-swc';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), dts({ include: ['src'] })],
  build: {
    outDir: 'build',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: '@smy/ui',
      formats: ['es', 'cjs'],
      fileName: (fileName) => `[name]-${fileName}.js`,
    },
    rollupOptions: {
      input: path.resolve(__dirname, 'src/index.ts'),
      output: {
        sourcemap: true,
        preserveModules: true,
        preserveModulesRoot: 'src',
        globals: {
          react: 'React',
        },
      },
      external: ['react', 'react-dom', 'react/jsx-runtime'],
    },
  },
  resolve: {
    alias: [
      {
        find: '@',
        replacement: path.resolve(__dirname, 'src'),
      },
      {
        find: 'public',
        replacement: path.resolve(__dirname, 'public'),
      },
    ],
  },
});
