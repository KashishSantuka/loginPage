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

const allowedOrigins = ["https://jayaram-dev-004.github.io"];

app.use(cors({
  origin: allowedOrigins, // Specify allowed origin
  methods: ["GET", "POST", "PUT", "DELETE"], // Specify allowed HTTP methods
  credentials: true // Allow credentials (cookies, authorization headers)
}));


app.use("/", routes)
const PORT = process.env.PORT;

app.listen(PORT, () => {
  dbConnection();
  console.log(`Server running at Port: ${PORT}`);
});
