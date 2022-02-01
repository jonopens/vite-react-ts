import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { fileURLToPath } from 'url';
import { dependencies } from "./package.json";

// Packages we want in the vendor aka the deps needed in the entire app.
const globalVendorPackages = ["react", "react-dom", "react-router-dom"];

function renderChunks(deps: Record<string, string>) {
  let chunks = {};
  Object.keys(deps).forEach((key) => {
    if (globalVendorPackages.includes(key)) return;
    chunks[key] = [key];
  });
  return chunks;
}

export default defineConfig({
  root: 'public',
  plugins: [react()],
  resolve: {
    alias: {
      // for TypeScript path alias import like : @/x/y/z
      "@": fileURLToPath(new URL('./src', import.meta.url))
    }
  },
  build: {
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: globalVendorPackages,
          ...renderChunks(dependencies),
        },
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:8080",
        secure: false,
        rewrite: path => path.replace(/^\/api/, ""),
      },
    },
  },
});