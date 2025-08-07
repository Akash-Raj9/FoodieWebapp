import mongoose from "mongoose";

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://akash_database:62050812@cluster0.4rtgijc.mongodb.net/food-del').then(()=>console.log("DB Connected"));
}