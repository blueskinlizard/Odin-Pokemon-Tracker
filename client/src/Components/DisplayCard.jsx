import { useEffect, useState } from "react"
import  PokemonHomePageImage  from "../assets/PokemonHomepage.png"

export default function DisplayCard(props){
    const [cardImage, setCardImage] = useState();
    useEffect(() =>{ //fetches images to corresponding pokemon provided
        const fetchImage = (async() =>{
            try{
                const imageSource = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name}`)
                const data = await imageSource.json();
                const image = data.sprites.front_default;
                setCardImage(image);
            }
            catch(err){
                console.log("Error fetching image, or more specifically: " +err);
                setCardImage(PokemonHomePageImage);
            }
        })
        fetchImage();
    }, [props.name])

    const removePokemonFunction = (async() =>{
        try{
            await fetch("http://localhost:8080/api/removePokemon", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: 'include',
                body: JSON.stringify({ pokemonToRemove: props.name}),
            })
            window.location.reload();
        }
        catch(err){
            console.log("Error in fetching pokemon, " + err);
        }
    })
    //PLACEHOLDER FOR NOW
    return(
        <div className="card">
            <img src={cardImage} alt="image"/>
            <h3>{props.name}</h3>
            <p>{props.description}</p>
            <button onClick={removePokemonFunction}>Remove Pokemon</button>
        </div>
    )
}