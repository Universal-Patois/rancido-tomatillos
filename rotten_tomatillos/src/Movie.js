import React from 'react'

const Movies = ({ movies }) => {

  const movieCards = movies.map(movie => {
    return (
        <div>
          <img src={movie.poster_path} width='100vw' />
        </div>
    )
  })

  return (
    <div className='movies-container'>
      {movieCards}
    </div>
  )
}

export default Movies