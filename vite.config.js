import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/api": {
        target: "https://dev-project-ecommerce.upgrad.dev",
        changeOrigin: true,
        secure: true,
        headers: {
          "Access-Control-Expose-Headers": "auth",
        },
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
});
