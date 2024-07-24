import dynamic from "next/dynamic";

export const DynamicPokemonSection = dynamic(() =>
  import("./PokemonSection").then((mod) => mod.PokemonSection)
);
