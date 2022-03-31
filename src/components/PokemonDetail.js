import Header from './Header/Header';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import Colors from './Colors';
import { TiArrowBack } from 'react-icons/ti';

function PokemonDetail() {
  let { pokemonName } = useParams();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);
  const [pokemonImage, setPokemonImage] = useState('');
  const [pokemonDetails, setPokemonDetails] = useState({});
  useEffect(async () => {
    await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        const { data } = res;
        setPokemonDetails({
          name: data.name || pokemonName,
          skinTypes: data.types.map((items) => items.type.name),
          stats: {
            baseStat: data.stats.map((items) => items.base_stat),
            statName: data.stats.map((items) => items.stat.name),
          },
          abilities: data.abilities.map((items) => items.ability.name),
          moves: data.moves.map((items) => items.move.name),
          weight: data.weight,
        });
        const sprites = data.sprites.other;
        if (sprites.dream_world.front_default) {
          setPokemonImage(sprites.dream_world.front_default);
        } else if (sprites['official-artwork'].front_default) {
          setPokemonImage(sprites['official-artwork'].front_default);
        } else {
          setPokemonImage(sprites.home.front_default);
        }
      })
      .catch((err) => {
        if (err.response && err.response.status === 404) {
          setIsError(true);
          console.clear();
        }
      })
      .finally(() =>
        setTimeout(() => {
          setLoading(false);
        }, 1200)
      );
  }, [pokemonName]);

  if (loading) {
    return (
      <div className="loading">
        <img src={require('../img/loading.gif')} alt="loading" />
      </div>
    );
  }
  return (
    <>
      <Header />
      {isError ? (
        <div className="notFound">
          <img src={require('../img/not-found.png')} alt="not-found" />
          <h1>Pokemon Not Found!</h1>
          <p>Please enter a valid pokemon name or return to the home page.</p>
          <Link to="/" className="backToHome">
            <TiArrowBack /> Back to home
          </Link>
        </div>
      ) : (
        <>
          <div className="detailContainer">
            <div className="pokemonImage">
              <img src={pokemonImage} alt={pokemonName} />
            </div>
            <div className="pokemonInfo">
              <h1>{pokemonDetails.name}</h1>
              <span>(Weight: {pokemonDetails.weight})</span>
              <div className="statsContainer">
                <div className="left">
                  <h2>Skin Types:</h2>
                  <ul className="skinsList">
                    {pokemonDetails.skinTypes.map((skin, index) => (
                      <li
                        key={index}
                        style={{ backgroundColor: `${Colors[skin]}` }}
                      >
                        {skin}
                      </li>
                    ))}
                  </ul>
                  <h2>Stats:</h2>
                  <ul className="statsList">
                    {pokemonDetails.stats.statName.map((stat, index) => (
                      <li key={index}>
                        {stat} : {pokemonDetails.stats.baseStat[index]}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="right">
                  <h2>Abilities:</h2>
                  <ul>
                    {pokemonDetails.abilities.map((ability, index) => (
                      <li key={index}>{ability}</li>
                    ))}
                  </ul>
                  <h2>Moves:</h2>
                  <ul>
                    {pokemonDetails.moves.map((move, index) => (
                      <li key={index}>{move}</li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </div>
          <div className="back">
            <Link to="/" className="backToHome">
              <TiArrowBack /> Back to home
            </Link>
          </div>
        </>
      )}
    </>
  );
}

export default PokemonDetail;
