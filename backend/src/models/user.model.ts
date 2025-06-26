import mongoose, { Types } from 'mongoose';
// import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

import { ContactModel } from './contact.model.js';
import { ChatbotModel } from './chatbot.model.js';
import { ProjectModel } from './projects.models.js';

export interface IUser extends mongoose.Document {
  _id: Types.ObjectId;
  firstName: string;
  lastName?: string;
  email: string;
  password: string;
  refreshToken?: string;
  comparePassword(enteredPassword: string): Promise<boolean>;
  createAccessToken(): string;
  createRefreshToken(): string;
}

const userSchema = new mongoose.Schema(
  {
    firstName: { type: String, required: true },
    lastName: { type: String },
    email: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

//middleware for hashing password
// userSchema.pre('save', async function (next) {
//   if (!this.isModified('password')) return next();
//   const salt = await bcrypt.genSalt(10);
//   this.password = await bcrypt.hash(this.password, salt);
//   next();
// });

// userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
//   return await bcrypt.compare(enteredPassword, this.password);
// };

// userSchema.methods.createAccessToken = function (): string {
//   return jwt.sign(
//     { userId: this._id, email: this.email },
//     process.env.ACCESS_TOKEN_SECRET as string,
//     { expiresIn: '10m' }
//   );
// };

// userSchema.methods.createRefreshToken = function (): string {
//   return jwt.sign({ userId: this._id }, process.env.REFRESH_TOKEN_SECRET as string, {
//     expiresIn: '7d',
//   });
// };

//middleware for deleting complete user data
userSchema.pre('findOneAndDelete', async function (next) {
  try {
    const user = await this.model.findOne(this.getFilter());
    if (user) {
      await ContactModel.deleteOne({ user: user._id });
      await ChatbotModel.deleteOne({ user: user._id });
      await ProjectModel.updateMany(
        {},
        {
          $pull: { likeDislikeInteractions: { user: user._id } }
        });
    }
    next();
  } catch (err) {
    next(err as mongoose.CallbackError);
  }
});

export const UserModel = mongoose.model<IUser>('User', userSchema);
