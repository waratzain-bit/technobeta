import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  plugins: [
    react(),
    viteSingleFile() // Menggabungkan JS dan CSS langsung ke dalam satu file HTML
  ],
  build: {
    target: 'esnext', // <--- SUDAH DIPERBAIKI (Menggunakan fitur JavaScript modern terbaru)
    assetsInlineLimit: 100000000, 
    chunkSizeWarningLimit: 5000,
  },
})