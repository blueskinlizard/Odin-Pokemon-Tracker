const express = require("express");
const router = express.Router();
const  db  = require("../db/queries")
const session = require("express-session");
//this file serves as a rest API for fetching and adding Pokemon Info
router.get("/getPokemon/:username", async (req,res) =>{
    try{
        const { username } = req.params;
        const ownedPokemon = await db.getAllPokemon(username);
        return res.json(ownedPokemon);
    }
    catch(err){
        console.error(err);
        return res.status(401).json("Error fetching Pokemon");
    }
})
router.get("/pokemonDescription/:username/:pokemonToFetch", async(req, res) =>{
    try{
        const { username, pokemonToFetch} = req.params;
        const pokemonDescription = await db.getPokemonDescription(pokemonToFetch, username);
        return res.json(pokemonDescription);
    }
    catch{}
})
router.post("/addPokemon", async (req,res) =>{
        console.log("Session username before adding pokemon:", req.session.username);
        if (!req.session.username) {
            console.log("No session username found");
            return res.status(401).json({ message: "User not logged in" });
        }
        const { pokemon, pokemonDescription } = req.body; 
        if (!pokemon || !pokemonDescription) {
            return res.status(400).json({ error: "Missing required fields: 'pokemon' or 'pokemonDescription'" });
          }
        await db.addPokemonUser(pokemon, req.session.username); //ERROR LIKELY HERE, PARAMETERS ARE CAUSING UNDEFINED RETURN ERROR
        console.log("Added Pokemon(s): "+pokemon+"to user:" + req.session.username);
        await db.setPokemonDescription(pokemon, pokemonDescription, req.session.username); //this adds the description to the pokemon_descriptions database table
        return res.status(201).json("Pokemon added")
    
})

module.exports = router;