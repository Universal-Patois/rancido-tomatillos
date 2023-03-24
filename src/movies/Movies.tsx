import React from 'react'
import { Link } from 'react-router-dom';
import './Movies.css'

type MovieProps = { movies: Array<{ id: number, poster_path: string, title: string }> }

const Movies = ({ movies }: MovieProps) => {

  const movieCards = movies.map(movie => {

    return (
      <Link to={`/movie/${movie.id}`} key={movie.id}>
        <img
          className='movie-image'
          src={movie.poster_path}
          alt={movie.title}
        />
      </Link>
    )
  })

  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies