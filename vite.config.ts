import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

export default defineConfig(({ command }) => {
  const baseConfig = {
    plugins: [preact()],
    test: {
      globals: true,
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
