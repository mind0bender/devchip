import { type Document, type Model, model, models, Schema } from "mongoose";

export interface UserType extends Document {
  name: string;
  username: string;
  avatar_url: string;
  html_url: string;
  total_repos: number;
  commit_count: number;
  followers: number;
  star_gazers_count: number;
  created_at: Date;
}

const UserSchema = new Schema<UserType>({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  avatar_url: String,
  html_url: {
    type: String,
    required: false,
  },
  total_repos: Number,
  commit_count: Number,
  followers: Number,
  star_gazers_count: Number,
  created_at: Number,
});

const User: Model<UserType> =
  models.User || model<UserType>("User", UserSchema);
export default User;
