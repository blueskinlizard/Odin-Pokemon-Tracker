//This page is meant for adding a new pokemon to a user's database

import { useState } from "react";

export default function SignUp(){
    const [formType, changeFormType] = useState("SignUp"); //Set default value to sign up page
    const addToDatabase = (async (profileForm) =>{
        profileForm.preventDefault();
        const form = profileForm.target;
        const profileName  = form.name.value;
        const profilePassword = form.password.value;  
        //This function is meant to add a new pokemon to the user's database
        if(formType == "SignUp"){ //Here we just check whether user decided to sign in or sign up, and change the api call accordingly
            try{
                const response = await fetch("http://localhost:8080/api/signUp", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({ username: profileName, password: profilePassword}),
                })
                const result = await response.json();
                if(response.ok){
                    console.log("Profile Successfully added, more specifically: ", result.message);
                    console.log("Fetching current user..");
                    try {
                        const userResponse = await fetch("http://localhost:8080/api/currentuser", { 
                            method: "GET",
                            credentials: "include", 
                        });
                        const userData = await userResponse.json();
                        console.log("Logged in user:", userData.username);
                    } catch (err) {
                        console.error("Error getting logged-in user:", err);
                    }
                }
                else{
                    console.log("Error occured in adding profile, response !=ok, error: ", result.message)
                }
            }
            catch(err){
                console.log("Error in adding profile, caught error: ", err);
            }
        }
       if(formType == "SignIn"){
        try{
            const response = await fetch("http://localhost:8080/api/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ username: profileName, password: profilePassword}),
            })
            const result = await response.json();
            if(response.ok){
                console.log("Succesfully logged in, more specifically: ", result.message);
                try {
                    const userResponse = await fetch("http://localhost:8080/api/currentuser", { 
                        credentials: "include", 
                    });
                    const userData = await userResponse.json();
                    console.log("Logged in user:", userData.username);
                } catch (err) {
                    console.error("Error getting logged-in user:", err);
                }
            }
            else{
                console.log("Error occured in logging in, response !=ok, error: ", result.message)
            }
        }
        catch(err){
            console.log("Error in logging in, caught error: ", err);
        }
       }
        
    })
        if(formType == "SignUp"){
        return(
            <div>
                <h1> Sign up: </h1>
                <form className="CreateProfileForm" onSubmit={addToDatabase}>
                    <label> Name: </label>
                    <input type="text" name="name" placeholder="Enter your username"/>
                    <label> Password: </label>
                    <input type="text" name="password" placeholder="Enter your password(not secure)"></input>
                    <button type="submit" className="CreateProfileButton">Create</button>
                </form>
                <p className="signInText" onClick={(() =>{changeFormType("SignIn")})}>Sign in</p>
            </div>
        )
    }
    else if(formType == "SignIn"){
        return (
            <div>
                <h1> Sign In: </h1>
                <form className="SignInForm" onSubmit={addToDatabase}>
                    <label> Name: </label>
                    <input type="text" name="name" placeholder="Enter your username"/>
                    <label> Password: </label>
                    <input type="text" name="password" placeholder="Enter your password(not secure)"></input>
                    <button type="submit" className="CreateProfileButton">Create</button>
                </form>
                <p className="signInText" onClick={(() =>{changeFormType("SignUp")})}>Sign up</p>
            </div>
        )
    }
    
}