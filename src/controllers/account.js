const db = require("./db");
const yup = require("yup");
const userSchema = yup.object({
  user_name: yup.string().required(),
  user_mail: yup.string().email(),
  user_document: yup.string().required().min(11),
  user_phone: yup.string().required().min(11),
});

const get = async (req, res) => {
  try {
    db.knex
      .select("*")
      .table("users_data")
      .where("is_deleted", null)
      .orderBy("id")
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    console.error(err);
  }
};

const create = async (req, res) => {
  const isValid = await userSchema.isValid(req.body);
  const newUser = [
    {
      user_name: req.body.user_name,
      user_mail: req.body.user_mail,
      user_document: req.body.user_document,
      user_phone: req.body.user_phone,
      user_status: req.body.user_status.toLowerCase(),
    },
  ];

  try {
    if (isValid) {
      const postNewUser = await db.knex
        .insert(newUser)
        .into("users_data")
        .then((response) => {
          console.log("User created: ", req.user_name);
        })
        .catch((err) => {
          console.log("Error", err);
        });
    }
  } catch (error) {
    console.log(error);
  }
};

const edit = async (req, res) => {
  const isValid = await userSchema.isValid(req.body);
  const updatedUser = {
    user_name: req.body.user_name,
    user_mail: req.body.user_mail,
    user_document: req.body.user_document,
    user_phone: req.body.user_phone,
    user_status: req.body.user_status.toLowerCase(),
    id: req.params.id,
  };

  try {
    if (isValid) {
      const updateUser = await db.knex
        .where({ id: req.params.id })
        .table("users_data")
        .update(updatedUser);
      const result = await db.knex
        .select("*")
        .table("users_data")
        .where("is_deleted", null)
        .orderBy("id")
        .then((data) => {
          res.json(data);
        });
      res.send(result);
    }
  } catch (error) {
    console.log(error);
  }
};

const softDelete = async (req, res) => {
  const updateSoftDelete = {
    is_deleted: "1",
  };

  try {
    const deleteUser = db.knex
      .where("id", req.params.id)
      .table("users_data")
      .update(updateSoftDelete)
      .then((data) => {
        res.json(data);
      });
  } catch (err) {
    console.log(error);
  }
};

module.exports = { get, create, edit, softDelete };
