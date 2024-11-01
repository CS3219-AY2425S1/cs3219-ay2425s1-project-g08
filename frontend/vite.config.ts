import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";

export default (({ mode }: { mode: string }) => {
  process.env = {...process.env, ...loadEnv(mode, process.cwd())};

  return defineConfig({
    server: {
      host: '0.0.0.0',
      port: 5173,
      proxy: {
        '/usersvcapi': {
          target: process.env.VITE_USER_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/usersvcapi/, '')
        },
        '/qbsvcapi' : {
          target: process.env.VITE_QB_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/qbsvcapi/, '')
        },
        '/ppsvcapi' : {
          target: process.env.VITE_PP_SERVICE_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/ppsvcapi/, '')
        },
        '/socket.io' : {
          target: process.env.VITE_MATCH_WEBSOCKET_URL,
          ws: true,
          rewriteWsOrigin: true,
        },
        '/matchexpresssvcapi' : {
          target: process.env.VITE_MATCH_EXPRESS_URL,
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/matchexpresssvcapi/, '')
        }
      }
    },
    plugins: [react()],
    resolve: {
      alias: {
        "@": "/src",
      },
    },
  });
});
