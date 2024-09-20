import { PokemonType, PokemonTypeIndividual } from "models";

export const getPokemonTypeUrlImage = (type: number): string =>
  `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/types/generation-viii/sword-shield/${type}.png`;

export const extractTypesWithImages = (typesData: PokemonType[]): PokemonType[] => {
  return typesData.map((typeInfo: PokemonType) => {
    const typeId = parseInt(typeInfo.type.url.split("/").slice(-2)[0]);
    const imageUrl = getPokemonTypeUrlImage(typeId);
    return {
      ...typeInfo,
      urlImage: imageUrl,
    };
  });
};

export const extractTypesWithImagesTypes = (typesData: (PokemonTypeIndividual)) => {
  const typeId = parseInt(typesData.url.split("/").slice(-2)[0]);
  const imageUrl = getPokemonTypeUrlImage(typeId);

  return {
    urlImage: imageUrl,
  };
};