//This page is meant for adding a new pokemon to a user's database

import { useState } from "react";

export default function CreatePage(){
    const [pokemonAlert, setPokemonAlert] = useState(null);
    const addToDatabase = (async (pokemonForm) =>{
        
        pokemonForm.preventDefault();
        
        //This function is meant to add a new pokemon to the user's database
        try{
            const form = pokemonForm.target;
            const pokemonName = form.name.value;
            try{
                const checkIfPokemonExists = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
                if(!checkIfPokemonExists.ok){
                    setPokemonAlert("Pokemon does not exist, please try again");
                    return;
                }
                setPokemonAlert("Pokemon exists! Adding to database")
            }
            catch(err){
                setPokemonAlert("Error checking pokemon: ", err);
            }
            const pokemonDescription = form.description.value; 


            const response = await fetch("http://localhost:8080/api/addPokemon", {
                method: "POST", 
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                body: JSON.stringify({ pokemon: pokemonName, pokemonDescription: pokemonDescription}),
            })
            const result = await response.json();
            if(response.ok){    
                console.log("Pokemon Successfully added");
            }
            else{
                console.log("Error occured in adding pokemon, response !=ok, error: ", result.message)
            }
        }
        catch(err){
            console.log("Error in adding pokemon, caught error: ", err);
        }
        
    })
    return(
        <div>
            <h1> Add a new Pokémon to your collection! </h1>
            <form className="CreatePokemonForm" onSubmit={addToDatabase}>
                <label> Name: </label>
                <input type="text" name="name" placeholder="Enter the name of the Pokémon"/>
                <label> Description: </label>
                <textarea name="description" placeholder="Enter a brief description of the Pokémon"/>
                <button type="submit" className="CreatePokemonButton">Create</button>
                <h3>{pokemonAlert}</h3>
            </form>
        </div>
    )
}