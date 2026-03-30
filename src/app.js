const express = require("express");
const connectDB = require("./config/database");
const User = require("./models/user");
const { validateSignUpData } = require("./utils/validator");
const bcrypt = require("bcrypt");

const app = express();

app.use(express.json());

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email });

    if (!user) {
      throw new Error("Invalid Credentials!");
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (isPasswordValid) {
      res.send("Login Successful !!!");
    } else {
      throw new Error("Invalid Credentials!");
    }
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.post("/signup", async (req, res) => {
  try {
    validateSignUpData(req);

    const { firstName, lastName, email, password } = req.body;

    const passwordhash = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password: passwordhash,
    });
    await user.save();
    res.send("User Added Successfully !");
  } catch (err) {
    res.status(400).send("Error :" + err.message);
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body.email;
  try {
    const users = await User.find({ email: userEmail });
    if (users.length === 0) {
      res.status(404).send("User not found !");
    } else {
      res.send(users);
    }
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.send(users);
  } catch (err) {
    res.status(400).send("Something went wrong !");
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;

  try {
    const user = await User.findByIdAndDelete({ _id: userId });

    res.send(" User deleted successfully !!");
  } catch (err) {
    res.status(400).send("Something went wrong !!");
  }
});

app.patch("/user", async (req, res) => {
  const userId = req.body.userId;
  const data = req.body;

  try {
    const user = await User.findByIdAndUpdate({ _id: userId }, data, {
      runValidators: true,
    });
    res.send("User updated successfully !");
  } catch (err) {
    res.status(400).send("Something went wrong:" + err.message);
  }
});

connectDB()
  .then(() => {
    console.log("DB connection established");
    app.listen(3000, () => {
      console.log("server is listening to port 3000");
    });
  })
  .catch((error) => {
    console.error("DB connection failed");
  });
