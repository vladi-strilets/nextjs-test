// Server-Side Rendering (SSR)
// Use SWAPI (https://swapi.dev) to fetch character data by ID.

import { ServerSidePageProp } from "@/types/types";
import { logRender } from "@/utils/logRender";
import { ResponseError, smartFetch } from "@/utils/smartFetch";
import { notFound } from "next/navigation";

interface Character {
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
}

const BASE_URL = "https://swapi.dev/api";
const CHARACTER_DATA_PATH = "people";

const fetchCharacter = async (id: string) =>
  await smartFetch<Character>(`${BASE_URL}/${CHARACTER_DATA_PATH}/${id}`, {
    // let's skip the cache and fetch a fresh data on each request
    // as we have set a revalidate const to 0, this fetch will skip the cache
    // cache: "no-store",
  });

type CharacterPageProps = ServerSidePageProp<{ id: string }>;

export default async function CharacterPage(props: CharacterPageProps) {
  logRender("CharacterPage");

  const { params } = props;
  const { id } = params;

  const { data: character, error } = await fetchCharacter(id);

  // let's handle the 404 case as an example, but we can provide more logic for other error types
  if (error instanceof ResponseError && error.response.status === 404) {
    notFound();
  }
  // for the rest of possible error cases, let's just log the error and return an empty page
  if (error) {
    console.error("Error fetching character data", error?.message);
    return null;
  }

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-white rounded-lg p-4 shadow flex flex-col gap-2">
        <h1 className="text-2xl font-bold">{character.name}</h1>
        <p>Height: {character.height}</p>
        <p>Mass: {character.mass}</p>
        <p>Hair color: {character.hair_color}</p>
        <p>Skin color: {character.skin_color}</p>
        <p>Eye color: {character.eye_color}</p>
        <p>Birth year: {character.birth_year}</p>
        <p>Gender: {character.gender}</p>
      </div>
    </div>
  );
}

// NOTE: for some reason the dynamic export doesn't skip the cache
// export const dynamic = "force-dynamic";

export const revalidate = 0;
