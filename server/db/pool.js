const Pool = require("pg");

module.exports = new Pool({
    host: "localhost", 
    user: "postgres",
    database: "pokemon_tracker_database",
    password: "",
    port: 5432 
  });
