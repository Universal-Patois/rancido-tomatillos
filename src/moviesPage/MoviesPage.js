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

  return (
    <div className="movies-page">
      {error && <h2 className='error-message'>Error: {error}</h2>}
      {movies.length === 0 && <img src={thinking} width="300px" />}
      <Search movies={movies} />
      <Movies className='Movies' movies={movies} />
    </div>
  )
}

export default MoviesPage