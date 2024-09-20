import c from "classnames";
import "./pokemon-types.css";
import { PokemonType } from '../models';

interface PokemonTypesProps {
    types: PokemonType[];
}

export function PokemonTypes({ types }: PokemonTypesProps) {
    return (
        <div className="pokemon-types">
            {types.map((type, index) => (
                <div key={index} className="pokemon-type">
                    {type.urlImage && (
                        <img
                            className={c("pokemon-type-image")}
                            src={type.urlImage}
                            alt={type.type.name}
                        />
                    )}
                </div>
            ))}
        </div>
    );
}
