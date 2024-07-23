// Client-Side Rendering (CSR)
// Use the PokeAPI (https://pokeapi.co) to fetch Pokemon data by name.
// create an API endpoint to fetch Pokemon data by name there.

import dynamic from "next/dynamic";
import PokemonPage from "./pokemon-page";

// we force this page to be a real CSR page by using dynamic import with ssr false option
export default dynamic(() => import("./pokemon-page"), { ssr: false });

// export default function Page() {
//   return <PokemonPage />;
// }
