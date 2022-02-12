// ? Here we are connenting database with the server
const Pool = require("pg").Pool;
// ? Information about database such as user, password, ports...
const pool = new Pool({
  user: "postgres",
  password: "anish",
  host: "localhost",
  port: 5432,
  database: "guardian_fitness",
});
// ?exporting pool fr queries
module.exports = pool;
