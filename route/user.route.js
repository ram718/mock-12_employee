const express = require("express");
const userRouter = express.Router();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { UserModel } = require("../model/user.model");

// Signup API
userRouter.post("/signup", async (req, res) => {
  const { email, password, confirm_password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      res.status(400).send({ msg: "User already exists" });
    } else {
      if (password == confirm_password) {
        bcrypt.hash(password, 5, async (err, hash) => {
          const user_data = new UserModel({
            email,
            password: hash,
          });
          await user_data.save();
          res.status(201).send({ msg: "User is registered successfully" });
        });
      } else {
        res.status(400).send({ msg: "Please recheck the password" });
      }
    }
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

// Login API
userRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findOne({ email });
    if (user) {
      bcrypt.compare(password, user.password, async (err, result) => {
        if (result) {
          res
            .status(200)
            .send({
              msg: "Login successfull",
              token: jwt.sign({ userID: user._id }, "masai"),
            });
        } else {
          res.status(400).send({ msg: "Wrong Credentials" });
        }
      });
    } else {
      res.status(400).send({ msg: "Please register first" });
    }
  } catch (err) {
    res.status(400).send({ msg: "Bad Request" });
  }
});

module.exports = { userRouter };
