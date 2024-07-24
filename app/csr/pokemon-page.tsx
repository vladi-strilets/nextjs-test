"use client";

import { logRender } from "@/utils/logRender";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { DynamicErrorAlert } from "./components/ErrorAlert";
import { DynamicPokemonSection } from "./components/PokemonSection";

const PokemonPage = () => {
  logRender("PokemonPage");

  const searchParams = useSearchParams();
  const name = searchParams.get("name");

  const renderContent = () => {
    // let's handle the case when the name is not provided
    if (!name)
      return (
        <DynamicErrorAlert>
          No Pokemon name or id provided. Please provide a valid name or id as a
          query parameter.
        </DynamicErrorAlert>
      );

    // by using dynamic import, we dont need to load this compnent if the name query is not provided
    return <DynamicPokemonSection name={name} />;
  };

  return (
    <div className="flex flex-col gap-4 p-4">
      <div>
        <Link
          href="/"
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
        >
          Go to Home
        </Link>
      </div>
      <h1 className="text-3xl font-bold">CSR</h1>
      <p className="text-2xl font-bold">Name or Id: {name}</p>
      <p>
        This page was rendered completely on the client side. You can check the
        network response and see that the initial response was an empty page.
        And then the content has been dynamically loaded.
      </p>
      {renderContent()}
    </div>
  );
};

export default PokemonPage;
