const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const db = require("./db.json");
const fs = require("fs");

const port = process.env.port || process.env.PORT || 5000;
const apiRoot = "/api";
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({ origin: /http:\/\/localhost/ }));
app.options("*", cors());

const router = express.Router();

router.get("/accounts", (req, res) => {
  return res.send(db);
});

router.post("/accounts", (req, res) => {
  const bodyRequest = req.body;
  const accountsFileData = JSON.parse(
    fs.readFileSync("./db.json", { encoding: "utf8", flag: "r" })
  );
  const user = {
    name: bodyRequest.name,
    mail: bodyRequest.mail,
    document: bodyRequest.document,
    phone: bodyRequest.phone,
    status: bodyRequest.status,
  };

  accountsFileData.push(user);
  fs.writeFileSync("./db.json", JSON.stringify(accountsFileData));
  return res.status(201).json(db);
});

router.put("/accounts/:id", (req, res) => {
  let users = JSON.parse(
    fs.readFileSync("./db.json", { encoding: "utf8", flag: "r" })
  );
  let bodyRequest = req.body;
  const user = req.params.id;
  const account = [
    ...users[user],
    (users[user].phone = `${users[user].phone.slice}`),
  ];

  if (!account) {
    res.status(404).json({ error: "User doesn't exists" });
  }

  users[user] = bodyRequest;
  fs.writeFileSync("./db.json", JSON.stringify(users));

  return res.status(201).json(users);
});
app.use(apiRoot, router);

app.listen(port, () => {
  console.log("Server is running...");
});
