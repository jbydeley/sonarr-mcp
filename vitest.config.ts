import { defineConfig } from "vitest/config";
import tsconfigPaths from "vite-tsconfig-paths";

export default defineConfig({
  plugins: [tsconfigPaths()],
  root: "./src",
  test: {
    setupFiles: ["./test/setup-env.ts"],
    coverage: {
      exclude: ["common/entities/**"],
    },
  },
});
