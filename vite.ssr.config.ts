import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  build: {
    // SSR build will output into dist/server via CLI --outDir
    rollupOptions: {
      output: {
        entryFileNames: "entry-server.js", // ✅ SSR output name
        chunkFileNames: "chunks/[name].js",
      },
    },
  },
});
