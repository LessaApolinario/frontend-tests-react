/// <reference types="vitest" />
import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), tsconfigPaths()],
  server: {
    port: 3000,
  },
  test: {
    environment: "jsdom",
    exclude: [
      "node_modules",
      "dist",
      "build",
      ".next",
      ".output",
      "coverage",
      "public",
      "**/e2e/**",
      "**/cypress/**",
    ],
  },
});
