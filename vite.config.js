import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

function apiDevPlugin() {
  return {
    name: 'api-dev-server',
    configureServer(server) {
      server.middlewares.use(async (req, res, next) => {
        if (req.url && req.url.startsWith('/api/chat')) {
          let body = '';
          req.on('data', chunk => { body += chunk; });
          req.on('end', async () => {
            try {
              req.body = body ? JSON.parse(body) : {};
              const chatModule = await import('./api/chat.js');
              const mockRes = {
                statusCode: 200,
                setHeader(k, v) { res.setHeader(k, v); },
                status(code) { this.statusCode = code; return this; },
                json(data) {
                  res.statusCode = this.statusCode;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify(data));
                }
              };
              await chatModule.default(req, mockRes);
            } catch (err) {
              console.error('API /api/chat error:', err);
              res.statusCode = 500;
              res.setHeader('Content-Type', 'application/json');
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }
        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  Object.assign(process.env, env);

  return {
    plugins: [react(), apiDevPlugin()],
    server: {
      port: 3000,
      host: true
    },
    build: {
      target: 'esnext',
      cssCodeSplit: true,
      chunkSizeWarningLimit: 1000,
      rollupOptions: {
        output: {
          manualChunks: {
            vendor: ['react', 'react-dom', 'react-router-dom']
          }
        }
      }
    }
  };
});
