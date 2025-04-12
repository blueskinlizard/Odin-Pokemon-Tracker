const { db } = require(`./queries`)

async function createPokemonAttributes(){
    //Yes this is ripped off my React Memory Card code on Github, check it out!
    //This initializes default values for pokemon in my database, and it's meant to be ran only once. 
    try{
        const promises = Array.from({ length: 50 }, async (_, i) => {
            const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${i + 1}/`);
            return await res.json();
        })
        const results = await Promise.all(promises);
        for (const result of results) {
            await db.insertPokemonAttribute(result.name, result.id);
        }
    }
    catch{
        console.log("Error fetching Pokemon data");
    }
}

createPokemonAttributes();