const mongoose = require("mongoose");
const toursSchema = mongoose.Schema(
  {
    city: {
      type: String,
      require: true,
    },
    state: {
      type: String,
      require: true,
    },
    date: {
      type: Date,
      require: true,
    },
    pincode: {
      type: Number,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("tours", toursSchema);
