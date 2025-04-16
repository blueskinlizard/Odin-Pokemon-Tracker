/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DisplayCard from "../Components/DisplayCard";
//We are displaying the user's pokemon on their profile page
export default function UserPage(){
    const { user } = useParams(); //Fetches what the username is via URL
    const [userPokemon, setUserPokemon] = useState([]);
    const [pokemonDescriptions, setPokemonDescriptions] = useState([]);
    useEffect(() => {
        const fetchUserPokemon = async () => {
            const response = await fetch(`http://localhost:8080/api/getPokemon/${user}`);
            const data = await response.json();
            console.log("Data returned after fetchUserPokemon:", data);
            setUserPokemon(data);
        };
        fetchUserPokemon();
    }, [user]);
    
    useEffect(() => { //Fetches pokemon description
        const fetchUserDescriptions = async () => {
            if (userPokemon.length === 0) return;
            console.log("Fetching descriptions...");
            const descriptionPromises = userPokemon.map(async (pokemon) => {
                const response = await fetch(`http://localhost:8080/api/pokemonDescription/${user}/${pokemon}`);
                const data = await response.json();
                return data.pokemonDescription;
            });
            const descriptions = await Promise.all(descriptionPromises);
            setPokemonDescriptions(descriptions);
        };
        fetchUserDescriptions();
    }, [userPokemon, user]);
    
    return(
        <div>
            <h1>{user}'s Pokemon Collection:</h1>
        {
            userPokemon.map((pokemon, index) =>{
                console.log("Pokemon Name: " +pokemon)
                return(
                    <DisplayCard key={pokemon} name={pokemon} description={pokemonDescriptions[index]}/>
                )   
            })
        }
        </div>
        
    )
}