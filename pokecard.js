import React from 'react';

const PokeCard = ({ pokemon }) => {
  return (
    <div className="card">
      <img src={pokemon.sprites.front_default} alt={pokemon.name} />
      <h5>{pokemon.name}</h5>
    </div>
  );
};

export default PokeCard;






