import { useEffect, useState } from "react";

import type { PokemonTypeIndividual, PokemonUri } from "models";
import { useTypeRelations } from "./use-pokemon-type-relations";

const API_ENDPOINT = "https://pokeapi.co/api/v2/pokemon/";
const API_ENDPOINT_TYPES = "https://pokeapi.co/api/v2/type";

type UsePokemonOpts = {
  limit?: number;
};

export function usePokemonList({ limit }: UsePokemonOpts = { limit: 42 }) {
  const [pokemonList, setPokemonList] = useState<PokemonUri[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [types, setTypes] = useState<PokemonTypeIndividual[]>([]);
  const [isLoadingType, setIsLoadingType] = useState(true);
  const { typeRelations, isLoading: isLoadingTypeRelations } = useTypeRelations(types);

  useEffect(() => {
    const fetchPokemonList = async () => {
      try {
        const response = await fetch(`${API_ENDPOINT}?limit=${limit}`);
        const data = await response.json();
        setPokemonList(data.results);
      } catch (error) {
        console.error("Error fetching Pokemon list:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPokemonList();
  }, [limit]);

  useEffect(() => {
    const fetchAllTypes = async () => {
      try {
        const response = await fetch(API_ENDPOINT_TYPES);
        const data = await response.json();
        setTypes(data.results);
        console.log(2,data.results);
      } catch (error) {
        console.error("Error fetching all types:", error);
      } finally {
        setIsLoadingType(false);
      }
    };

    fetchAllTypes();
  }, []);

  return { pokemonList, typeRelations, isLoading, isLoadingTypeRelations, isLoadingType };
}
