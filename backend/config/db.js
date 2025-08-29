import mongoose from "mongoose";

export const connectDB = async () => {
    const mongo_uri = process.env.MONGO_URI;
    await mongoose.connect(`${mongo_uri}`).then(()=>console.log("DB Connected"));
}