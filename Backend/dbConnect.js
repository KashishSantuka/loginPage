import mongoose from "mongoose";

import dotenv from "dotenv"

dotenv.config();

export const dbConnection = async() => {
    await mongoose
    .connect(process.env.MONGODB_URL)
    .then(() => console.log("Connect to the dataBase"))
    .catch((err) => console.log("Error connecting the db", err))
}