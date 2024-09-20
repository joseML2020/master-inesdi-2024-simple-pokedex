import type { Pokemon, PokemonUri } from "models";
import { useEffect, useState } from "react";
import { extractTypesWithImages } from "utils/data";

const cache = new Map<string, Pokemon>();

export function usePokemon(pokemonUri: PokemonUri) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemon, setPokemon] = useState<Pokemon>();

  useEffect(() => {
    const fetchPokemonData = async () => {
      try {
        const response = await fetch(pokemonUri.url);
        const data = await response.json();

        const updatedTypes = extractTypesWithImages(data.types);
        data.types = updatedTypes;

        cache.set(pokemonUri.url, data);
        setPokemon(data);
      } catch (error) {
        console.error("Error fetching Pokemon:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (!pokemonUri) return;

    if (cache.has(pokemonUri.url)) {
      const cachedPokemon = cache.get(pokemonUri.url);
      if (cachedPokemon) {
        const cachedTypes = extractTypesWithImages(cachedPokemon.types);
        cachedPokemon.types = cachedTypes;
        setPokemon(cachedPokemon);
      }
      setIsLoading(false);
    } else {
      fetchPokemonData();
    }
  }, [pokemonUri]);

  return { pokemon, isLoading };
}