import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import morgan from 'morgan';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';
import path from 'path';
import { fileURLToPath } from 'url';
import connectDB from './config/db.js';
import serviceRoutes from './routes/serviceRoutes.js';
import contactRoutes from './routes/contactRoutes.js';

dotenv.config();

// Fix for __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Connect to Database
connectDB();

const app = express();

// Security Middleware
app.use(helmet({
  contentSecurityPolicy: false, // Disabled for ease of deployment with external images/fonts
}));
app.use(compression());

// CORS Configuration (Only needed for dev now)
if (process.env.NODE_ENV === 'development') {
  app.use(cors());
  app.use(morgan('dev'));
}

app.use(express.json());

// Rate Limiting
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: 'Too many requests from this IP',
  standardHeaders: true,
  legacyHeaders: false,
});

// API Routes
app.use('/api/services', serviceRoutes);
app.use('/api/contact', apiLimiter, contactRoutes);

// --- UNIFIED DEPLOYMENT LOGIC ---
// This serves the built frontend files from the 'dist' folder
const distPath = path.join(__dirname, '../dist');

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(distPath));

  // Catch-all route for React Router
  app.get('*', (req, res) => {
    if (!req.url.startsWith('/api')) {
      res.sendFile(path.join(distPath, 'index.html'));
    }
  });
} else {
  app.get('/', (req, res) => {
    res.send('API is running in development mode...');
  });
}

// Error Handling Middleware
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode).json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
});

// Health check endpoint (for external pingers like cron-job.org)
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'alive', timestamp: new Date().toISOString() });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Unified server is running on port ${PORT}`);

  // Keep-alive: self-ping every 14 minutes to prevent Render free tier from sleeping
  if (process.env.NODE_ENV === 'production' && process.env.RENDER_EXTERNAL_URL) {
    const INTERVAL = 14 * 60 * 1000; // 14 minutes
    setInterval(async () => {
      try {
        const url = `${process.env.RENDER_EXTERNAL_URL}/health`;
        await fetch(url);
        console.log(`♻️  Keep-alive ping sent at ${new Date().toLocaleTimeString()}`);
      } catch (err) {
        console.error('Keep-alive ping failed:', err);
      }
    }, INTERVAL);
    console.log('💓 Keep-alive pinger active (every 14 min)');
  }
});
