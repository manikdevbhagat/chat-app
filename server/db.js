import mongoose from "mongoose";

const connectDB = async ()=>{
    const URL = process.env.MONGO_URI;
    try {
      await mongoose.connect(URL, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });
      console.log('MongoDb is connected');
    } catch (error) {
      console.log(error.message);
    }
}

export default connectDB;