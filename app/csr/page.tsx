// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

interface Pokemon {
  name: string;
  sprites: {
    front_default: string;
  };
}

export default function PokemonPage() {
  return <div>CSR</div>;
}
