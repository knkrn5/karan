import { Request, Response } from 'express';
import { User } from '../models/user.model.js';
import { apiResponse } from '../utils/apiResponse.js';

const registerUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const { firstName, lastName, email, password } = req.body;

    // check if user already exists
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      res.status(409).json(new apiResponse(false, 'User already exists', null));
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

    res.status(201).json(new apiResponse(true, 'User created successfully', userInfo));
  } catch (error: any) {
    res.status(500).json(new apiResponse(false, 'Failed to create user', null));
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });

    if (!user) {
      res.status(400).json(new apiResponse(false, 'User not found, please sign up', null));
      return;
    }

    const isPasswordMatch = await user.comparePassword(password);

    if (!isPasswordMatch) {
      res.status(400).json(new apiResponse(false, 'Invalid password', null));
      return;
    }

    const loggedInUserInfo = await User.findById(user._id).select('-password -__v');

    // Generating new access token dynamically
    const accessToken = user.createAccessToken();

    res.status(200).cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: true,
      // sameSite: 'strict',
      sameSite: 'none',
      maxAge: 24 * 60 * 60 * 1000,
    });
    res.status(200).json({
      ...new apiResponse(true, 'Login successful', loggedInUserInfo),
      accessToken,
    });
  } catch (error: any) {
    res.status(500).json(new apiResponse(false, 'Failed to login', null));
  }
};

const getProfile = async (req: Request, res: Response): Promise<void> => {
  try {
    res.status(200).json(new apiResponse(true, 'Profile fetched successfully', req.user));
  } catch (error: any) {
    res.status(500).json(new apiResponse(false, 'Failed to fetch profile', null));
  }
};

const logoutUser = async (req: Request, res: Response): Promise<void> => {
  try {
    res
      .status(200)
      .clearCookie('accessToken', {
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .json(new apiResponse(true, 'Logout successful', null));
  } catch (error: any) {
    res.status(500).json(new apiResponse(false, 'Failed to logout', null));
  }
};

export { registerUser, loginUser, getProfile, logoutUser };
