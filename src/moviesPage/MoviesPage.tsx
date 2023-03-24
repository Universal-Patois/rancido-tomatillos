import React, { useEffect, useState } from "react"
import Movies from "../movies/Movies";
import Search from "../search/Search"
import { fetchMovies } from "../utilities/apiCalls";

type Movie = {
  id: number,
  poster_path: string,
  title: string,
  release_date: number,
  average_rating: number
}

const MoviesPage = () => {

  const [movies, setMovies] = useState<Movie[]>([])
  const [error, setError] = useState('')

  useEffect(() => {
    fetchMovies()
      .then(data => setMovies(data.movies))
      .catch(error => setError(error.message))
  }, [])

  const sortMoviesByDate = () => {
    const moviesByDate = movies.map((movie: Movie) => {
      const newDate = new Date(movie.release_date)
      return {
        ...movie,
        release_date: newDate.getTime()
      }
    }).sort((a: Movie, b: Movie) => {
      return b.release_date - a.release_date
    })
    setMovies([...moviesByDate])
  }

  const sortMoviesByRating = () => {
    const moviesByRating = movies.slice().sort((a: Movie, b: Movie) => {
      return b.average_rating - a.average_rating
    })
    setMovies([...moviesByRating])
  }

  return (
    <div className="movies-page">
      {error && <h2 className='error-message'>Error: {error}</h2>}
      {movies.length === 0 && <img src='../assets/loading.gif' width="300px" alt="loading icon" />}
      <Search movies={movies} sortMoviesByDate={sortMoviesByDate} sortMoviesByRating={sortMoviesByRating} />
      <Movies movies={movies} />
    </div>
  )
}

export default MoviesPage