import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react-swc';
import tailwindcss from '@tailwindcss/vite';
export default defineConfig(({ mode }) => {
  // Load .env variables based on environment
  const env = loadEnv(mode, process.cwd());

  return {
    plugins: [react(),tailwindcss()],
    server: {
      proxy: {
        '/api': {
          target: env.VITE_API_URL , // Fallback for safety
          changeOrigin: true,
          secure: false,
        },
      },
    },
  };
});
