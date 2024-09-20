import c from 'classnames';
import { PokemonTypeRelations } from 'models';
import './pokemon-relations-typs.css';

interface TypeRelationsDisplayProps {
    typeRelations: PokemonTypeRelations;
    pokemonTypes: string[]; 
}

export const TypeRelationsDisplay: React.FC<TypeRelationsDisplayProps> = ({ typeRelations, pokemonTypes }) => {
    const allTypes = Object.keys(typeRelations);

    return (
        <div className="type-relations-display">
            {allTypes.map((type) => {
                const relation = typeRelations[type];
                const isWeakness = pokemonTypes.some(pokemonType => relation?.strengths.includes(pokemonType));
                const isStrength = pokemonTypes.some(pokemonType => relation?.weaknesses.includes(pokemonType));
                const isNeutral = pokemonTypes.some(pokemonType =>(pokemonType.includes(type)));

                const imageClass = c('type-image-relation', {
                    'weakness': isWeakness && !isStrength && !isNeutral,
                    'strength': isStrength && !isWeakness && !isNeutral,
                    'neutral': !isStrength && !isWeakness
                });

                return (
                    <>
                    { relation.weaknesses.length > 0 && (<div key={type} className="type-relation">
                        <img 
                            src={relation.urlImage} 
                            alt={type} 
                            className={imageClass}
                            />
                    </div>)
                }
                </>
                );
            })}
        </div>
    );
};
