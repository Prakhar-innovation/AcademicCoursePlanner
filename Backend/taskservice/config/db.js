import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

export async function connectDB() {

    try {

        await mongoose.connect(
            process.env.DBURL
        );

        console.log(
            "MongoDB Connected Successfully"
        );

    } catch (error) {

        console.log(
            "MongoDB Connection Failed"
        );

        console.log(error);

        process.exit(1);
    }
}