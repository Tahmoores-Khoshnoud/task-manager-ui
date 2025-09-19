import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      // forward /tasks to your API on :3000
      '/tasks': {
        target: 'http://localhost:3000',
        changeOrigin: true,
      },
    },
  },
})
