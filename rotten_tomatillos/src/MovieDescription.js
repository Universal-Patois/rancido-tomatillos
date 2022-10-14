import React from "react";
import './MovieDescription.css';

const MovieDescription = ({ selectedMovie, clickBackButton }) => {
    return (
      <div className="single-movie">
        <img className='movie-image' src={selectedMovie.poster_path}></img>
        <h3>Title: {selectedMovie.title}</h3>
        <h4 className="rating">Rating: {selectedMovie.average_rating}</h4>
        <h4 className="release-date">Release Date: {selectedMovie.release_date}</h4>
        <button onClick={clickBackButton}>Back</button>
      </div>
    )
}

export default MovieDescription;