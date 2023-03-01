import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import './MovieDescription.css';
import { fetchMovieData } from "../utilities/apiCalls";

type MovieData = {
  title: string;
  tagline: string;
  genres: Array<string>;
  poster_path: string;
  backdrop_path: string;
  overview: string;
  average_rating: number;
  runtime: number;
  release_date: string;
  revenue: number;
  budget: number;
};

const MovieDescription = (movieId: { movieId: string; }) => {

  const [movieData, setMovieDescription] = useState<MovieData>({
    title: '',
  tagline: '',
  genres: [],
  poster_path: '',
  backdrop_path: '',
  overview: '',
  average_rating: 0,
  runtime: 0,
  release_date: '',
  revenue: 0,
  budget: 0
  })
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMovieData(movieId)
      .then(data => setMovieDescription(data.movie))
      .catch(error => setError(error.message))
  }, [movieId])

  return (
    <>
      {!movieData && <img src='../assets/loading.gif' width="300px" alt=""/>}
      {error && <h2 className="error-message">Error: {error}</h2>}
      {movieData.backdrop_path &&
        <div className="single-movie"
          style={{
            backgroundImage: `url(${movieData.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
          }}
        >
          <img className='individual-movie-image' src={movieData.poster_path} alt="Movie poster" ></img>
          <div className="movie-info">
            <h2>{movieData.title}</h2>
            <h4>"{movieData.tagline}"</h4>
            <h4>{movieData.genres.reduce((acc, genre) => {
              acc += `${genre} `
              return acc
            }, '')
            }</h4>
            <h4>Synopsis: {movieData.overview}</h4>
            <h4 className="rating">Average rating: {Math.round(movieData.average_rating * 100) / 100}</h4>
            <h4>Runtime: {movieData.runtime} minutes</h4>
            <h4 className="release-date">Release Date: {movieData.release_date}</h4>
            <h4>Budget: {!movieData.budget ? ' N/A' : '$' + movieData.budget}</h4>
            <h4>Revenue: {!movieData.revenue ? ' N/A' : '$' + movieData.revenue}</h4>
            <Link to='/'>
              <button className="back-home">Back</button>
            </Link>
          </div>
        </div>
      }
    </>
  )
}

export default MovieDescription;