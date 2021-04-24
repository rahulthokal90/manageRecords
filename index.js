const express = require("express");
const app = express();

require("./startup/routes")(app);

const server = app.listen("5000", () =>
  console.log(`Listening on port...`)
);

module.exports = server;
