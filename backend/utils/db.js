import mongoose from "mongoose";

const connectDB = async () => {
  try {
    mongoose.set('strictQuery', false); // Adjust according to your needs
    const mongoURI = process.env.MONGO_URI;

    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("MongoDB connected successfully.");
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1); // Exit with failure
  }
};

export default connectDB;
