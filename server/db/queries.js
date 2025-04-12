const pool = require("./pool");

async function getAllPokemon(userID){
    const { ownedPokemon } = await pool.query("SELECT pokemonOwned FROM uservalues WHERE userID = $1", [userID]);
    return ownedPokemon;
}

async function addPokemonUser(pokemonToAdd, username) {
    await pool.query("UPDATE uservalues SET pokemonOwned = array_append(pokemonOwned, $1) WHERE username = $2", [pokemonToAdd, username]);
}

async function setPokemonDescription(pokemonToChange, description, username) {
    await pool.query("INSERT INTO pokemon_descriptions (username, pokemonID, pokemonDescription) VALUES ($1, $2, $3)", [username, pokemonToChange, description]);
}

async function getPokemonDescription(pokemonToRetrieve, username){
    const { pokemonDescription } = await pool.query("SELECT pokemonDescription FROM pokemon_descriptions WHERE username = $1 AND pokemonID = $2", [username, pokemonToRetrieve]);
    return pokemonDescription;
}
async function addUser(username, password){
    await pool.query("INSERT INTO users (username, userpassword) VALUES ($1, $2)", [username, password]);
}
async function getUser(userName){
    const { user } = await pool.query("SELECT * FROM users WHERE username = $1", [userName]);
    return user;
}
async function getUserPassword(userName){
    const { password } = await pool.query("SELECT userPassword from userValues WHERE userName = $1", [userName]);
    return password;
}

async function insertPokemonAttribute(pokemonToAdd, pokemonID){
    await pool.query("INSERT INTO pokemon_attributes (pokemonToAdd, pokemonID) VALUES ($1, $2)", [pokemonToAdd, pokemonID]);
}

module.exports = {
    getAllPokemon,
    addPokemonUser,
    setPokemonDescription,
    getPokemonDescription,
    getUserPassword,
    insertPokemonAttribute,
    getUser,
    addUser,
}
//idea is that we enter the pokemon name on the fontend, which react will try to fetch from pokemon API.
// When fetched, we will set an image component along with the user inputted description.