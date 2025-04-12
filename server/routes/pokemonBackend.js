const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
//this file serves as a rest API for fetching and adding Pokemon Info
router.post("/getPokemon", async (req,res) =>{
    try{
        const { userName } = req.body;
        if(!username){
            throw new Error("username is required");
        }
        const ownedPokemon = await db.getAllPokemon(username);
        return res.json(ownedPokemon);
    }
    catch(err){
        console.error(err);
        return res.status(401).json("Error fetching Pokemon");
    }
    

})
