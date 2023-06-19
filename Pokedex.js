
import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PokeCard from './pokecard';

class App extends Component {
  constructor() {
    super();
    this.state = {
      pokemons: [],
      pokemonDetails: [],
      searchQuery: '',
      offset: 0,
      loadNumber: 1000,
      isLoading: false,
    };
  }

  componentDidMount() {
    this.getMorePokemon();
  }

  getMorePokemon() {
    const { offset, loadNumber } = this.state;
    const url = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${loadNumber}`;

    this.setState({ isLoading: true });

    fetch(url)
      .then(response => response.json())
      .then(data => {
        if (data) {
          const { results } = data;
          this.setState({ pokemons: results }, () => {
            this.loadPokemonDetails();
          });
        }
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  loadPokemonDetails() {
    const { pokemons, pokemonDetails } = this.state;

    const requests = pokemons.map(pokemon =>
      fetch(pokemon.url)
        .then(response => response.json())
    );

    Promise.all(requests)
      .then(data => {
        const updatedPokemonDetails = [...pokemonDetails, ...data];
        this.setState({
          pokemonDetails: updatedPokemonDetails,
          isLoading: false
        });
      })
      .catch(error => {
        console.log(error);
        this.setState({ isLoading: false });
      });
  }

  handleSearch = (event) => {
    const searchQuery = event.target.value;
    this.setState({ searchQuery });
  }

  handleScroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop ===
      document.documentElement.offsetHeight
    ) {
      this.setState(prevState => ({
        offset: prevState.offset + prevState.loadNumber
      }), () => {
        this.getMorePokemon();
      });
    }
  }

  render() {
    const { pokemonDetails, searchQuery } = this.state;

    const filteredPokemonDetails = pokemonDetails.filter(pokemon =>
      pokemon.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    let filteredPokemonList;

    if (searchQuery) {
      filteredPokemonList = filteredPokemonDetails.map(pokemon => (
        <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
          <PokeCard pokemon={pokemon} />
        </Link>
      ));
    }

    const renderedPokemonList = pokemonDetails.map(pokemon => (
      <Link to={`/pokemon/${pokemon.id}`} key={pokemon.id}>
        <PokeCard pokemon={pokemon} />
      </Link>
    ));

    return (
      <div className="container">
        <div className='heading'>
            <h1>Pokedex</h1>
     
        <div className='search-bar'>
        <input 
          type="text"
          placeholder="Search Pokemon"
          value={searchQuery}
          onChange={this.handleSearch}
        />
        </div>

<Link to="/bookmarks" className='bookmark'>Bookmark
          <i className="fas fa-bookmark"></i>
        </Link>
        </div>
        <div className="card-columns">
          {searchQuery ? filteredPokemonList : renderedPokemonList}
        </div>
        {this.state.isLoading && <div className="loading-indicator">Loading...</div>}

       
      </div>
    );
  }
}

export default App;




