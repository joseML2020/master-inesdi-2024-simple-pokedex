import c from "classnames";
import { PokemonFavoriteDisplayProps } from '../models';

import './pokedex-team.css';
import "./pokedex.css";

export function PokemonFavoriteDisplay({ favorites, className}: PokemonFavoriteDisplayProps) {

    return (
        <div className={c(
            "team-display",
            className)
        }>
            {favorites.map((pokemon) => (
                <div key={pokemon.id} className="team-member">
                    <img src={pokemon.sprites.front_default} alt={pokemon.name} />
                    <div className="team-info">
                        <h4 className='name'>{pokemon.name}</h4>
                        <p>{pokemon.types.map(type => type.type.name).join(', ')}</p>
                    </div>
                </div>
            ))}
        </div>
    );
}
