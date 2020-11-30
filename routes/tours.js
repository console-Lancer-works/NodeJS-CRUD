const express = require("express");
const router = express.Router();
const Tours = require("../models/tours");
const checkAuth = require("../middleware/requirelogin");

router.get("/alltours", checkAuth, (req, res) => {
  Tours.find()
    .then((tour) => {
      if (!tour) {
        res.status(422).json({ message: "no tour exists" });
      } else {
        res.status(200).json({ tours: tour });
      }
    })
    .catch((err) => {
      console.log(err);
    });
});
router.post("/addtour", checkAuth, (req, res) => {
  const { city, state, date, pincode } = req.body;
  if (!city || !state || !date || !pincode) {
    res.status(422).json({ err: "all fields are required to fill" });
  } else {
    Tours.findOne({ pincode: pincode })
      .then((pinexists) => {
        if (pinexists) {
          console.log(pinexists);
          return res.status(422).json({ err: "tour is already booked" });
        }
        const tour = new Tours({
          city,
          state,
          date,
          pincode,
        });
        tour
          .save()
          .then((tour) => {
            res.status(200).json({ message: "saved successfully", tour: tour });
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err));
  }
});
router.put("/edittour/:id", (req, res) => {
  const _id = req.params.id;
  Tours.findById(_id)
    .then((tour) => {
      if (!tour) {
        res.status(422).json({ err: "tour not exists" });
      } else {
        Tours.findByIdAndUpdate(_id, req.body, {
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
router.delete("/deletetour/:id", (req, res) => {
  const _id = req.params.id;
  Tours.find({ _id: _id })
    .then((tourexists) => {
      if (!tourexists) {
        res.status(422).json({ err: "not exists" });
      } else {
        Tours.findByIdAndDelete(_id)
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
