
const pokemonCount = 151;
var pokedex = {}; // {1: {"name": "bulbasaur", "img" : url, "type" : ["grass", "poison"], "desc" : "...."}}
var pokemonId = 1;

window.onload = async function() {
    for (let i = 1; i <= pokemonCount; i++) {
        await getPokemon(i);

        let pokemon = document.createElement("div");
        pokemon.id = i; 
        pokemon.innerText = i.toString() + ". " + pokedex[i]["name"].toUpperCase();
        pokemon.classList.add("pokemon-name");
        pokemon.addEventListener("click", updatePokemon);
        document.getElementById("pokemon-list").append(pokemon);
    }
    
    document.getElementById("pokemon-description").innerText = pokedex[1]["desc"];
}

async function getPokemon(num) {
    let url = "https://pokeapi.co/api/v2/pokemon/" + num.toString();

    let res = await fetch(url);
    let pokemon = await res.json();

    let pokemonName = pokemon["name"];
    let pokemonType = pokemon["types"];
    let pokemonImg = pokemon["sprites"]["front_default"];
    let pokemonShinyImg = pokemon["sprites"]["front_shiny"];

    res = await fetch(pokemon["species"]["url"]);
    let pokemonDesc = await res.json();

    //Get the pokemon description
    pokemonDesc = pokemonDesc["flavor_text_entries"][9]["flavor_text"].replace(/\n/g, " ");
    pokedex[num] = {"name": pokemonName, "img": pokemonImg, "types": pokemonType, "desc": pokemonDesc, "shinyImg": pokemonShinyImg};
}

function updatePokemon() {
    document.getElementById("pokemon-img").src = pokedex[this.id]["img"];
    pokemonId = this.id;

    //Remove previous pokemon type
    let typesDiv = document.getElementById("pokemon-types"); 
    while(typesDiv.firstChild) {
        typesDiv.firstChild.remove();
    }

    //Update pokemon types
    let types = pokedex[this.id]["types"];
    for (let i = 0; i < types.length; i++) {
        let type = document.createElement("span");
        type.innerText = types[i]["type"]["name"].toUpperCase();
        type.classList.add("type-box");
        type.classList.add(types[i]["type"]["name"]); //adds background color and font color
        typesDiv.append(type);
    }

    //Update pokemon description
    document.getElementById("pokemon-description").innerText = pokedex[this.id]["desc"];
}

function updateShinySprite() {
    document.getElementById("pokemon-img").src = pokedex[pokemonId]["shinyImg"];
}
