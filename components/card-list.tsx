"use client";

import { Card, CardBody, CardHeader } from "@heroui/card";
import { Button, Image } from "@heroui/react";
import React from "react";

import { HeartIcon } from "./icons";

export interface Pokemon {
  id: string;
  name: string;
  url?: string;
  favourite?: boolean;
}

export interface PokemonListProps {
  pokemons: Pokemon[];
  onFavouriteChange: (e: Pokemon) => void;
}

const CardListComponent: React.FC<PokemonListProps> = (
  props: PokemonListProps,
) => {
  return (
    <div className="flex flex-wrap">
      {props.pokemons.map((pokemon) => (
        <Card key={pokemon.id} className="w-fit m-2">
          <CardBody className="relative">
            <Image
              alt={pokemon.name}
              className="rounded-xl"
              src={`./sprites/pokemon/${pokemon.id}.png`}
              width={200}
            />
            <Button
              isIconOnly
              className="text-default-900/60 data-[hover]:bg-foreground/10 -translate-y-2 translate-x-2 absolute top-2 right-2 z-999"
              radius="full"
              variant="light"
              onPress={() => props.onFavouriteChange(pokemon)}
            >
              <HeartIcon
                className={
                  pokemon.favourite ? "[&>path]:stroke-transparent" : ""
                }
                fill={pokemon.favourite ? "currentColor" : "none"}
              />
            </Button>
          </CardBody>
          <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">
            <h4 className="font-bold text-large">{pokemon.name}</h4>
            <small className="text-default-500">{pokemon.id}</small>
            <br />
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

export default CardListComponent;
