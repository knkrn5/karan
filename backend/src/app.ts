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
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // Fixes legacy browser issues
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', true); // Trust only the leftmost IP address

// Health Check
app.get('/health', (req, res) => {
  res.send('health ok :)');
});

// Routes Imports
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';
import profileRoutes from './routes/profile.routes.js';
import blogRoutes from './routes/blog.routes.js';
import emailNotificationsRoutes from './routes/emailNotifications.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js'; 

// Route Definitions
app.use('/api/contact', contactRoutes);
app.use('/api/v1/auth/', authRoutes);
app.use('/api/v1/profile/', profileRoutes);
app.use('/api/blog/', blogRoutes);
app.use('/api/email-notifications/', emailNotificationsRoutes);
app.use('/api/chatbot/', chatbotRoutes); 

app.get('*', (req, res) => {
  /* const frontendUrl ='PRODUCTION'
    process.env.NODE_ENV === ''
      ? process.env.FRONTEND_URL ?? 'https://karan.email' 
      : 'http://localhost:5173';

  res.redirect(frontendUrl); */
  res.send('hey. from backend...');
});

export { app };
