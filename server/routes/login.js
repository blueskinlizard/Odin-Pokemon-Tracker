const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
//this file serves as a rest API for login info
router.post("/login", async (req, res)=>{ //login with existing account
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
router.post("/signup", async (req, res)=>{
    try{
        const { username, password } = req.body;
        const fetchedUser = await db.getUser(username);
        if(!password){
            return res.status(400).json({ message: "Password is required" });
        }
        if (fetchedUser) {
            return res.status(401).json({ message: "Username already exists" });
        }
        await db.addUser(username, password);
        return res.status(201).json({ message: "Account created" });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Error creating account" });
    }
})

module.exports = {
    router
};