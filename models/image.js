const mongoose = require("mongoose");
const imageSchema = mongoose.Schema(
  {
    image: {
      type: String,
      require: true,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("image", imageSchema);
