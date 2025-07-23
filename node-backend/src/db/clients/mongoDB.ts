import mongoose from "mongoose";


const connectMongoDB = async () => {
  try {
    const mongoDBconnection = await mongoose.connect(`${process.env.MONGO_URL}`);
    console.log(`📦 MongoDB Connected: ${mongoDBconnection.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error}`);
    process.exit(1);
  }
};


export default connectMongoDB;
