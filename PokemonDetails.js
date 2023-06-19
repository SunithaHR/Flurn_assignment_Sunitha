
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';

function PokemonDetails() {
  const { id } = useParams();
  const [pokemon, setPokemon] = useState(null);
  const [isBookmarked, setIsBookmarked] = useState(false);

  useEffect(() => {
    fetchPokemonDetails();
  }, []);

  const fetchPokemonDetails = async () => {
    try {
      const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
      const data = await response.json();
      setPokemon(data);
    } catch (error) {
      console.error('Error fetching pokemon details:', error);
    }
  };

  const toggleBookmark = () => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    let bookmarks = storedBookmarks ? JSON.parse(storedBookmarks) : [];

    if (isBookmarked) {
      bookmarks = bookmarks.filter((bookmark) => bookmark.id !== id);
    } else {
      const bookmarkedPokemon = { id, name: pokemon?.name };
      bookmarks.push(bookmarkedPokemon);
    }

    localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
    setIsBookmarked(!isBookmarked);
  };

  useEffect(() => {
    const storedBookmarks = localStorage.getItem('bookmarks');
    if (storedBookmarks) {
      const bookmarks = JSON.parse(storedBookmarks);
      const isPokemonBookmarked = bookmarks.some(
        (bookmark) => bookmark.id === id
      );
      setIsBookmarked(isPokemonBookmarked);
    }
  }, [id]);

  if (!pokemon) {
    return <div>Loading...</div>;
  }

  return (
    <div className="pokemon-details">
      <div className="header heading">
        <h1>Details of {pokemon.name}</h1>
        <div className="bookmark-icon">
          <button onClick={toggleBookmark} className='button'>
            {isBookmarked ? 'Remove Bookmark' : 'Add Bookmark'}
          </button>
        </div>
        <Link to="/" className="home-icon">Back to Home
          <i className="fas fa-home"></i>
        </Link>
      </div>
<div className='flex'>
      <div className="pokemon-image">
        <img src={pokemon.sprites.front_default} alt={pokemon.name} width='500px'/>
      </div>

      <div className="pokemon-info">
        <h2>Abilities</h2>
        <ul>
          {pokemon.abilities.map((ability) => (
            <li key={ability.ability.name}>{ability.ability.name}</li>
          ))}
        </ul>

        <h2>Types</h2>
        <ul>
          {pokemon.types.map((type) => (
            <li key={type.type.name}>{type.type.name}</li>
          ))}
        </ul>

        <h2>Stats</h2>
        <ul>
          {pokemon.stats.map((stat) => (
            <li key={stat.stat.name}>
              {stat.stat.name}: {stat.base_stat}
            </li>
          ))}
        </ul>
      </div>
    </div>
    </div>
  );
}


export default PokemonDetails;


