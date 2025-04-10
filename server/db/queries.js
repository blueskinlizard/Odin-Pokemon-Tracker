const pool = require("./pool");

async function getAllPokemon(userID){
    const { ownedPokemon } = await pool.query("SELECT pokemonOwned FROM uservalues WHERE userID = $1", [userID]);
    return ownedPokemon;
}

async function addPokemonUser(pokemonToAdd, userID) {
    await pool.query("UPDATE uservalues SET pokemonOwned = array_append(pokemonOwned, $1) WHERE userID = $2", [pokemonToAdd, userID]);
}

async function setPokemonDescription(pokemonToChange, description, userID) {
    await pool.query("INSERT INTO pokemon_descriptions (userID, pokemonID, pokemonDescription) VALUES ($1, $2, $3)", [userID, pokemonToChange, description]);
}

async function getPokemonDescription(pokemonToRetrieve, userID){
    const { pokemonDescription } = await pool.query("SELECT pokemonDescription FROM pokemon_descriptions WHERE userID = $1 AND pokemonID = $2", [userID, pokemonToRetrieve]);
    return pokemonDescription;
}

async function getUserPassword(userName){
    const { password } = await pool.query("SELECT userPassword from userValues WHERE userName = $1", [userName]);
    return password;
}
//idea is that we enter the pokemon name on the fontend, which react will try to fetch from pokemon API.
// When fetched, we will set an image component along with the user inputted description