const fs = require("fs");
const yup = require("yup");
const userSchema = yup.object().shape({
  name: yup.string().required(),
  mail: yup.string().email(),
  document: yup.number().required().positive().integer().min(11),
  phone: yup.number().required().positive().integer().min(11),
});

const get = (req, res) => {
  fs.readFile("./db.json", { encoding: "utf8", flag: "r" }, (err, data) => {
    res.send(data);
  });
};

const create = async (req, res) => {
  const bodyRequest = req.body;
  const accountsFileData = JSON.parse(fs.readFileSync("./db.json", "utf8"));

  const user = {
    name: bodyRequest.name,
    mail: bodyRequest.mail,
    document: bodyRequest.document,
    phone: bodyRequest.phone,
    status: bodyRequest.status,
  };

  const isValid = await userSchema.isValid(user);
  if (isValid) {
    accountsFileData.push(user);
    fs.writeFile("./db.json", JSON.stringify(accountsFileData), (err) => {
      err ? console.log("error: ", err) : console.log("user created");
    });
    return res.status(201).json(accountsFileData);
  } else {
    console.log("Error, you must to ");
  }
};

const edit = async (req, res) => {
  fs.readFile(
    "./db.json",
    { encoding: "utf8", flag: "r" },
    async (error, users) => {
      users = JSON.parse(users);
      let bodyRequest = req.body;
      const user = req.params.id;
      const account = users[user];
      const isValid = await userSchema.isValid(account);

      if (!account) {
        res.status(404).json({ error: "User doesn't exists" });
      }

      if (isValid) {
        users[user] = bodyRequest;
      } else {
        return console.log("Error: Please, input valid info");
      }

      fs.writeFile("./db.json", JSON.stringify(users), (err, data) => {
        if (err) {
          console.log(err);
        } else {
          return res.status(201).json(data);
        }
      });
      res.send(users);
    }
  );
};

module.exports = { get, create, edit };
