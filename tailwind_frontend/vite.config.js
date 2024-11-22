import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {  // This will match all requests starting with /api
        target: 'http://localhost:8080',  // Your backend server URL
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')  // Removes /api prefix before sending to the backend
      }
    }
  }
})
