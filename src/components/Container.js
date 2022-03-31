import Header from './Header/Header';
import PokemonList from './PokemonList/PokemonList';
import { useState, useEffect } from 'react';
import axios from 'axios';

function Container() {
  const [loading, setLoading] = useState(true);
  const [pokemonList, setPokemonList] = useState([]);
  const [currentPokemonList, setCurrentPokemonList] = useState([]);
  useEffect(async () => {
    await axios('https://pokeapi.co/api/v2/pokemon/?limit=898')
      .then((res) => {
        const newPokemonData = [];
        res.data.results.forEach(async (pokemon, index) => {
          newPokemonData.push({
            id: index + 1,
            name: pokemon.name,
            img: `https://img.pokemondb.net/artwork/large/${pokemon.name}.jpg`,
          });
        });
        setPokemonList(newPokemonData);
        setCurrentPokemonList(newPokemonData);
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1500)
      );
  }, []);

  if (loading) {
    return (
      <div className="loading">
        <img src={require('../img/loading.gif')} alt="loading" />
      </div>
    );
  }

  return (
    <div className="container home">
      <Header />
      <PokemonList
        pokemonList={pokemonList}
        currentPokemonList={currentPokemonList}
        setCurrentPokemonList={setCurrentPokemonList}
      />
    </div>
  );
}

export default Container;
