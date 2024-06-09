import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    fullName: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
      unique: true,
    },
    bio: {
      type: String,
    },
    password: {
      type: String,
      required: true,
      minLenght: 8,
    },
    gender: {
      type: String,
      required: true,
      enum: ["male", "female"],
    },

    avatar: {
      public_id: {
        type: String
      },
      avatar_url: {
        type: String
      }
    }
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
