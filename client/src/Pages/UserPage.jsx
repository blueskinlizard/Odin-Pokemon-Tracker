import { useState } from "react";
import WebsiteProvider from "../Management/WebsiteContext";
import { useContext } from "react";
import DisplayCard from "../Components/DisplayCard";

export default function UserPage(){
    const [user] = useState(useContext(WebsiteProvider));
    const [userPokemon] = useState(async () =>{
        await fetch('/api/getPokemon').then(response => response.json())
    });
    return(
        <div>
            <h1>{user}'s Pokemon Collection:</h1>
        {
            userPokemon.map((pokemon) =>{
                return(
                    <DisplayCard key={pokemon.pokemonName} name={pokemon.pokemonName}/>
                )
            })
        }
        </div>
        
    )
}