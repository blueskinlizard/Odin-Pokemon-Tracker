import { useEffect } from "react"
import { db } from "../../../server/db/queries"


export default function DisplayCard(props){
    const [cardImage, setCardImage] = useState()
    useEffect(() =>{
        const fetchImage(async() =>{
            const imageSource = await fetch(`https://pokeapi.co/api/v2/pokemon/${props.name.toLowerCase()}`)
            const data = await imageSource.json();
            const image = data.sprits.front_default;
            setCardImage(image);
        })
    }, [])

    //PLACEHOLDER FOR NOW
    return(
        <div className="card">
            <img src={cardImage} alt="image"/>
        </div>
    )
}