import mongoose, { Document } from "mongoose";

const Schema = mongoose.Schema;

export type UserDocument = Document & {
  username: string;
  email: string;
  googleId: string;
  profileImage:string
};

const userSchema = new Schema<UserDocument>({
  username: String,
  email: String,
  googleId: String,
  profileImage:String,
});

const User = mongoose.model<UserDocument>("User", userSchema);

export default User;
