const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db.json");
const accountController = require("./controllers/account");

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = "/api";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

const router = express.Router();

router.get("/accounts", accountController.get);

router.post("/accounts", accountController.create);

router.put("/accounts/:id", accountController.edit);
app.use(apiRoot, router);

app.listen(port, () => {
  console.log("Server is running...");
});
