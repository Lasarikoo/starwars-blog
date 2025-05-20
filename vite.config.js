import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,       // aquí pones el puerto que quieras
    strictPort: true  // opcional: falla si el 3000 está ocupado
  }
})
