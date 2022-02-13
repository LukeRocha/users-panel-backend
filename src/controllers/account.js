const pool = require("../postgres-api/db");
const yup = require("yup");
const userSchema = yup.object().shape({
  name: yup.string().required(),
  mail: yup.string().email(),
  document: yup.number().required().positive().integer().min(11),
  phone: yup.number().required().positive().integer().min(11),
});

const get = async (req, res) => {
  try {
    const getUsers = await pool.query("SELECT * FROM users_data");
    res.json(getUsers.rows);
  } catch (err) {
    console.error(err);
  }
};

const create = async (req, res) => {
  const text =
    'INSERT INTO users_data("user_name", "user_mail", "user_document", "user_phone", "user_status") VALUES($1, $2, $3, $4, $5) RETURNING *';
  const user = [
    req.body.name,
    req.body.mail,
    req.body.document,
    req.body.phone,
    req.body.status,
  ];
  const isValid = await userSchema.isValid(user);
  console.log(isValid);
  try {
    const sendNewUser = await pool.query(text, user);
    res.json(sendNewUser.rows);
  } catch (error) {}
};

// const edit = async (req, res) => {
//   fs.readFile(
//     "./db.json",
//     { encoding: "utf8", flag: "r" },
//     async (error, users) => {
//       users = JSON.parse(users);
//       let bodyRequest = req.body;
//       const user = req.params.id;
//       const account = users[user];
//       const isValid = await userSchema.isValid(account);

//       if (!account) {
//         res.status(404).json({ error: "User doesn't exists" });
//       }

//       if (isValid) {
//         users[user] = bodyRequest;
//       } else {
//         return console.log("Error: Please, input valid info");
//       }

//       fs.writeFile("./db.json", JSON.stringify(users), (err, data) => {
//         if (err) {
//           console.log(err);
//         } else {
//           return res.status(201).json(data);
//         }
//       });
//       res.send(users);
//     }
//   );
// };

module.exports = { get, create };
