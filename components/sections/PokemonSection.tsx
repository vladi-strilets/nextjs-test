"use client";

import { usePokeApi } from "@/utils/pokeapi";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

const useGetPokemon = (name: string) => usePokeApi<Pokemon>(`/pokemon/${name}`);

type PokemonSectionProps = {
  name: string;
};

export const PokemonSection = (props: PokemonSectionProps) => {
  const { name } = props;
  // here we use a helper hook, but the same logic can be done by having a useState + useEffect combination
  const [{ data, error, loading }] = useGetPokemon(name);

  // TODO: add a loading spinner
  if (loading) return <div>Loading...</div>;
  // TODO: make error messages more user-friendly
  if (error) return <div>Error: {error.message}</div>;
  if (!data) return null;

  return (
    <div>
      <h2>{data.name}</h2>
      {/* TODO: use Next Image component */}
      <img src={data.sprites.front_default} alt={data.name} />
    </div>
  );
};
