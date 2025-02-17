import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import tailwind from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [vue(), tailwind()],
  resolve: {
    alias: [
      { find: "@components", replacement: "/src/components" },
      { find: "@modules", replacement: "/src/modules" },
      { find: "@core", replacement: "/src/core" },
    ]
  }
})
