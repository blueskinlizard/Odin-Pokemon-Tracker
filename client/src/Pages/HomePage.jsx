import { PokemonHomePageImage } from "../assets/PokemonHomePageImage.png"
export default function HomePage() {
    return(
        <div className="HomePage">
            <div className="HomePage__Header">
                <h1 className="HomePage__Header--Title">Welcome to the Pokémon Tracker! </h1>
                <p>This is a small SERN stack project where</p>
                <p>you can add pokemon to your account, change their descriptions,</p>
                <p>and view all the pokemon you AND OTHERS have in your collection.</p>
            </div>
        </div>
    );
}