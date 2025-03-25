import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ path: '.env' });

// ✅ CORS Configuration
const corsOptions = {
  origin: [
    'https://karan.email',
    'https://www.karan.email',
    'https://karan-frontend.onrender.com',
    'http://localhost:5173',
    'http://localhost:4173',
  ],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // Fixes legacy browser issues
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());

// Health Check
app.get('/health', (req, res) => {
  res.send('health ok :)');
});

// Routes Imports
import contactRoutes from './routes/contact.routes.js';
import userRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';

// Route Definitions
app.use('/api/contact', contactRoutes);
app.use('/api/v1/auth/', userRoutes);
app.use('/api/v1/profile/', profileRoutes);


app.get('*', (req, res) => {
  /* const frontendUrl ='PRODUCTION'
    process.env.NODE_ENV === ''
      ? process.env.FRONTEND_URL ?? 'https://karan.email' 
      : 'http://localhost:5173';

  res.redirect(frontendUrl); */
  res.send('hey. from backend...');
});

export { app };
