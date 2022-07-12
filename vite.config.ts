import { rmSync } from 'fs';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import electron from 'vite-plugin-electron';
import pkg from './package.json';

rmSync('dist', { recursive: true, force: true }); // v14.14.0

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    electron({
      main: {
        entry: 'src-electron/main/index.ts',
        vite: {
          build: {
            outDir: 'dist/main',
          },
        },
      },
      preload: {
        input: {
          // You can configure multiple preload here
          index: `${__dirname}/src-electron/preload/index.ts`,
        },
        vite: {
          build: {
            // For debug
            sourcemap: 'inline',
            outDir: 'dist/preload',
          },
        },
      },
      // Enables use of Node.js API in the Renderer-process
      renderer: {},
    }),
  ],
  server: {
    host: pkg.env.VITE_DEV_SERVER_HOST,
    port: pkg.env.VITE_DEV_SERVER_PORT,
  },
});
