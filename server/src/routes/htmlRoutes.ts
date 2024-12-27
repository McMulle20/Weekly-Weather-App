import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { Router } from 'express';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const router = Router();

// TODO: Define route to serve index.html // 
router.get('/', (_req, res) => {
  res.sendFile(path.join(__dirname, '../../../client/dist/index.html'));
  });

// Create Express.js routes for default '/', '/send' and '/routes' endpoints
// Define route for /send endpoint
  router.get('/send', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/sendFile.html'), (err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
  });

 // Define route for /routes endpoint
  router.get('/routes', (_req, res) => {
    res.sendFile(path.join(__dirname, '../public/routes.html'), (err) => {
      if (err) {
        res.status(500).json(err);
      }
    });
  });

export default router;
