const pool = require("./pool");

async function getAllPokemon(username){
    const { ownedPokemon } = await pool.query("SELECT * FROM (username)", [username]);
    return ownedPokemon;
}

async function addPokemon(username, pokemonIDAdded){
    await pool.query("INSERT (pokemonIDAddded) INTO (username) VALUES $1", [username, pokemonIDAdded]);
}