import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    dts({ include: ['src'] }),
    cssInjectedByJsPlugin({
      jsAssetsFilterFunction: function customJsAssetsfilterFunction(outputChunk) {
        return /index-(cjs|es)/.test(outputChunk.fileName);
      },
    }),
  ],
  build: {
    copyPublicDir: false,
    outDir: 'build',
    lib: {
      entry: Object.fromEntries(
        glob
          .sync('src/**/index.{ts,tsx}')
          .map((file) => [
            path.relative('src', file.slice(0, file.length - path.extname(file).length)),
            fileURLToPath(new URL(file, import.meta.url)),
          ]),
      ),
      name: '@smy/ui',
      formats: ['es', 'cjs'],
      fileName: (fileName) => `[name]-${fileName}.js`,
    },
    rollupOptions: {
      output: {
        sourcemap: true,
        exports: 'named',
        chunkFileNames: '[name]-chunk-[hash].js',
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
