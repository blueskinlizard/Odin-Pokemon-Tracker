/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import WebsiteProvider from "../Management/WebsiteContext";
import { useParams } from "react-router-dom";
import DisplayCard from "../Components/DisplayCard";

export default function UserPage(){
    const { user } = useParams(); //Fetches what the username is via URL
    const [userPokemon, setUserPokemon] = useState();
    const [pokemonDescriptions, setPokemonDescriptions] = useState([]);
    useEffect(() =>{ //Fetches user pokemon owned. Username provided by context API
        const fetchUserPokemon = async () => {
            const response = await fetch(`http://localhost:8080/api/getPokemon/${user}`);
            const data = await response.json();
            setUserPokemon(data);
        }
        fetchUserPokemon();
    }, [user])
    useEffect(async () =>{
        const fetchUserDescriptions = async () => {
            const descriptionPromises = userPokemon.map(async (pokemon) =>{
                const response = await fetch(`http://localhost:8080/api/getDescription/${pokemon.pokemonName}`);
                const data = await response.json();
                return data;
            })
            const descriptions = await Promise.all(descriptionPromises);
            setPokemonDescriptions(descriptions);
        }
        const descriptions = await Promise.all(fetchUserDescriptions);
        setPokemonDescriptions(descriptions);
    }, [user])
    return(
        <div>
            <h1>{user}'s Pokemon Collection:</h1>
        {
            userPokemon.map((pokemon, index) =>{
                return(
                    <DisplayCard key={pokemon.pokemonName} name={pokemon.pokemonName} description={pokemonDescriptions[index]}/>
                )
            })
        }
        </div>
        
    )
}