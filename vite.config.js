import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default ({ mode }) => {
  // Load all env vars, VITE_API_BASE_URL should be defined in .env
  const env = loadEnv(mode, process.cwd(), '');
  const backendUrl = env.VITE_API_BASE_URL;

  return defineConfig({
    plugins: [react()],
    server: {
      proxy: {
        // Proxy /media requests to Django backend and strip frame-blocking headers
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
