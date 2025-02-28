import { Request, Response } from "express";
import { User } from "../models/user.model.js";

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({
      $or: [{ email }],
    });

    if (existingUser) {
      res.status(400).json({
        success: false,
        status: "User already exists",
        message: "User already exists",
        data: existingUser,
      });
      return;
    }

    //creating user profile using object property shorthand
    const newUser = await User.create({
      firstName,
      lastName,
      email,
      password,
    });

    res.status(201).json({
      success: true,
      status: "Accout created successfully",
      message: "User created successfully",
      data: newUser,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: "Failed to create user",
      message: error.message,
    });
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found, Sign Up",
        status: "User not found, Please Sign Up",
        data: null,
      });
      return;
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: "Incorrect Password",
        status: "Incorrect Password",
        data: null,
      });
      return;
    }

    res.status(200).json({
      success: true,
      message: "Login successful",
      status: "Login successful",
      data: user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: "Failed to login",
      status: "Failed to login",
      data: null,
    });
  }
};

export { registerUser, loginUser };