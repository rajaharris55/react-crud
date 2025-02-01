const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const UserModel = require("./Models/Users");
const dotenv = require("dotenv");
const { all } = require("axios");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("Connected to mongo server"))
  .catch((err) => console.log(err));

app.post("/createuser", async (req, res) => {
  try {
    await UserModel.create(req.body)
      .then((users) => res.json(users))
      .catch((err) => res.json(err));
  } catch (err) {
    console.log("Could not create user");
  }
});

app.get("/allusers", async (req, res) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (err) {
    console.error("Error", err);
  }
});

app.get("/user/:id", async (req, res) => {
  try {
    const user = await UserModel.findById(req.params.id);
    if (!user) return console.log("User not found");
    res.json(user);
  } catch (error) {
    console.log(error);
  }
});

app.put("/updateuser/:id", async (req, res) => {
  try {
    const { name, email, age } = req.body;
    const updatedUser = await UserModel.findByIdAndUpdate(
      req.params.id,
      { name, email, age },
      { new: true }
    );
    if (!updatedUser) return res.json("User not found");
    res.json(updatedUser);
  } catch (error) {
    console.log(error);
  }
});

app.delete("/deleteuser/:id", async (req, res) => {
  try {
    const usertodelete = await UserModel.findByIdAndDelete(req.params.id);
  } catch (error) {
    (err) => console.log(err);
  }
});

app.listen(3000, (req, res) => {
  console.log("App listening on port 3000");
});
