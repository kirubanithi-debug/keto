import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
  ],
  server: {
    host: '0.0.0.0', // This allows access from any IP address
    port: 5173,      // Default Vite port
    open: true       // Automatically open browser when server starts
  }
})
