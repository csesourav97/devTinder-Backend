const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
    },
    lastName: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      lowercase: true,
      unique: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    age: {
      type: Number,
      min: 18,
    },
    gender: {
      type: String,
      validate(value) {
        if (!["male", "female", "others"].includes(value)) {
          throw new Error("Gender data is not valid !");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://media.istockphoto.com/id/1459664492/sv/vektor/default-avatar-profile-user-profile-icon-profile-picture-portrait-symbol-user-member-people.jpg?s=170667a&w=0&k=20&c=57_LnlTQWdZhouMUxsxHGVVKMJYA4IjyK9VrF9r_JUg=",
    },
    about: {
      type: String,
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

const user = mongoose.model("User", userSchema);

module.exports = user;
