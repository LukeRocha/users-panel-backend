const pool = require("../postgres/db");
const yup = require("yup");
const userSchema = yup.object({
  user_name: yup.string().required(),
  user_mail: yup.string().email(),
  user_document: yup.string().required().min(11),
  user_phone: yup.string().required().min(11),
});

const get = async (req, res) => {
  try {
    const getUsers = await pool.query(
      "SELECT * FROM users_data ORDER BY id ASC"
    );
    res.json(getUsers.rows);
  } catch (err) {
    console.error(err);
  }
};

const create = async (req, res) => {
  const queryText =
    'INSERT INTO users_data("user_name", "user_mail", "user_document", "user_phone", "user_status") VALUES($1, $2, $3, $4, $5) RETURNING *';
  const isValid = await userSchema.isValid(req.body);

  const newUser = [
    req.body.user_name,
    req.body.user_mail,
    req.body.user_document,
    req.body.user_phone,
    req.body.user_status.toLowerCase(),
  ];

  try {
    if (isValid) {
      const sendNewUser = await pool.query(queryText, newUser);
      res.json(sendNewUser.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

const edit = async (req, res) => {
  const queryText =
    "UPDATE users_data SET user_name = ($1), user_mail = ($2), user_document =($3), user_phone = ($4), user_status = ($5) WHERE id  = ($6)";
  const isValid = await userSchema.isValid(req.body);
  try {
    if (isValid) {
      const updateUsers = await pool.query(queryText, [
        req.body.user_name,
        req.body.user_mail,
        req.body.user_document,
        req.body.user_phone,
        req.body.user_status.toLowerCase(),
        req.params.id,
      ]);
      const result = await pool.query("SELECT * FROM users_data ORDER BY id");
      res.send(result.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

module.exports = { get, create, edit };
