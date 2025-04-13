const express = require("express");
const router = express.Router();
const { db } = require("../db/queries")
const session = require("express-session");

//this file serves as a rest API for login info
router.post("/login", async (req, res)=>{ //login with existing account
    try{
        const { username, password } = req.body;
        const retrievedPassword = await db.getUserPassword(username); //THIS IS A BIG SECURITY RISK!!!! I HAVE NOT ENCRYPTED THE PASSWORDS HERE!!!! 
        // DO NOT STORE YOUR REAL LIFE LOGIN INFO ON MY SITE!!!!
        if (retrievedPassword === password) {
            req.session.username = username;
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
router.get("/currentUser", async (req, res) =>{ //Listen, I know this is a "login" API, but I'm also including a "get current user" API because I'm lazy and don't want to make a separate file for it
    try{
        const username = req.session.username;
        return res.json({ username });
    }
    catch{
        return res.status(500).json({ message: "Error fetching session info" });
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
        req.session.username = username; 
        return res.status(201).json({ message: "Logged in as: " + username });
    }
    catch(err){
        console.error(err);
        return res.status(500).json({ message: "Error creating account" });
    }
})

module.exports = router;