import tsconfigPaths from 'vite-tsconfig-paths';
import { defineConfig } from 'vitest/config';

export default defineConfig({
  plugins: [tsconfigPaths()],
  test: {
    include: ['./app/**/*.test.{ts,tsx}'],
    setupFiles: ['./tests/setup/vitest.ts'],
    reporters: process.env.CI ? ['junit'] : [],
    coverage: {
      include: ['app'],
      reporter: process.env.CI ? ['cobertura'] : ['html-spa'],
      reportsDirectory: 'vitest-coverage',
    },
    outputFile: 'vitest-test-results/junit.xml',
  },
});
