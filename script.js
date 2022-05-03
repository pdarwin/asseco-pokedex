const pokemonListUrl = "https://pokeapi.co/api/v2/pokemon?limit=150";

let data;

const getPokemonList = async () => {
  const res = await fetch(pokemonListUrl);
  const data = await res.json();
  console.log(data);
  return data;
};

const getPokemonInfo = async url => {
  const res = await fetch(url);
  const data = await res.json();
  //console.log(data);
  return data;
};

const buildMarkup = async data => {
  const row = document.querySelector(".row");
  const promises = data.results.map(async el => {
    const pokemon = await getPokemonInfo(el.url);
    //console.log("aqui", pokemon.sprites.front_default);
    return `<div>
    <figure>
      <img src ="${pokemon.sprites.front_default}"></imf>
      <figcaption>${el.name}</figcaption>
    </figure></div>
     `;
  });

  Promise.all(promises).then(results => {
    //console.log(results);
    row.innerHTML = "";
    row.insertAdjacentHTML("afterbegin", results);
  });
};

const init = async () => {
  data = await getPokemonList();
  const markup = await buildMarkup(data);
};

init();

const imp = document.querySelector(".imp");

imp.addEventListener("input", e => {
  console.log("test", imp.value);
  const results = data.results.filter(el => {
    el.includes(imp.value);
  });
  console.log(results);
});
