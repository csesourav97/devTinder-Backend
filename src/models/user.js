const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      trim: true,
      minLength: 4,
      maxLength: 50,
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
      validate(value) {
        if (!validator.isEmail(value)) {
          throw new Error("Invalid Email address: " + value);
        }
      },
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
      validate(value) {
        if (!validator.isStrongPassword(value)) {
          throw new Error("Please enter a strong password !");
        }
      },
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
      default: "This is default about of the user !",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true },
);

userSchema.methods.getJWT = async function () {
  const user = this;

  const token = await jwt.sign({ _id: user._id }, "DEV@Tinder#1997", {
    expiresIn: "1d",
  });

  return token;
};

userSchema.methods.validatePassword = async function (passwordInputByUser) {
  const user = this;
  const passwordHash = user.password;
  const isPasswordValid = await bcrypt.compare(
    passwordInputByUser,
    passwordHash,
  );

  return isPasswordValid;
};

module.exports = mongoose.model("User", userSchema);
