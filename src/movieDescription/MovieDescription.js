import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './MovieDescription.css';
import thinking from '../assets/thinking.gif'
import { fetchMovieData } from "../utilities/apiCalls";


const MovieDescription = ({movieId}) => {

console.log(movieId)
const [movieData, setMovieDescription] = useState('')
const [error, setError] = useState('')

useEffect(() => {
  fetchMovieData(movieId)
  .then(data => setMovieDescription(data.movie))
  .catch(error => setError(error.message))
},[])

  return (
    <>
      <div className="single-movie"
        style={{
          backgroundImage: `url(${movieData.backdrop_path})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: 'cover',
        }}
      >
        {!movieData && <img src={thinking} width="100px" />}
        {error && <h2 className="error-message">Error: Movie ID does not exist :</h2>}
        <img className='individual-movie-image' src={movieData.poster_path}></img>
        <div className="movie-info">
          <h2>{movieData.title}</h2>
          {movieData.tagline && <h4>"{movieData.tagline}"</h4>}
          {movieData.genres && <h4>{movieData.genres.reduce((acc, genre) => {
            acc += `${genre} `
            return acc
          }, '')
          }</h4>}
          <h4>Synopsis: {movieData.overview}</h4>
          <h4 className="rating">Average rating: {Math.round(movieData.average_rating * 100) / 100}</h4>
          <h4>Runtime: {movieData.runtime} minutes</h4>
          <h4 className="release-date">Release Date: {movieData.release_date}</h4>
          <h4>Budget: ${movieData.budget} Revenue: ${movieData.revenue} </h4>
          <Link to='/'>
            <button className="back-home">Back</button>
          </Link>
        </div>
      </div>
    </>
  )
}

export default MovieDescription;