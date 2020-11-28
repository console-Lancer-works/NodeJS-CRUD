const express = require("express");
const router = express.Router();
const User = require("../models/user");
const { findByIdAndUpdate } = require("../models/user");

router.get("/", (req, res) => {
  User.find()
    .then((user) => {
      if (!user) {
        res.status(422).json({ message: "no user exists" });
      } else {
        res.status(200).json({ user: user });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/", (req, res) => {
  const { name, qualification, email, college } = req.body;
  if (!name || !qualification || !email || !college) {
    res.status(422).json({ err: "all fields are required to fill" });
  } else {
    User.findOne({ email: email })
      .then((savedUser) => {
        if (savedUser) {
          return res.status(422).json({ error: "User Already exists." });
        } else {
          const user = new User({
            name,
            qualification,
            email,
            college,
          });
          user
            .save()
            .then((user) => {
              res
                .status(200)
                .json({ message: "saved successfully", user: user });
            })
            .catch((err) => console.log(err));
        }
      })
      .catch((err) => console.log(err));
  }
});
router.put("/:id", (req, res) => {
  const _id = req.params.id;
  User.findById(_id)
    .then((user) => {
      if (!user) {
        res.status(422).json({ err: "user not exists" });
      } else {
        User.findByIdAndUpdate(_id, req.body, {
          new: true,
          runValidators: true,
        })
          .then((result) => {
            res.status(200).json({ result: result });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});
router.delete("/:id", (req, res) => {
  const _id = req.params.id;
  User.find({ _id: _id })
    .then((useresists) => {
      if (!useresists) {
        res.status(422).json({ err: "not exists" });
      } else {
        User.findByIdAndDelete(_id)
          .then((result) => {
            res.status(200).json({ message: "successfully deleted" });
          })
          .catch((err) => console.log(err));
      }
    })
    .catch((err) => console.log(err));
});

module.exports = router;
//put wil update the whole document
//patch will update the single field in a document
