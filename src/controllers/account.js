const fs = require("fs");
const db = require("../db.json");
const get = (req, res) => {
  fs.readFile("./db.json", { encoding: "utf8", flag: "r" }, (err, data) => {
    res.send(data);
  });
};

const create = (req, res) => {
  const bodyRequest = req.body;
  const accountsFileData = JSON.parse(fs.readFileSync("./db.json", "utf8"));

  const user = {
    name: bodyRequest.name,
    mail: bodyRequest.mail,
    document: bodyRequest.document,
    phone: bodyRequest.phone,
    status: bodyRequest.status,
  };

  accountsFileData.push(user);
  fs.writeFile("./db.json", JSON.stringify(accountsFileData), (err) => {
    err ? console.log("error: ", err) : console.log("user created");
  });

  return res.status(201).json(accountsFileData);
};

const edit = (req, res) => {
  fs.readFile("./db.json", { encoding: "utf8", flag: "r" }, (error, users) => {
    users = JSON.parse(users);
    let bodyRequest = req.body;
    const user = req.params.id;
    const account = users[user];

    if (!account) {
      res.status(404).json({ error: "User doesn't exists" });
    }
    users[user] = bodyRequest;

    fs.writeFile("./db.json", JSON.stringify(users), (err, data) => {
      if (err) {
        console.log(err);
      } else {
        return res.status(201).json(data);
      }
    });
    res.send(users);
  });
};

module.exports = { get, create, edit };
