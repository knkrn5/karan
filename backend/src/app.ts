import express from 'express';
import helmet from 'helmet';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';

const app = express();
dotenv.config({ path: '.env' });

// CORS Configuration
const corsOptions = {
  origin: process.env.ENV === 'PRODUCTION' ? ['https://karan.email', 'https://www.karan.email'] : [
    'http://localhost:5173',
  ],
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 200, // Fixes legacy browser issues
  exposedHeaders: ['ratelimit-limit', 'ratelimit-remaining', 'ratelimit-reset']
};

app.use(cors(corsOptions));
app.use(express.json({ limit: '16kb' }));
app.use(express.urlencoded({ limit: '16kb', extended: true }));
app.use(cookieParser());
app.set('trust proxy', true); // Trust only the leftmost IP address

// Helmet Security
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'"],
        styleSrc: ["'self'", "'unsafe-inline'"],
        imgSrc: ["'self'"],
        connectSrc: ["'self'"],
      },
    },
    strictTransportSecurity: {
      maxAge: 31536000,
      includeSubDomains: true,
    },
    referrerPolicy: {
      policy: 'strict-origin-when-cross-origin',
    },
  })
);

app.get('/', (req, res) => {
  res.send('Hey api🎉 :)');
});

// Health Check
app.get('/health', (req, res) => {
  res.send('api health ✅ :)');
});

// Routes Imports
import projectsRoutes from './routes/projects.routes.js';
import contactRoutes from './routes/contact.routes.js';
import authRoutes from './routes/auth.routes.js';
import blogRoutes from './routes/blog.routes.js';
import emailNotificationsRoutes from './routes/emailNotifications.routes.js';
import chatbotRoutes from './routes/chatbot.routes.js';

// Route Definitions
app.use('/api/projects', projectsRoutes);
app.use('/api/contact', contactRoutes);
app.use('/api/v1/auth/', authRoutes);
app.use('/api/blog/', blogRoutes);
app.use('/api/email-notifications/', emailNotificationsRoutes);
app.use('/api/chatbot/', chatbotRoutes);

// Catching-all  non-matching routes
app.use('*', (req, res) => {
  res.status(404).json({ success: false, message: 'Resource not found' });
});

export { app };
