import { PokemonTypeIndividual, PokemonTypeRelations } from "models";
import { useEffect, useState } from "react";
import { extractTypesWithImagesTypes } from "utils/data";

export function useTypeRelations(types: PokemonTypeIndividual[]) {
    const [typeRelations, setTypeRelations] = useState<PokemonTypeRelations>({});
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchTypeRelations = async () => {
            const allTypeRelations: PokemonTypeRelations = {};
            try {
                for (const  type of types) {
                    const response = await fetch(type.url);
                    const typeData = await response.json();
                    const updatedTypes = extractTypesWithImagesTypes(type);

                    const strengths = typeData.damage_relations.double_damage_to.map((t: { name: string }) => t.name);
                    const weaknesses = typeData.damage_relations.double_damage_from.map((t: { name: string }) => t.name);

                    allTypeRelations[type.name] = { strengths, weaknesses, ...updatedTypes };
                }

                setTypeRelations(allTypeRelations);
            } catch (error) {
                console.error("Error fetching type relations:", error);
            } finally {
                setIsLoading(false);
            }
        };

        if (types.length > 0) {
            fetchTypeRelations();
        }
    }, [types]);

    return { typeRelations, isLoading };
}
