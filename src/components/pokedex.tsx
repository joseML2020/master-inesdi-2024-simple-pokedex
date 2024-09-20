import c from "classnames";
import { useTheme } from "contexts/use-theme";
import { usePokemon, usePokemonList, useTextTransition } from "hooks";
import { useEffect, useState } from "react";
import { randomMode } from "utils/random";
import { Button } from "./button";
import { LedDisplay } from "./led-display";
import { PokemonTypes } from "./pokemon-typs";
import { TypeRelationsDisplay } from "./pokemon-relations-typs";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { PokemonFavoriteDisplay } from "./pokedex-team";
import { Pokemon } from "models";

import "./pokedex.css";

export function Pokedex() {
  const { theme } = useTheme();
  const { ready, resetTransition } = useTextTransition();
  const { pokemonList, typeRelations } = usePokemonList();
  const [i, setI] = useState(0);
  const { pokemon: selectedPokemon } = usePokemon(pokemonList[i]);
  const { pokemon: nextPokemon } = usePokemon(pokemonList[i + 1]);
  const [transitionMode, setTransitionMode] = useState<string>("regular");
  const [favorites, setFavorites] = useState<Pokemon[]>([]);

  const prev = () => {
    resetTransition(0);
    if (i === 0) {
      setI(pokemonList.length - 1);
    }
    setI((i) => i - 1);
  };

  const next = () => {
    resetTransition(0);
    if (i === pokemonList.length - 1) {
      setI(0);
    }
    setI((i) => i + 1);
  };

  const handleToggleFavorite = () => {
    if (selectedPokemon) {
      if (favorites.find(pokemon => pokemon.name === selectedPokemon.name)) {
        setFavorites(favorites.filter(p => p.name !== selectedPokemon.name));
      } else {
        if (favorites.length < 6) {
          setFavorites([...favorites, selectedPokemon]); // Almacena el objeto completo
        } else {
          alert("¡Ya tienes 6 Pokémon favoritos!");
        }
      }
    }
  };

  useEffect(() => {
    if (ready) {
      setTransitionMode(randomMode());
    }
  }, [ready, selectedPokemon, i]);

  return (
    <div className="pokedex-paent">
      {favorites.length > 0 && (<PokemonFavoriteDisplay favorites={favorites} className={`pokedex-${theme}`} />)}
      <div className={c("pokedex", `pokedex-${theme}`)}>
        <div className={c("sprite", "obfuscated", ready && "ready", ready && `ready--${transitionMode}`)}>
          {selectedPokemon && selectedPokemon.types && (
            <TypeRelationsDisplay
              typeRelations={typeRelations}
              pokemonTypes={selectedPokemon.types.map(type => type.type.name)}
            />
          )}
        </div>
        <div className="panel left-panel">
          <div className="screen main-screen">
            {selectedPokemon && (
              <img
                className={c("sprite", "obfuscated", ready && "ready", ready && `ready--${transitionMode}`)}
                src={selectedPokemon.sprites.front_default}
                alt={selectedPokemon.name}
              />
            )}
          </div>
          <div className="screen name-display">
            <div className={c("name", "obfuscated", ready && "ready", ready && `ready--${transitionMode}`)}>
              {selectedPokemon?.name}
              {selectedPokemon && (
                <button onClick={handleToggleFavorite} className="favorite-button" style={{ marginLeft: "0.5rem" }}>
                  <FontAwesomeIcon icon={faHeart} color={favorites.find(p => p.id === selectedPokemon.id) ? "red" : "gray"} />
                </button>
              )}
            </div>
          </div>
          <div className={c("name", "obfuscated", ready && "ready", ready && `ready--${transitionMode}`)}>
            {selectedPokemon && selectedPokemon.types && (
              <PokemonTypes types={selectedPokemon.types} />
            )}
          </div>
        </div>
        <div className="panel right-panel">
          <div className="controls leds">
            <LedDisplay color="blue" />
            <LedDisplay color="red" />
            <LedDisplay color="yellow" />
          </div>
          <div className="screen second-screen">
            {nextPokemon && (
              <img
                className={c("sprite", "obfuscated", ready && "ready", ready && `ready--${transitionMode}`)}
                src={nextPokemon.sprites.front_default}
                alt={nextPokemon.name}
              />
            )}
          </div>
          <div className="controls">
            <Button label="prev" onClick={prev} />
            <Button label="next" onClick={next} />
          </div>
        </div>
      </div>
    </div>
  );
}

