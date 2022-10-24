import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './MovieDescription.css';
import thinking from './thinking.gif'


class MovieDescription extends Component {
  constructor({}) {
    super()
    this.state = {
    }
  }

  componentDidMount = () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies' + window.location.pathname
    fetch(url)
    .then(response => response.json())
    .then(data => this.setState({movie: data.movie}))
    .catch(error => this.setState({error: error.message}))
  }

  render() {
    
    if (this.state.movie) {
      return (
        <>
          <div className="single-movie" 
          style={{
            backgroundImage: `url(${this.state.movie.backdrop_path})`,
            backgroundRepeat: "no-repeat",
            backgroundSize: 'cover',
          }}
          >
            {!this.state === 0 && <img src={thinking} width="100px"/>}
            {this.state.error && <h2 className="error-message">Error: Movie ID does not exist :</h2>} 
            <img className='individual-movie-image' src={this.state.movie.poster_path}></img>
            <div className="movie-info">
              <h2>{this.state.movie.title}</h2>
              {this.state.movie.tagline && <h4>"{this.state.movie.tagline}"</h4>}
              <h4>{this.state.movie.genres.reduce((acc, cur) => {
                  acc += `${cur} `
                  return acc
                }, '')
              }</h4>
              <h4>Synopsis: {this.state.movie.overview}</h4>
              <h4 className="rating">Average rating: {Math.round(this.state.movie.average_rating * 100) / 100}</h4>
              <h4>Runtime: {this.state.movie.runtime} minutes</h4>
              <h4 className="release-date">Release Date: {this.state.movie.release_date}</h4>
              <h4>Budget: ${this.state.movie.budget} Revenue: ${this.state.movie.revenue} </h4>
              <Link to='/'>
                <button className="back-home">Back</button>
              </Link>
            </div>
          </div>
        </>
    )
        }
  }
}

export default MovieDescription;