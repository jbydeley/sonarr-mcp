import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  root: './src',
  test: {
    setupFiles: ['./test/setup-env.ts'],
    coverage: {
      exclude: ['common/entities/**'],
    },
  },
});
