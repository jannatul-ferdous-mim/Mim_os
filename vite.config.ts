import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// Port 3000 is what the 3D scene loads when opened with ?dev
export default defineConfig({
    plugins: [react()],
    server: { port: 3000, strictPort: true },
    preview: { port: 3000 },
});
