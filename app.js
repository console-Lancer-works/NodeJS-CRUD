const express = require("express");
const app = express();
const mongoose = require("mongoose");
const { MONGOURI } = require("./keys");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./routes/user");
const Auth = require("./routes/auth");
const Tours = require("./routes/tours");
app.use(cors());
mongoose.connect(MONGOURI, { useNewUrlParser: true, useUnifiedTopology: true });
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
mongoose.connection.on("connected", () => {
  console.log("mongo connection establish successfully");
});
mongoose.connection.on("error", () => {
  console.group("Mongoose connection failed");
});

app.use("/user", User);
app.use("/auth", Auth);
app.use("/tour", Tours);
app.listen(4000, () => {
  console.log("server is running");
});
