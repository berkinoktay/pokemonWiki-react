import Header from './Header/Header';
import { Link, useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
function PokemonDetail() {
  let { pokemonName } = useParams();
  const [isError, setIsError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(async () => {
    await axios(`https://pokeapi.co/api/v2/pokemon/${pokemonName}`)
      .then((res) => {
        console.log(res.data);
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
          <Link to="/">Back to home</Link>
        </div>
      ) : (
        <div className="detailContainer">
          <div className="pokemonImage"></div>
        </div>
      )}
    </>
  );
}

export default PokemonDetail;
