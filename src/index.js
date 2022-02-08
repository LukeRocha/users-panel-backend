const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

app.listen(5555, () => {
  console.log("server is running on port 5555");
});
