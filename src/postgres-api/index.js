const express = require("express");
const app = express();
const pool = require("./db");

app.use(express.json());

//Routes

//get all users method

//post a user method
app.post("/accounts", async (req, res) => {
  try {
    const text =
      "INSERT INTO users_data2 VALUES ($1, $2, $3, $4, $5) RETURNING *";
    const data = [
      req.body.name,
      req.body.mail,
      req.body.document,
      req.body.phone,
      req.body.status,
    ];
    const sendNewUser = await pool.query(text, data);
    res.json(sendNewUser);
  } catch (err) {
    console.error(err.message);
  }
});

//put(edit) a user method

app.listen(5550, () => {
  console.log("Server is running on port 5550");
});
