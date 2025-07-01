// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // proxy any /media/* request to Django
      "/media": {
        target: "http://127.0.0.1:8000",
        changeOrigin: true,
        secure: false,
        // remove the frame‑blocking header
        onProxyRes(proxyRes) {
          if (proxyRes.headers["x-frame-options"]) {
            delete proxyRes.headers["x-frame-options"];
          }
        },
      },
    },
  },
});
