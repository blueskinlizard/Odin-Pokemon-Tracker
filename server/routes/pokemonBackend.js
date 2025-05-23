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
        if (!pokemonDescription) {
            return res.status(404).json({ message: "Description Not Found" });
        }
        return res.json({ pokemonDescription }); 

    }
    catch(err){
        console.log("Caught backend error in fetchPokemonDescription: ", err);
    }
})
router.post("/removePokemon", async(req, res)=>{
    try{
        const { pokemonToRemove } = req.body;
        console.log("Session username before deleting pokemon: ", req.session.username);
        const username = req.session.username;
        await db.removePokemon(username, pokemonToRemove);
        return res.status(201).json("Pokemon Removed Successfully");
    }
    catch(err){
        console.log("Pokemon Removal Error: ", err);
    }
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
        console.log("Added Pokemon(s): ("+pokemon+") to user:" + req.session.username);
        await db.setPokemonDescription(pokemon, pokemonDescription, req.session.username); //this adds the description to the pokemon_descriptions database table
        return res.status(201).json("Pokemon added")
    
})

module.exports = router;