import React from "react";
import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import './moviePage.css';

const TMDB_API_KEY = '24d863d54c86392e6e1df55b9a328755';

const MoviePage = () => {
  // Get ID from parameter
  const {id} = useParams();
  const [movie, setMovie] = useState(null);
  const [casts, setCasts] = useState([]);
  const [crews, setCrews] = useState([]);
  const [error, setError] = useState(null);

  // Initialize favourites from local storage or an empty array
  const [favouriteMovies, setFavouriteMovies] = useState(
    JSON.parse(localStorage.getItem('favouriteMovies')) || []
  );

  useEffect(() => {
    loadMovieDetail();
  }, [id]);

  useEffect(() => {
    if (movie) {
      loadCastAndCrew();
    }
  }, [movie]);

  // Function to fetch movie details from API
  const loadMovieDetail = () => {
    axios.get(`https://api.themoviedb.org/3/movie/${id}`, {
      params: {
        api_key: TMDB_API_KEY
      }
    })
    .then(res => {
      setMovie(res.data);
    })
    .catch(err => {
      console.log('Error loading movie details', err);
      setError(err);
    });
  }

  // Function to show a backdrop image of the selected movie
  const generateBackdropUrl = () => {
    let picture = movie.backdrop_path;
    let width = 500;
  
    if(picture === null){
      picture = movie.poster_path;
      width = 300;
    }
  
    return `https://image.tmdb.org/t/p/w${width}${picture}`;
  }

  if(error){
    return <strong>There was a problem loading movie detail.</strong>;
  }

  if (!movie) {
    // Return loading or placeholder content while movie data is being fetched
    return <h1>Loading movie details...</h1>;
  }

  // Function to fetch casts and crews from API
  const loadCastAndCrew = () => {
     // Make an AJAX request to get the detailed cast & crew information
    axios.get(`https://api.themoviedb.org/3/movie/${id}/credits`, {
      params: {
        api_key : TMDB_API_KEY
      }
    })
    .then(res => {
      setCasts(res.data.cast.slice(0, 5));
      setCrews(res.data.crew.slice(0, 5));
    })
    .catch(err => {
      console.log('Error loading cast & crew information', err);
      setError(err);
    });
  }

  // Function to 
  const toggleFavourite = () => {
    const existingIndex = favouriteMovies.findIndex((fav) => fav.id === movie.id);

    if (existingIndex === -1) {
      // Movie not in favorites, add it
      const updatedFavourites = [...favouriteMovies, movie];
      setFavouriteMovies(updatedFavourites);
      localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavourites));
    } else {
      // Movie is in favorites, remove it
      const updatedFavourites = [...favouriteMovies];
      updatedFavourites.splice(existingIndex, 1);
      setFavouriteMovies(updatedFavourites);
      localStorage.setItem('favouriteMovies', JSON.stringify(updatedFavourites));
    }
  };

  return (
    <div className="movie-details">
      <h2>{`${movie.title} (${movie.release_date.substring(0, 4)})`}</h2>
      <img src={generateBackdropUrl()} alt={movie.title} />
      <p>{movie.overview}</p>
      <div className="more-info">
        <div>
          <div className="numbers-info">
            <div>{`Budget: $${movie.budget.toLocaleString()}`}</div>
            <div>{`Revenue: $${movie.revenue.toLocaleString()}`}</div>
            <div>{`Vote Average: ${movie.vote_average}`}</div>
            <div>{`Vote Count: ${movie.vote_count}`}</div>
            {
              movie.homepage !== '' 
              ? 
                (
                  <div><a href={movie.homepage} target="_blank">Official Website</a></div>
                ) 
              : 
                null
            }
          </div>
          <div className="production-companies">
            {
              movie.production_companies.length > 0
              ?
                (
                  <><strong><u>Production Companies</u></strong>
                    {
                      movie.production_companies.map(pc => 
                        <div key={pc.id}><a href={`https://www.themoviedb.org/company/${pc.id}`} target="_blank">{pc.name}</a></div>)
                    }
                  </>
                )
              :
                null
            }
          </div>
        </div>

        <div>
          <div className="casts"><strong><u>Casts:</u></strong>
          {
            casts.map(ca => (
              <div key={ca.id}>
                <Link to={`/cast/${ca.id}/${id}`}>
                  {ca.name}
                </Link>
              </div>
            ))
          }
          </div>
          <div className="crews"><strong><u>Crews:</u></strong>
          {
            crews.map(cr =>
              <div key={cr.id + cr.job}>{cr.job}: {cr.name}</div>)
          }
          </div>
        </div>
      </div>

      <div>
        {/* Add Favorites button and implement a toggle feature */}
        <button className="add-favourite-button"
          onClick={() => toggleFavourite()}>
          {favouriteMovies.some((fav) => fav.id === movie.id)
            ? 'Remove from Favorites'
            : 'Add to Favorites'}
        </button>
          {/* link to home page */}
          <Link to = {`/`}>
            <button className="back-button">  
              Back to Search 
            </button>
          </Link>
        
      </div>

    </div>
  );
}

export default MoviePage;


