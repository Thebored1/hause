import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";

export default defineConfig({
  resolve: {
    // Matches the "@/*" path alias in tsconfig, so tests import modules by the
    // same specifier the application uses.
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  test: {
    environment: "node",
    include: ["tests/**/*.test.ts"],
    // The integration suite boots Payload and pushes a schema into a scratch
    // SQLite file; that is slower than the default allowance.
    testTimeout: 60_000,
    hookTimeout: 120_000,
    // Payload holds module-level state and a database handle, so suites must
    // not share a process.
    fileParallelism: false,
  },
});
