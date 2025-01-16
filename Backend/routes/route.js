 import { logInUser, registerUser } from "../controller/userController.js";
import { Router } from "express";

 const router = Router();

 router.post("/login", logInUser);
 router.post("/register", registerUser);

 export default router