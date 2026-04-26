import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  resolve: {
    conditions: ["source"],
  },
  plugins: [react(), tailwindcss()],
});
