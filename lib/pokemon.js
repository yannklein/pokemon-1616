import Mustache from "mustachejs";

// 20 pokemons: 'https://pokeapi.co/api/v2/pokemon?limit=20'
// details about one pokemon: 'https://pokeapi.co/api/v2/pokemon/35'


// For each card:
// - name
// - all the pokemon types (types/type/name)
// - pokemon picture (sprites/other/dream_wworld/front_default)


// Display details of 1 pokemon
// ////////////////////////////

const displayCardInfo = (pokeData) => {
  // 1. Select elements (infoContainer, infoTemplate)
  const infoContainer = document.querySelector("#infoContainer");
  const infoTemplate = document.querySelector("#infoTemplate");
  
  const output = Mustache.render(infoTemplate.innerHTML, pokeData);
  infoContainer.innerHTML = output;
}


// Display 20 pokemon cards
// ////////////////////////

const url = 'https://pokeapi.co/api/v2/pokemon?limit=20';
// 1. Fetch the Poke API ---> we get an object
fetch(url)
  .then(response => response.json())
  .then((data) => {
    // 2. Iterate over the pokemons array (in the results key)
    data.results.forEach((pokemon) => {
      // 3. For each pokemon, get the name
      const name = pokemon.name;
      // 4. Get the URL and fetch the data out of this URL
      const pokeUrl = pokemon.url;
      fetch(pokeUrl)
        .then(response => response.json())
        .then((data) => {
          // 5. We dig into the object to get the types and the picture
          const picture = data.sprites.other.dream_world.front_default;
          const types = data.types.map(pokeType => pokeType.type.name);
          // 6. Select the template with a querSelector
          const cardTemplate = document.querySelector("#cardTemplate");
          // 7. Select cardsContainer with a querySelector
          const cardsContainer = document.querySelector("#cardsContainer");
          // 7. Create a variable for the template
          const template = cardTemplate.innerHTML;
          // 8. use Mustache with the template and the data object --> we get a string output
          const pokeData = {
            name: name,
            types: types,
            imageUrl: picture
          };
          // console.log(pokeData);
          const output = Mustache.render(template, pokeData);
          // 9. insertAdjacentHTML the string into cardsContainer
          cardsContainer.insertAdjacentHTML("beforeend", output);
          const lastCard = cardsContainer.lastElementChild;
          // 10. Add an event listener on the created card
          lastCard.addEventListener("click", () => {
            displayCardInfo(pokeData);
          });
        });
    });
  });