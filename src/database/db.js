const knex = require("knex")({
  client: "pg",
  connection: {
    user: "postgres",
    password: "postgres",
    database: "UOL-users-panel",
    host: "127.0.0.1",
    port: 5432,
  },
});

module.exports = { knex };
