import User from "../models/auth.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
dotenv.config();

/* Register functionality */
export const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res.status(400).json({ errorMessage: "Bad request" });
    }

    const isUserExist = await User.findOne({ username });
    if (isUserExist) {
      return res.status(400).json({ errorMessage: "User already exist" });
    }

    //HASH PASSWORD HERE
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUserData = new User({
      username,
      password: hashedPassword,
    });

    if (newUserData) {
      await newUserData.save();
      res.status(201).json({
        message: "User registered successfully",
        _id: newUserData._id,
        username: newUserData.username,
      });
    } else {
      res.status(400).json({ errorMessage: "Invalid user data" });
    }
  } catch (error) {
    console.log("Error in register controller", error.message);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

/* Login functionality */
export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      return res
        .status(400)
        .json({ errorMessage: "Bad Request! Invalid credentials" });
    }

    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid username or password" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res
        .status(400)
        .json({ errorMessage: "Invalid username or password" });
    }

    const token = jwt.sign(
      {
        user: user._id,
      },
      process.env.JWT_SECRET,
      { expiresIn: "2d" }
    );

    res.status(200).json({
      message: "User logged in successfully",
      _id: user._id,
      token: token,
      username: user.username,
    });
  } catch (error) {
    console.log("Error in login controller", error.message);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

/* Logout functionality */
export const logout = async (req, res) => {
  try {
    const { username } = req.body;

    const token = jwt.sign(
      {
        user: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: 0 }
    );

    res.status(200).json({ message: "User logged out successfully" });
  } catch (error) {
    console.error("Error in logout controller:", error.message);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};

/* Validate the token */

export const validateToken = async (req, res) => {
  try {
    res.status(200).json({ message: "Token is valid", user: req.user });
  } catch (error) {
    console.error("Error in validateToken:", error.message);
    res.status(500).json({ errorMessage: "Internal Server Error" });
  }
};
