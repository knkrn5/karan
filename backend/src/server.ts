import { Request, Response } from "express";
import dotenv from "dotenv";
dotenv.config();

import { app } from "./app.js";
import connectDB from "./db/indexdb.js";

const startServer = async () => {
  try {
    await connectDB();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`🚀 Server running on port ${port}`);
    });
    
  } catch (error) {
    console.error("Failed to start server:", error);
    process.exit(1);
  }
};

startServer();


app.get("/health", (req: Request, res: Response) => {
  res.send("health ok :)");
})

/* app.get('*', (req, res) => {
  // res.redirect(process.env.FRONTEND_URL);
  res.redirect('http://localhost:5173');
}); */