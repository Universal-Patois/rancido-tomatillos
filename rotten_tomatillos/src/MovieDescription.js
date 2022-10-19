import React from "react";
import { NavLink } from "react-router-dom";
import './MovieDescription.css';

const MovieDescription = ({ selectedMovie }) => {
  if (!selectedMovie) {
    return (<div>This movie does not exist! </div>);  
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
          <NavLink to='/'>
            <button>Back</button>
          </NavLink>
        </div>
      </div>
    )
}

export default MovieDescription;