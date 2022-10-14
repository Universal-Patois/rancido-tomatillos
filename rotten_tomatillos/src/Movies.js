import React from 'react'
import './Movies.css'

const Movies = ({ movies, selectMovie }) => {

  const movieCards = movies.map(movie => {

    return (
       <img 
       className='movie-image' 
       src={movie.poster_path} 
       onClick={() => selectMovie(movie.id)}
       key={movie.id}
       />
    )
  })

  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies