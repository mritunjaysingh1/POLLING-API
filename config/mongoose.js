require("dotenv").config();
const mongoose = require("mongoose");

mongoose.connect(process.env.DB_URL);

const db = mongoose.connection;

db.on("error", console.error.bind(console, "Error connecting to database"));

db.once("open", () => {
  console.log("Connected to :: MONGODB");
});

module.exports = mongoose;
