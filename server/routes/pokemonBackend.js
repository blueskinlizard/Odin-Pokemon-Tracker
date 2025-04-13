const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
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
    try{
        const { pokemon, username } = req.body; //username is provided by React Context hook
        if (!pokemon || !username) {
            return res.status(400).json({ error: "Missing required fields: 'pokemon' or 'username'" });
          }
        await db.addPokemonUser(pokemon, username);
        console.log("Added Pokemon(s): "+pokemon+"to user:" +username);
        return res.status(201).json("Pokemon added")
    }
    catch(err){
        return res.status(401).json("Error adding Pokemon");
    }
})

module.exports = router;