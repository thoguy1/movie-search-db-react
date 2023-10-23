import React from 'react';
import { useState, useEffect } from "react";
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './castPage.css';

const TMDB_API_KEY = '24d863d54c86392e6e1df55b9a328755';

const CastPage = () => {
  const {id, movieID} = useParams();
  const [cast, setCast] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCastDetail();
  }, [id]);

  // Function to fetch cast details from API
  function loadCastDetail() {
    // Make an AJAX request to get the detailed information about the cast member
    axios.get(`https://api.themoviedb.org/3/person/${id}`, {
      params: {
        api_key : TMDB_API_KEY
      }
    })
    .then(res => {
      setCast(res.data);
    })
    .catch(err => {
      console.log('Error loading cast member details', err);
      setError(err);
    });
  }

  if(error){
    return <strong>There was a problem loading cast detail.</strong>;
  }

  if (!cast) {
    // Return loading or placeholder content while cast data is being fetched
    return <h1>Loading cast details...</h1>;
  }
  return (
    <div className="cast-details">
      <h2>{cast.name}</h2>
      <img src={`https://image.tmdb.org/t/p/w400${cast.profile_path}`} alt={cast.name} />
      <p>Birthday: {cast.birthday}</p>
      <div>Place of Birth: {cast.place_of_birth}</div>
      
      <Link to={`/movie/${movieID}`}>
        <button className='back-button'>
            Back to Movie Details
        </button>
      </Link>
    </div>
  )
};

export default CastPage;
