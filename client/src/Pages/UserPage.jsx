import { useEffect, useState } from "react";
import WebsiteProvider from "../Management/WebsiteContext";
import { useContext } from "react";
import DisplayCard from "../Components/DisplayCard";

export default function UserPage(){
    const user = useContext(WebsiteProvider);
    const [userPokemon, setUserPokemon] = useState();
    useEffect(() =>{ //Fetches user pokemon owned. Username provided by context API
        const fetchUserPokemon = async () => {
            const response = await fetch(`/api/getPokemon/${user}`);
            const data = await response.json();
            setUserPokemon(data);
        }
        fetchUserPokemon();
    }, [user])
    useEffect(() =>{

    })

    return(
        <div>
            <h1>{user}'s Pokemon Collection:</h1>
        {
            userPokemon.map((pokemon) =>{
                return(
                    <DisplayCard key={pokemon.pokemonName} name={pokemon.pokemonName} />
                )
            })
        }
        </div>
        
    )
}