const { query } = require("express");
const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

//Routes

//get all users method
app.get("/accounts", async (req, res) => {
  try {
    const getUsers = await pool.query("SELECT * FROM users_data");
    console.log(getUsers);
    res.json(getUsers.rows);
  } catch (err) {
    console.error(err);
  }
});
//post a user method
app.post("/accounts", async (req, res) => {
  try {
    const text =
      'INSERT INTO users_data("user_name", "user_mail", "user_document", "user_phone", "user_status") VALUES($1, $2, $3, $4, $5) RETURNING *';
    const data = [
      req.body.name,
      req.body.mail,
      req.body.document,
      req.body.phone,
      req.body.status,
    ];
    const sendNewUser = await pool.query(text, data);
    res.json(sendNewUser.rows);
  } catch (err) {
    console.error(err.message);
  }
});
//git checkout <sua-branch> && git pull origin <sua-branch>
//put(edit) a user method

app.listen(5550, () => {
  console.log("Server is running on port 5550");
});
