import { useEffect } from "react"
import { DisplayCard } from "../Components/DisplayCard";
import { PokemonHomePageImage } from "../assets/PokemonHomePageImage.png"
export default function HomePage() {
    useEffect(() =>{
        //fetch data from API, but it will be a placeholder for now
        for(let i = 0, len = 3; i < len; i++){
            <DisplayCard image={PokemonHomePageImage}></DisplayCard> //PLACEHOLDER IMAGE!!!
        }
    }, [])

    return(
        <>
        </>
    );
}