import { Request, Response } from 'express';
import { User } from '../models/user.model.js';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(400).json({
        success: false,
        status: 'User already exists',
        message: 'User already exists',
        userdata: null,
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

    const userInfo = await User.findById(newUser._id).select('-password');
    /*  const userInfo = {
      ...newUser, password: undefined,
    } */

    res.status(201).json({
      success: true,
      status: 'Accout created successfully',
      message: 'User created successfully',
      data: userInfo,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      status: 'Failed to create user',
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
        message: 'User not found, Sign Up',
        status: 'User not found, Please Sign Up',
        userdata: null,
      });
      return;
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(400).json({
        success: false,
        message: 'Incorrect Password',
        status: 'Incorrect Password',
        userdata: null,
      });
      return;
    }

    const loggedInUserInfo = await User.findById(user._id).select('-password -__v');

    // Generating new access token dynamically
    const accessToken = user.createAccessToken();

    res
      .status(200)
      .cookie('accessToken', accessToken, {
        httpOnly: true,
        secure: true,
        sameSite: 'strict',
        maxAge: 24 * 60 * 60 * 1000,
      })
      .json({
        success: true,
        message: 'Login successful',
        status: 'Login successful',
        userdata: loggedInUserInfo,
        accessToken,
      });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to login',
      status: 'Failed to login',
      userdata: null,
    });
  }
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json({
      success: true,
      message: 'Profile fetched successfully',
      status: 'Profile fetched successfully',
      userdata: req.user,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to fetch profile',
      status: 'Failed to fetch profile',
      userdata: null,
    });
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).clearCookie('accessToken').json({
      success: true,
      message: 'Logout successful',
      status: 'Logout successful',
      userdata: null,
    });
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: 'Failed to logout',
      status: 'Failed to logout',
      userdata: null,
    });
  }
};

export { registerUser, loginUser, getProfile, logoutUser };
