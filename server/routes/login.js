const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
//this file serves as a rest API for login info
router.post("/", async (req, res)=>{ 
    try{
        const { username, password } = req.body;
        const retrievedPassword = await db.getUserPassword(username); //THIS IS A BIG SECURITY RISK!!!! I HAVE NOT ENCRYPTED THE PASSWORDS HERE!!!! 
        // DO NOT STORE YOUR REAL LIFE LOGIN INFO ON MY SITE!!!!
        if (retrievedPassword === password) {
            res.json({ message: "Login successful" });
        }
        else{
            return res.status(401).json({ message: "Invalid credentials" });
        }
    }
    catch{
        return res.status(500).json({ message: "Error fetching data" });
    }
    
})