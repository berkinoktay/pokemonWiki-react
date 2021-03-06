import { ImSearch } from 'react-icons/im';
import { useState } from 'react';
import Pagination from '../Pagination/Pagination';
import NotFound from '../../img/no-image.png';
import { Link } from 'react-router-dom';

function PokemonList({
  pokemonList,
  currentPokemonList,
  setCurrentPokemonList,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [postPerPage] = useState(50);

  const indexOfLastPost = currentPage * postPerPage;
  const indexOfFirstPost = indexOfLastPost - postPerPage;

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const handlePokemonlistfilter = (e) => {
    if (e.target.value === '') {
      setCurrentPage(1);
      setCurrentPokemonList([...pokemonList]);
    } else {
      const pokemonData = [...pokemonList];
      const filteredData = pokemonData.filter((pokemon) => {
        if (e.target.value === '') {
          return pokemon;
        } else {
          return pokemon.name
            .toLowerCase()
            .includes(e.target.value.toLowerCase());
        }
      });

      setCurrentPage(1);
      setCurrentPokemonList(filteredData);
    }
  };

  return (
    <div className="listContainer">
      <div className="search">
        <input
          type="text"
          placeholder="Search for pokemon.."
          onChange={handlePokemonlistfilter}
        />
        <ImSearch />
      </div>
      {currentPokemonList.length === 0 && <h3>No pokemon found!</h3>}
      <ul className="pokemonList">
        {currentPokemonList
          .slice(indexOfFirstPost, indexOfLastPost)
          .map((pokemon) => (
            <li key={pokemon.id}>
              <Link to={`/pokemon/${pokemon.name}`}>
                <span>#{pokemon.id}</span>
                <div>
                  <h2>{pokemon.name}</h2>
                  <img
                    src={pokemon.img}
                    alt={pokemon.name}
                    onError={(e) => {
                      e.target.onError = null;
                      e.target.src = NotFound;
                    }}
                  />
                </div>
              </Link>
            </li>
          ))}
      </ul>
      <Pagination
        postPerPage={postPerPage}
        totalPosts={currentPokemonList.length}
        paginate={paginate}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}

export default PokemonList;
