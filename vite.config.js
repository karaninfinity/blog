import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/my-app/",
  resolve: {
    alias: [{ find: "@", replacement: "/src" }],
  },
});
