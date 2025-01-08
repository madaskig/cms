import { defineConfig } from 'vitest/config'
import tsconfigPaths from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    global: true,
    environment: 'jsdom',
    setupFiles: ["./vitest.setup.js"]
  },
  plugins: [tsconfigPaths()],
})