"use client";

import { useEffect, useState } from "react";

import { SearchInput } from "@/components/search-input";
import CardListComponent, { Pokemon } from "@/components/card-list";
import { addToast } from "@heroui/react";
import { getSavedPokemons } from "./favourites/page";

export const convertPokemonList = (list: any): Pokemon[] => {
  return list["results"].map((pokemon: any) => convertPokemon(pokemon));
};

export const convertPokemon = (pokemon: any): Pokemon => {
  return {
    id: pokemon["id"]?.toString() || pokemon["url"]?.split("/")?.at(-2),
    name: pokemon["name"],
    url: pokemon["url"],
    favourite: false,
  };
};

let defaultPokemon: Pokemon = { id: "", name: "", favourite: false };

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

function setFavourites(pokemons: Pokemon[]): Pokemon[] {
  const favourites = getSavedPokemons();
  favourites.forEach((favourite: Pokemon) => {
    const match = pokemons.find(
      (pokemon) => pokemon.id === favourite.id
    );
    if (match) {
      match.favourite = true;
    }
  });
  return [...pokemons];
}

export default function Frontpage() {
  const [pokemons, setPokemons] = useState([defaultPokemon]);

  useEffect(() => {
    getPokemonList();
  }, []);

  function getPokemonList(): void {
    fetch("https://pokeapi.co/api/v2/pokemon/?limit=50&offset=0").catch()
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        throw new Error('Something went wrong');
      })
      .then((result) => convertPokemonList(result))
      .then((data) => setPokemons(setFavourites(data)));
  }

  function handleFavouriteChange(updatedPokemon: Pokemon) {
    toggleFavourite(updatedPokemon, pokemons);
    setPokemons(setFavourites(pokemons))
  }

  function handleSearchChange(text: string) {
    if (text) {
      fetch("https://pokeapi.co/api/v2/pokemon/" + text)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
        })
        .then((result) => result ? convertPokemon(result): undefined)
        .then((result) => result ? setPokemons(setFavourites([result])) : setPokemons([]))
    } else {
      getPokemonList();
    }
  }

  function handleSearchClear() {
    handleSearchChange("");
  }

  return (
    <section>
      <SearchInput handleChange={handleSearchChange} handleClear={handleSearchClear}/>
      <CardListComponent pokemons={pokemons} onFavouriteChange={handleFavouriteChange} />
    </section>
  );
}
