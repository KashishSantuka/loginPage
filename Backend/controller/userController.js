import User from "../models/userLogin.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

//FOR LOGGING THE USER---------------------------------

export const logInUser = async (req, res) => {
  try {
    console.log(req.body);
    const { username, password } = req.body;

    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: "Username and Password is required",
      });
    }

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        success: false,
        messsage: "User not found",
      });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Password is not valid",
      });
    }

    const token = jwt.sign(
      { id: user._id.toString(), username: user.username },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h",
      }
    );

    res.cookie("authToken", token, {
      httpOnly: true,
      secure: true, // Ensure HTTPS in production
      sameSite: "Strict",
      maxAge: 3600000,
    });

    return res.status(200).json({ message: "Login successful!" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Error in logging the user",
      error: error.message,
    });
  }
};

//FOR REGISTERING USER----------------------------

export const registerUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    console.log(email);

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(401).json({
        success: false,
        message: "Email Already Exist",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const formattedEmail = email.toLowerCase();

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    return res.status(200).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "User register failed",
      error: error.message,
    });
  }
};
