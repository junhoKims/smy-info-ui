import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react-swc';
import { glob } from 'glob';
import { defineConfig } from 'vite';
import dts from 'vite-plugin-dts';

// https://vitejs.dev/config/
export default ({ mode }) => {
  return defineConfig({
    plugins: [
      react(),
      dts({
        include: ['src'],
        exclude: ['src/styles', 'src/**/*.stories.@(js|jsx|mjs|ts|tsx)'],
      }),
    ],
    build: {
      outDir: 'build',
      lib: {
        entry: Object.fromEntries(
          glob
            .sync(['src/**/index.{ts,tsx}'])
            .map((file) => [
              path.relative('src', file.slice(0, file.length - path.extname(file).length)),
              fileURLToPath(new URL(file, import.meta.url)),
            ]),
        ),
        name: '@smy/ui',
        formats: ['es', 'cjs'],
        fileName: (format, entryName) => {
          const paths = entryName === 'index' ? 'index' : entryName.split('/index')[0];
          const files = entryName === 'index' ? 'index' : entryName.split('/').slice(-2, -1)[0];
          return paths === 'index' ? `index-${format}.js` : `${paths}/${files}-${format}.js`;
        },
      },
      rollupOptions: {
        output: {
          sourcemap: mode === 'development',
          exports: 'named',
          chunkFileNames: '[name]-chunk-[hash].js',
          assetFileNames: 'assets/[name].[ext]',
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
};
