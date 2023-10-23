import React from 'react';
import { Link } from 'react-router-dom';
import './favourites.css';

const Favourites = () => {
  // Access the list of favorite movies from local storage
  const storedFavourites = JSON.parse(localStorage.getItem('favouriteMovies')) || [];
  
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
    <>
      <h2><u>Favourite Movies</u></h2>
      <div className='results'>
        {storedFavourites.map((movie) => (
          // render each movie
          <div className='result' key={movie.id}>
            {/* set a link for movie details*/}
            <Link to={`/movie/${movie.id}`} style={linkStyle}>
              <img src={generatePosterUrl(movie.poster_path)} alt={movie.title} />
              <h3>{generateMovieTitle(movie.title, movie.release_date)}</h3>
            </Link>
          </div>
        ))}
      </div>
    </>
  );
};

export default Favourites;