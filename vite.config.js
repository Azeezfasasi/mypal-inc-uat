import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig(({ command }) => ({
  plugins: [
    react(),
    tailwindcss(),
  ],
  // Strip debug logging from production builds; console.warn/error are kept
  esbuild: command === 'build'
    ? { pure: ['console.log', 'console.info', 'console.debug'] }
    : undefined,
}))
