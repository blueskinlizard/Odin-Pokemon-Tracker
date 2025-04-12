const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
//this file serves as a rest API for fetching and adding Pokemon Info
router.post("/getPokemon", async (req,res) =>{
    try{
        const { username } = req.body; //username is provided by React Context hook
        const ownedPokemon = await db.getAllPokemon(username);
        return res.json(ownedPokemon);
    }
    catch(err){
        console.error(err);
        return res.status(401).json("Error fetching Pokemon");
    }
})

router.post("/addPokemon", async (req,res) =>{
    try{
        const { pokemon, username } = req.body; //username is provided by React Context hook
        await db.addPokemonUser(pokemon, username);
        console.log("Added Pokemon(s): "+pokemon+"to user:" +username);
        return res.status(201).json("Pokemon added")
    }
    catch(err){
        return res.status(401).json("Error adding Pokemon");
    }
})

module.exports = router;