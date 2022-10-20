import React from "react";
import { Link } from 'react-router-dom';
import './MovieDescription.css';

const MovieDescription = ({ selectedMovie }) => {
  if (!selectedMovie) {
    return (<div>Error 404: Movie ID does not exist.</div>)
  }
    return (
      <div className="single-movie" 
           style={{
            backgroundImage: `url(${selectedMovie.backdrop_path})`, 
            backgroundSize: '100vw',
          }}
          >
        <img className='movie-image' src={selectedMovie.poster_path}></img>
        <div className="movie-info">
          <h3>Title: {selectedMovie.title}</h3>
          <h4 className="rating">Rating: {selectedMovie.average_rating}</h4>
          <h4 className="release-date">Release Date: {selectedMovie.release_date}</h4>
          <Link to='/'>
            <button>Back</button>
          </Link>

        </div>
      </div>
    )
}

export default MovieDescription;