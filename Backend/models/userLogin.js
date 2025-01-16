import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    requiredd: true,
    unique: true,
    minlength: 4,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/^\S+@\S+\.\S+$/, "Please enter a valid email address"],
  },

  password: {
    type: String,
    required: true,
    minlength: 8,
  },
});

const User = mongoose.model("User", userSchema);

export default User;
