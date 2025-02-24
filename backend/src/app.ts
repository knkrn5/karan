import express from 'express';
import cors from "cors";
import cookieParser from "cookie-parser";

const app = express();

//Middleware in Express processes requests in the order it’s defined.
// Middleware setup
const corsOptions = {
    origin: [
      'https://karan.email', 
      'https://www.karan.email', 
      'https://karan-frontend.onrender.com' , 
      'http://localhost:5173', 
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true,
    optionsSuccessStatus: 200, // Fix legacy browser issues
  };
  
  app.use(cors(corsOptions));
  app.options('*', cors(corsOptions)); // Handle preflight requests
  
  app.use(express.json({ limit: "16kb" }));
  app.use(express.urlencoded({ limit: "16kb", extended: true }));
  app.use(express.static("public"));
  app.use(cookieParser());



//routes imports
import contactRoutes from "./routes/contact.routes.js";

//routes
app.use("/api/contact", contactRoutes);


export { app };

