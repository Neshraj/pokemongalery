import React, { useState, useEffect } from 'react';
import './App.css';

const App = () => {
  const [pokemons, setPokemons] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);
  const URL = 'https://pokeapi.co/api/v2/pokemon?limit=100';

  useEffect(() => {
    const fetchPokemons = async () => {
      const response = await fetch(URL);
      const data = await response.json();
      const detailedPokemons = await Promise.all(
        data.results.map(async (pokemon) => {
          const res = await fetch(pokemon.url);
          return await res.json();
        })
      );
      setPokemons(detailedPokemons);
      setLoading(false);
    };
    fetchPokemons();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value.toLowerCase());
  };

  const filteredPokemons = pokemons.filter((pokemon) =>
    pokemon.name.toLowerCase().includes(searchTerm)
  );

  return (
    <div className="App">
      <header className="App-header">
        <h1>Pokemon Gallery</h1>
        <input
          type="text"
          placeholder="Search Pokemon"
          onChange={handleSearch}
          value={searchTerm}
        />
      </header>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="pokemon-container">
          {filteredPokemons.map((pokemon) => (
            <div key={pokemon.id} className="pokemon-card">
              <img src={pokemon.sprites.front_default} alt={pokemon.name} className="pokemon-image" />
              <h2>{pokemon.name}</h2>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default App;