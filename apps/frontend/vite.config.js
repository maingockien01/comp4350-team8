import {defineConfig} from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default ({mode}) => {
  return defineConfig({
    plugins: [
      react(),
      svgr({
        exportAsDefault: true,
      }),
    ],
    define: {
      'process.env': `"${mode}"`,
    },
    resolve: {preserveSymlinks: true},
  });
};
