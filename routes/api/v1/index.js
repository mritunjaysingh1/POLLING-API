const express = require("express");
const Router = express.Router();

// Entry point of all api/v1/questions or options url's
Router.use("/question", require("./questions"));
Router.use("/options", require("./options"));

module.exports = Router;
