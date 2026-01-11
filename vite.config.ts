import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  base: "./", // Use relative paths for deployment
  plugins: [react()],
  build: {
    outDir: "dist",
    cssCodeSplit: false,
    // Bundle all dependencies into a single file
    rollupOptions: {
      input: "index.html",
      output: {
        // Use IIFE format - self-contained, no imports/exports
        format: "iife",
        // Single entry file with all dependencies bundled
        entryFileNames: "bundle.js",
        // No code splitting - everything in one file
        manualChunks: undefined,
        // Inline all assets
        inlineDynamicImports: true,
        // Bundle format settings
        name: "nurtureBeastTool",
        extend: true,
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) return "styles.css";
          return "assets/[name][extname]";
        },
      },
      // External dependencies - set to empty to bundle everything
      external: [],
    },
    // Ensure all dependencies are bundled
    commonjsOptions: {
      include: [/node_modules/],
    },
    // Target browsers that don't support ES modules
    target: "es2015",
    // Minify the output
    minify: "terser",
    terserOptions: {
      format: {
        // Remove all comments
        comments: false,
      },
    },
  },
  // Resolve all dependencies
  resolve: {
    dedupe: [],
  },
});
