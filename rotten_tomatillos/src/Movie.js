import React from 'react'
import './Movie.css'

const Movies = ({ movies }) => {

  const movieCards = movies.map(movie => {
    return (
       <img className='movie-image' src={movie.poster_path} />
    )
  })

  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies