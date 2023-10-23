import React, { useState } from 'react';
import SearchResults from '../components/SearchResults';
import Favourites from '../components/Favourites';
import axios from 'axios';
import './home.css';

const Home = () => {
  const storedResults = localStorage.getItem('searchResults');
  // Create a state to store fetched data
  const [stateValues, setStateValues] = useState({
    searchValue: '',
    results: storedResults ? JSON.parse(storedResults) : [],
  });

  const [showFavourites, setShowFavourites] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // movie api url with api key
  const TMDB_MOVIE_SEARCH_URL = 'https://api.themoviedb.org/3/search/movie';
  const TMDB_API_KEY = '24d863d54c86392e6e1df55b9a328755';

  //  function to handle search input
  const handleSearchInput = (e) => {
    // set search value to the state
    setStateValues((prevState) => {
      return { ...prevState, searchValue: e.target.value };
    });
  };

  //  function to execute a search
  const executeSearch = () => {
    setShowFavourites(false);
    // fetch movies
    axios.get(TMDB_MOVIE_SEARCH_URL, {
      params: {
        api_key: TMDB_API_KEY,
        query: stateValues.searchValue
      }
    })
    .then( res => {
      if (res.data.results.length === 0) {
        // Set an error message when no movies are found
        setErrorMessage('No movies found for the given search query.');
      } else {
        // Clear the error message if movies are found
        setErrorMessage('');
      }
      // set results to state
      setStateValues((prevState) => {
        return { ...prevState, results: res.data.results }
      });
      // Store the new results in local storage
      localStorage.setItem('searchResults', JSON.stringify(res.data.results));
    })
    .catch( err => {
      console.log( 'Error loading search results', err );
    });
  };

  // Function to show favorites
  const showFavouritesHandler = () => {
    localStorage.removeItem('searchResults');
    setErrorMessage('');
    setStateValues((prevState) => {
      return { ...prevState, results: []};
    });
    setShowFavourites(true);
  };

  return (
    <div>
      <header>
        <h1>Movie Search Database</h1>
      </header>
      
      <main> 
        {/* show search bar and buttons */}
        <div>
          <input  
            className='query' 
            placeholder='Search for movies' 
            onChange={handleSearchInput}
            onKeyDown={(e) => e.key === 'Enter' ?  executeSearch() : null}
          />
          <button 
            className='search' 
            alt='search' 
            onClick={executeSearch}>
              Search
          </button>
          <button 
            className='favourites' 
            alt='favourites' 
            onClick={showFavouritesHandler}>
              Favourites
          </button>
        </div>
        {/* Render the error message */}
        {errorMessage && <h2>{errorMessage}</h2>}
        {/* Render Favourites component only when showFavourites is true */}
        {showFavourites && <Favourites />}
        {/* Render search results only when showFavourites is false */}
        {!showFavourites && <SearchResults movies={stateValues.results} />}
      </main> 
    </div>
  );
};

export default Home;
