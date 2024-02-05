const express = require("express");
const Router = express.Router();

// Entry point of all the api

Router.use("/api", require("./api/index"));

module.exports = Router;
