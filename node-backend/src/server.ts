import dotenv from 'dotenv';
dotenv.config();

import { app } from './app.js';
import connectMongoDB from './db/clients/mongoDB.js';

const startServer = async () => {
  try {
    await connectMongoDB();
    const port = process.env.PORT ?? 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
