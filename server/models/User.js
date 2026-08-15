// A Mongoose "model" describes the shape of a document in a MongoDB collection.
// This one describes what a "User" looks like in the database.
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true, // no two users can share an email
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true, // this will store a HASHED password, never the plain text
    },
  },
  { timestamps: true } // automatically adds createdAt / updatedAt fields
);

module.exports = mongoose.model("User", userSchema);
