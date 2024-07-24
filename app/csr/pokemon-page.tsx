"use client";

import { logRender } from "@/utils/logRender";
import dynamic from "next/dynamic";
import { useSearchParams } from "next/navigation";

// by using dynamic import, we dont need to load this compnent if the name query is not provided
const DynamicPokemonSection = dynamic(() =>
  import("@/components/sections/PokemonSection").then(
    (mod) => mod.PokemonSection
  )
);
const PokemonPage = () => {
  logRender("PokemonPage");

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const renderContent = () => {
    // TODO: provide a better instruction what to do, add a link to go back to the home page, make it dynamic
    if (!name) return <div>No Pokemon name provided</div>;
    return <DynamicPokemonSection name={name} />;
  };

  // TODO: add styles
  return (
    <div>
      <h1>CSR</h1>
      {renderContent()}
    </div>
  );
};

export default PokemonPage;
