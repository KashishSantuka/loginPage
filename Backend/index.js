import express from "express";
import dotenv from "dotenv";
import { dbConnection } from "./dbConnect.js";
import routes from "./routes/route.js";
import cors from "cors";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(express.json());
app.use(cookieParser()); 


app.use("/", routes)
const PORT = process.env.PORT;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server running at Port: ${PORT}`);
});
