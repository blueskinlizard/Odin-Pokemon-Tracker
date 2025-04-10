const Pool = require("pg");

module.exports = new Pool({
    host: "localhost", 
    user: process.env.DB_USER,
    database: "pokemon_tracker_database",
    password: process.env.DB_PASSWORD,
    port: 5432 
  });
