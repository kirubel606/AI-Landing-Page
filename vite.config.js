import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { viteStaticCopy } from 'vite-plugin-static-copy';

export default ({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_API_BASE_URL;

  return defineConfig({
    plugins: [
      react(),
      viteStaticCopy({
        targets: [
          {
            src: 'node_modules/pdfjs-dist/build/pdf.worker.mjs',
            dest: '', // Put at root of dist
          },
        ],
      }),
    ],
    server: {
      host: '0.0.0.0', // 👈 Bind to all network interfaces
      port: 5173,       // 👈 Optional but explicit
      proxy: {
        '/media': {
          target: backendUrl,
          changeOrigin: true,
          secure: false,
          onProxyRes(proxyRes) {
            if (proxyRes.headers['x-frame-options']) {
              delete proxyRes.headers['x-frame-options'];
            }
          },
        },
      },
    },
  });
};
