import React, { useEffect, useState } from "react"
import Movies from "../movies/Movies";
import Search from "../search/Search"
import thinking from '../assets/thinking.gif'
import { fetchMovies } from '../utilities/apiCalls';

const MoviesPage = () => {

  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMovies()
      .then(data => setMovies(data.movies))
      .catch(error => setError(error.message))
  }, [])

  const sortMoviesByDate = () => {
    const moviesByDate = movies.map(movie => {
      const newDates = new Date(movie.release_date)
      movie.release_date = newDates
      return movie
    }).sort((a, b) => {
      return b.release_date - a.release_date
    })
    setMovies([...moviesByDate])
  }

  const sortMoviesByRating = () => {
    const moviesByRating = movies.sort((a, b) => {
      return b.average_rating - a.average_rating
    })
    setMovies([...moviesByRating])
  }

  return (
    <div className="movies-page">
      {error && <h2 className='error-message'>Error: {error}</h2>}
      {movies.length === 0 && <img src={thinking} width="300px" />}
      <Search movies={movies} sortMoviesByDate={sortMoviesByDate} sortMoviesByRating={sortMoviesByRating} />
      <Movies className='Movies' movies={movies} />
    </div>
  )
}

export default MoviesPage