import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// In dev, /api/ask-cv is proxied to the local Firebase Functions emulator.
const EMULATOR_FN = 'http://127.0.0.1:5001/mbs-site-ea6ff/us-central1/askCv'

// Pretty /cv URL → the PDF, mirrored by a Firebase Hosting redirect in prod.
const cvRoute = {
  name: 'cv-route',
  configureServer(server: { middlewares: { use: (fn: (req: { url?: string }, res: { statusCode: number; setHeader: (k: string, v: string) => void; end: () => void }, next: () => void) => void) => void } }) {
    server.middlewares.use((req, res, next) => {
      if (req.url === '/cv' || req.url === '/cv/') {
        res.statusCode = 302;
        res.setHeader('Location', '/cv.pdf');
        res.end();
        return;
      }
      next();
    });
  },
};

export default defineConfig({
  plugins: [react(), tailwindcss(), cvRoute],
  server: {
    proxy: {
      '/api/ask-cv': {
        target: EMULATOR_FN,
        changeOrigin: false,
        rewrite: () => '',
      },
    },
  },
})
