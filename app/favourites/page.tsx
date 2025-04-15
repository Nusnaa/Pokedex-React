"use client";

import CardListComponent, { Pokemon } from "@/components/card-list";
import { SearchInput } from "@/components/search-input";
import { addToast } from "@heroui/react";
import { useState } from "react";

export function getSavedPokemons(): Pokemon[] {
    const savedFavourites = localStorage.getItem('favourites');
    return savedFavourites ? JSON.parse(savedFavourites.toString()) : [];
}

function toggleFavourite(pokemon: Pokemon, pokemons: Pokemon[]) {
  pokemon.favourite = !pokemon.favourite;
  localStorage.setItem(
    "favourites",
    JSON.stringify(pokemons.filter((pokemon: Pokemon) => pokemon.favourite)),
  );
  const toastText = `${pokemon.name} is ${
    pokemon.favourite ? "added to" : "removed from"
  } your favourite list`;

  addToast({
    title: toastText,
    timeout: 5000,
    shouldShowTimeoutProgress: true,
    hideIcon: true,
  });
}

export default function FavouritesPage() {
  const [pokemons, setPokemons] = useState(getSavedPokemons());

  function handleFavouriteChange(e: Pokemon) {
    toggleFavourite(e, pokemons);
    setPokemons(getSavedPokemons())
  }

  function handleSearchChange(text: string) {
    const originalPokemons = getSavedPokemons();
    if (text) {
      setPokemons(originalPokemons.filter(
        (pokemon) => pokemon.id.includes(text) || pokemon.name.includes(text)
      ));
    } else {
      setPokemons(originalPokemons);
    }
  }

  function handleSearchClear() {
    handleSearchChange("");
  }

  return (
    <section>
      <SearchInput handleChange={handleSearchChange} handleClear={handleSearchClear} />
      <CardListComponent pokemons={pokemons} onFavouriteChange={handleFavouriteChange} />
    </section>
  );
}
