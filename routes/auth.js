const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const User = require("../models/user");
const bcrypt = require("bcryptjs");
const { JWT_SECRET } = require("../keys");
const jwt = require("jsonwebtoken");

router.post("/signup", (req, res) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return res.status(422).json({ error: "please fill all the fields" });
  }
  User.findOne({ email })
    .then((saveduser) => {
      if (saveduser) {
        res.status(422).json({ error: "user exists" });
      } else {
        bcrypt
          .hash(password, 12)
          .then((hashedpassword) => {
            const user = new User({
              name,
              email,
              password: hashedpassword,
            });
            user.save().then((user) => {
              res.status(200).json({ message: "successfull", data: user });
            });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

router.post("/login", (req, res) => {
  const { password, email } = req.body;
  if (!email || !password) {
    return res.status(422).json({ error: "please fill all the fields" });
  } else {
    User.findOne({ email: email })
      .then((userexists) => {
        if (!userexists) {
          return res.status(422).json({ error: "email not exists" });
        }
        bcrypt
          .compare(password, userexists.password)
          .then((match) => {
            if (!match) {
              return res
                .status(422)
                .json({ error: "Invalid Email or password" });
            }
            const token = jwt.sign({ id: userexists._id }, JWT_SECRET);
            const { _id, name, email } = userexists;
            res.status(200).json({
              message: "successfull",
              token: token,
              user: {
                _id,
                name,
                email,
              },
            });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});

module.exports = router;
