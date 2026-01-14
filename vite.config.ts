import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [preact()],
    build: {
      outDir: "dist",
      sourcemap: true,
    },
    test: {
      globals: true,
      environment: "jsdom",
    },
  };

  if (command === "serve") {
    return baseConfig;
  }

  return {
    ...baseConfig,
    base: "/tornuggla/",
  };
});
