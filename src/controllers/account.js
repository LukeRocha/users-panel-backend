const pool = require("../postgres-api/db");
const yup = require("yup");
const userSchema = yup.object({
  body: yup.object({
    user_name: yup.string().required(),
    user_mail: yup.string().email(),
    user_document: yup.number().required().positive().integer().min(11),
    user_phone: yup.number().required().positive().integer().min(11),
  }),
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
  const isValid = await userSchema.isValid({ body: req.body });
  const user = [
    req.body.user_name,
    req.body.user_mail,
    req.body.user_document,
    req.body.user_phone,
    req.body.user_status,
  ];

  console.log(isValid);
  try {
    if (isValid) {
      const sendNewUser = await pool.query(queryText, user);
      res.json(sendNewUser.rows);
    }
  } catch (error) {
    console.log(error);
  }
};

const edit = async (req, res) => {
  const queryText =
    "UPDATE users_data SET user_name = ($1), user_mail = ($2), user_document =($3), user_phone = ($4), user_status = ($5) WHERE id  = ($6) + 1";
  let id = parseInt(req.params.id);
  console.log(id);
  const isValid = await userSchema.isValid({ body: req.body });
  try {
    if (isValid) {
      await pool.query(queryText, [
        req.body.user_name,
        req.body.user_mail,
        req.body.user_document,
        req.body.user_phone,
        req.body.user_status,
        id,
      ]);
      res.json("updateUser");
    }
  } catch (err) {
    console.log(err);
  }
};

module.exports = { get, create, edit };
