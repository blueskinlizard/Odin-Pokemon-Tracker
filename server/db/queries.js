const pool = require("./pool");
async function testConnection() {
    try {
        const res = await pool.query('SELECT NOW()');
        console.log('Database connected:', res.rows[0]);
    } catch (err) {
        console.error('Error connecting to the database:', err);
    }
}

testConnection();


async function getAllPokemon(username){
    const ownedPokemon  = await pool.query("SELECT pokemonOwned FROM uservalues WHERE username = $1", [username]);
    if (ownedPokemon.rows.length > 0) {
        return ownedPokemon.rows[0].pokemonowned; 
    }
    return null;
}

async function addPokemonUser(pokemonToAdd, username) {
    await pool.query("UPDATE uservalues SET pokemonOwned = array_append(pokemonOwned, $1) WHERE username = $2", [pokemonToAdd, username]);
}

async function setPokemonDescription(pokemonToChange, description, username) {
    await pool.query("INSERT INTO pokemon_descriptions (username, pokemonName, pokemonDescription) VALUES ($1, $2, $3)", [username, pokemonToChange, description]);
}

async function changePokemonDescription(pokemonToChange, description, username) {
    try{
        await pool.query( "UPDATE pokemon_descriptions SET pokemonDescription = $1 WHERE username = $2 AND pokemonName = $3", [description, username, pokemonToChange]);
    }catch(err){
        console.log("Error udating pokemon description:", err);
    }
}

async function getPokemonDescription(pokemonToRetrieve, username){
    const  pokemonDescription  = await pool.query("SELECT pokemonDescription FROM pokemon_descriptions WHERE username = $1 AND pokemonName = $2", [username, pokemonToRetrieve]);
    if (pokemonDescription.rows.length > 0) {
        return pokemonDescription.rows[0].pokemonDescription; 
    }
    return null;
}
async function addUser(username, password){
    await pool.query("INSERT INTO userValues (username, userpassword) VALUES ($1, $2)", [username, password]);
}
async function getUser(userName){
    const  user  = await pool.query("SELECT * FROM userValues WHERE username = $1", [userName]);
    if (user.rows.length > 0) {
        return user.rows[0]; 
    }
    if (user.rows.length === 0) {
        return null;  
    }
    else{
        return null;
    }
}
async function getUserPassword(userName){
    const  password  = await pool.query("SELECT userPassword from userValues WHERE userName = $1", [userName]);
    if (password.rows.length > 0) {
        return password.rows[0].userpassword; 
    }
    return null;
}

async function insertPokemonAttribute(pokemonToAdd, pokemonName){
    await pool.query("INSERT INTO pokemon_attributes (pokemonToAdd, pokemonName) VALUES ($1, $2)", [pokemonToAdd, pokemonName]);
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
    changePokemonDescription
}
//idea is that we enter the pokemon name on the fontend, which react will try to fetch from pokemon API.
// When fetched, we will set an image component along with the user inputted description.