import React from 'react'
import './Movies.css'
import { NavLink } from "react-router-dom";

const Movies = ({ movies }) => {

  const movieCards = movies.map(movie => {

    return (
      <NavLink key={movie.id} to={`/movies/${movie.id}`}>
        <img 
          className='movie-image' 
          src={movie.poster_path} 
          
        />
      </NavLink>
    )
  })

  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies