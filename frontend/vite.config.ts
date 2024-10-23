import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  server: {
    host: "0.0.0.0",
    port: 5173,
    proxy: {
      "/usersvcapi": {
        target: "http://user-service:3001",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/usersvcapi/, ""),
      },
      "/qbsvcapi": {
        target: "http://questionbank-service:8080",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/qbsvcapi/, ""),
      },
      "/ppsvcapi": {
        target: "http://profilepicture-service:8081",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/ppsvcapi/, ""),
      },
      "/matchwssvcapi": {
        target: "ws://matching-service:8082",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/matchwssvcapi/, ""),
      },
      "/matchexpresssvcapi": {
        target: "http://matching-service:3000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/matchexpresssvcapi/, ""),
      },
    },
  },
  plugins: [react()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
});
