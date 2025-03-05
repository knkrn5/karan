import express from 'express';
import cors from 'cors';
import cookieParser from 'cookie-parser';

const app = express();

// ✅ CORS Configuration
const corsOptions = {
  origin: ['https://karan.email', 'https://www.karan.email', 'http://localhost:5173'],
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
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
import userRoutes from './routes/user.routes.js';

// Route Definitions
app.use('/api/contact', contactRoutes);
app.use('/api/v1/auth/user/', userRoutes);

// Catch-All Route 
app.get('*', (req, res) => {
  // res.redirect(process.env.FRONTEND_URL || 'http://localhost:5173'); 
  res.send('hey, from backend');
});

export { app };
