const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  password: "postgres",
  database: "UOL-users-panel",
  host: "localhost",
  port: 5432,
});

module.exports = pool;

//o que é pool no postgres?
//pra que server o pool do postgres?
//o que signigicam os termos new e this?
