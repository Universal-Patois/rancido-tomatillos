import React, {useEffect, useState} from "react"
import Movies from "../movies/Movies.js";
import thinking from '../assets/thinking.gif'
import { fetchMovies } from '../utilities/apiCalls.js';

const MoviesPage = () => {
  
  const [movies, setMovies] = useState([])
  const [error, setError] = useState('')
  
  useEffect(() => {
    fetchMovies()
    .then(data => setMovies(data.movies))
    .catch(error => setError(error.message))
  },[])
  
  return (
    <div className="movies-page">
     
        {/* <Search movies={movies} addMovie={setSelectedMovie} filterMovies={setMovies} assignURL={this.assignURL} /> */}
        {error && <h2 className='error-message'>{error}</h2>}
        {movies.length === 0 && <img src={thinking} width="100px" />}
      <Movies className='Movies' movies={movies} />
      </div>
  )
}

export default MoviesPage