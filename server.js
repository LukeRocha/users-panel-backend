const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const package = require("./db.js");

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = "/api";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

const router = express.Router();

router.get("/accounts/", (req, res) => {
  return res.send(package);
});

app.use(apiRoot, router);

app.listen(port, () => {
  console.log("Server is running! :D");
});
