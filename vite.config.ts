import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

// Try to import Replit plugins only if on Replit
let runtimeErrorOverlay;
try {
  runtimeErrorOverlay = require("@replit/vite-plugin-runtime-error-modal").default;
} catch (e) {
  runtimeErrorOverlay = () => {};
}

export default defineConfig(async () => {
  // Build the plugins array
  const plugins = [
    react(),
    // Only include Replit plugins if running on Replit
    ...(process.env.REPL_ID
      ? [
          runtimeErrorOverlay(),
          await import("@replit/vite-plugin-cartographer").then((m) => m.cartographer()),
        ]
      : []),
  ];

  return {
    plugins,
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
