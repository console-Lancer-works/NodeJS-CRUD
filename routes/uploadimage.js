const express = require("express");
const router = express.Router();
const Images = require("../models/image");
const checkAuth = require("../middleware/requirelogin");
const { response } = require("express");

router.post("/saveimage", (req, res) => {
  const { image } = req.body;
  if (!image) {
    res.status(422).json({ err: "all fields are required to fill" });
  } else {
    const images = new Images({
      image: image,
    });
    images
      .save()
      .then((image) => {
        res.status(200).json({ message: "saved successfully", image: image });
      })
      .catch((err) => console.log(err));
  }
});

router.get("/allimages", (req, res) => {
  Images.find()
    .then((data) => {
      if (res.length < 0) {
        return res.status(400).JSON({ err: "image not found" });
      }
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => console.log(err));
});

router.delete("/delete", (req, res) => {
  Images.findOne({ _id: req.body.id })
    .then((img) => {
      if (!img) {
        return res.status(400).json({ err: "not found" });
      } else {
        img
          .remove()
          .then((data) => {
            res.json(data);
          })
          .catch((err) => {
            console.log("err");
          });
      }
    })
    .catch((err) => console.log(err));
});
module.exports = router;
