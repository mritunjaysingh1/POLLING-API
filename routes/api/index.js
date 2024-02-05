const express = require("express");
const Router = express.Router();

// Entry point of all the api/v1 url's
Router.use("/v1", require("./v1/index"));

module.exports = Router;
