import React from 'react'
import { Link } from 'react-router-dom';
import './Movies.css'

const Movies = ({ movies, selectMovie }) => {

  const movieCards = movies.map(movie => {

    return (
      <Link to={`${movie.id}`}>
       <img 
       className='movie-image' 
       src={movie.poster_path} 
       key={movie.id}
       onClick={() => selectMovie(movie.id)}
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