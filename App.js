import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useParams } from 'react-router-dom';
import './App.css';
import PokeCard from './pokecard';
import PokemonDetails from './PokemonDetails';
import Pokedex from './Pokedex';
import Bookmarks from './Bookmarks';

function App() {
  const [pokemons, setPokemons] = useState([]);

  useEffect(() => {
    fetchPokemons();
  }, []);

  const fetchPokemons = async () => {
    try {
      const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=10');
      const data = await response.json();
      setPokemons(data.results);
    } catch (error) {
      console.error('Error fetching pokemons:', error);
    }
  };

  const renderPokemonCards = () => {
    return pokemons.map((pokemon, index) => (
      <Route
        path={`/pokemon/${index + 1}`}
        render={() => <PokeCard pokemon={pokemon} />}
        key={index}
      />
    ));
  };

  return (
    <Router>
      <div className="container">
        <Routes>
          <Route path="/" element={<Pokedex />} />
          <Route path="/pokemon/:id" element={<PokemonDetails />} />
          <Route path="/" element={<Bookmarks />} />
         
        </Routes>
      </div>
    </Router>
  );
}

export default App;


