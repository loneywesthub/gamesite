import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(async () => {
  // Only add Replit plugins if running on Replit
  let replitPlugins = [];
  if (process.env.REPL_ID) {
    const { default: runtimeErrorOverlay } = await import("@replit/vite-plugin-runtime-error-modal");
    const { cartographer } = await import("@replit/vite-plugin-cartographer");
    replitPlugins = [runtimeErrorOverlay(), cartographer()];
  }

  return {
    plugins: [
      react(),
      ...replitPlugins,
    ],
    resolve: {
      alias: {
        "@": path.resolve(import.meta.dirname, "client", "src"),
        "@shared": path.resolve(import.meta.dirname, "shared"),
        "@assets": path.resolve(import.meta.dirname, "attached_assets"),
      },
    },
    root: path.resolve(import.meta.dirname, "client"),
    build: {
      outDir: path.resolve(import.meta.dirname, "dist/public"),
      emptyOutDir: true,
    },
    server: {
      fs: {
        strict: true,
        deny: ["**/.*"],
      },
    },
  };
});
