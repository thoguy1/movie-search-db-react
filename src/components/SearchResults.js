import React from 'react';
import { Link } from 'react-router-dom';
import './searchResults.css';

const SearchResults = ({ movies }) => {
  const generatePosterUrl = (poster_path) => {
    return `https://image.tmdb.org/t/p/w200${poster_path}`;
  };

  const generateMovieTitle = (title, release_date) => {
    return `${title} (${release_date.substring(0, 4)})`;
  };

  const linkStyle = {
    textDecoration: 'none', // Remove underline
    color: 'white', // Set text color to white
  };

  return (
    <div className='results'>
      {
        movies.map((movie) =>
          movie.vote_count > 0 && movie.poster_path !== null ? (
            // render each movie
            <div className='result' key={movie.id}>
              {/* set a link for movie details*/}
              <Link to={`/movie/${movie.id}`} style={linkStyle}>
                <img src={generatePosterUrl(movie.poster_path)} alt={movie.title} />
                <h3>{generateMovieTitle(movie.title, movie.release_date)}</h3>
              </Link>
            </div>
          ) : null
        )
      }
    </div>
  );
};

export default SearchResults;
