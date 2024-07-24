"use client";

import { ResponseError, smartFetch } from "@/utils/smartFetch";
import { useCallback, useEffect, useState } from "react";
import { DynamicErrorAlert } from "../ErrorAlert";

type Pokemon = {
  name: string;
  sprites: {
    front_default: string;
  };
};

const POKE_API_BASE_URL = "https://pokeapi.co/api";
const POKE_API_VERSION = "v2";
const POKE_API_POKEMON_PATH = "pokemon";

const getPokemon = async (name: string) =>
  await smartFetch<Pokemon>(
    `${POKE_API_BASE_URL}/${POKE_API_VERSION}/${POKE_API_POKEMON_PATH}/${name}`,
    {
      cache: "no-store", // lets force the fetch every time, we disable the disk cache in browser
    }
  );

type PokemonSectionProps = {
  name: string;
};

export const PokemonSection = (props: PokemonSectionProps) => {
  const { name } = props;
  // here we use a basic combination of useState and useEffect, but can be also use some helper function or a lib like react-query
  const [data, setData] = useState<Pokemon | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchData = useCallback(async () => {
    try {
      const { data, error } = await getPokemon(name);
      if (error) {
        setError(error);
      } else {
        setData(data);
      }
    } finally {
      setLoading(false);
    }
  }, [name]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // lets cover not found case
  if (error) {
    if (error instanceof ResponseError && error.response.status === 404) {
      return (
        <DynamicErrorAlert>{`Pokemon with name or id "${name}" not found`}</DynamicErrorAlert>
      );
    }
    return <DynamicErrorAlert>{`Unexpected error happened`}</DynamicErrorAlert>;
  }

  // type guard to make sure data is not, should not happen, but just in case
  if (!data) return null;

  return (
    <div className="flex justify-center items-center">
      <div className="bg-white rounded-lg shadow-lg p-4">
        <h2 className="text-2xl font-bold mb-4">{data.name}</h2>
        {/* TODO: use Next Image component */}
        <img
          src={data.sprites.front_default}
          alt={data.name}
          className="w-24 h-24 mx-auto"
        />
      </div>
    </div>
  );
};
