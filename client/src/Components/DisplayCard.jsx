import { useEffect, useState } from "react"
import  PokemonHomePageImage  from "../assets/PokemonHomepage.png"

export default function DisplayCard(props){
    const [cardImage, setCardImage] = useState();
    useEffect(() =>{ //fetches images to corresponding pokemon provided
        const fetchImage = (async() =>{
            try{
                const imageSource = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name.toLowerCase()}`)
                const data = await imageSource.json();
                const image = data.sprits.front_default;
                setCardImage(image);
            }
            catch(err){
                console.log("Error fetching image, or more specifically: " +err);
                setCardImage(PokemonHomePageImage);
            }
        })
        fetchImage();
    }, [props.name])

    //PLACEHOLDER FOR NOW
    return(
        <div className="card">
            <img src={cardImage} alt="image"/>
            <h1>{props.name}</h1>
            <p>{props.description}</p>
        </div>
    )
}