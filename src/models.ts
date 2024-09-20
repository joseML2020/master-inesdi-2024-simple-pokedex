export type PokedexTheme = "blue" | "red" | "yellow" | "green";
export type PokemonUri = {
  name: string;
  url: string;
};

export type PokemonAbility = {
  ability: {
    name: string;
    url: string;
  };
};

export type PokemonStat = {
  base_stat: number;
  stat: {
    name: string;
    url: string;
  };
};

export interface PokemonTypeIndividual {
  name: string;
  url: string;
}

export type PokemonType = {
  slot: number;
  type: PokemonTypeIndividual;
  urlImage?: string;
};

export type PokemonTypeRelations = {
  [typeName: string]: {
    strengths: string[];
    weaknesses: string[];
    urlImage?: string;
  };
};

export type Pokemon = {
  id: number;
  name: string;
  stats: PokemonStat[];
  types: PokemonType[];
  weight: number;
  height: number;
  abilities: PokemonAbility[];
  sprites: {
    front_default: string;
  };
  strengths: string[];
  weaknesses: string[];
};

export interface PokemonFavoriteDisplayProps {
  favorites: Pokemon[];
  className: string;
}