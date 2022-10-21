import React, { Component } from "react";
import { Link } from 'react-router-dom';
import './MovieDescription.css';

class MovieDescription extends Component {
  constructor({selectedMovie}) {
    super()
    this.state = {
      id: selectedMovie.id,
      title: selectedMovie.title,
      backdrop_path: selectedMovie.backdrop_path,
      poster_path: selectedMovie.poster_path,
      average_rating: selectedMovie.average_rating,
      release_date: selectedMovie.release_date
    }
  }

  componentDidMount = () => {
    const url = 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/' + this.state.id
    console.log(url);
    fetch(url)
    .then(response => response.json())
    .then(data => console.log(data.movie))
    .catch(error => this.setState({error: error.message}))
    console.log(this.state.selectedMovie)
  }
  // if (!id) {
  //   return (
  //     <div className="movie-info">Error 404: Movie ID does not exist.</div>
  //   )
  // }
  render() {
        return (
      <div className="single-movie" 
           style={{
            backgroundImage: `url(${this.state.backdrop_path})`, 
            backgroundSize: '100vw',
          }}
          >
        <img className='movie-image' src={this.state.poster_path}></img>
        <div className="movie-info">
          <h3>Title: {this.state.title}</h3>
          <h4 className="rating">Rating: {this.state.average_rating}</h4>
          <h4 className="release-date">Release Date: {this.state.release_date}</h4>
          <Link to='/'>
            <button>Back</button>
          </Link>

        </div>
      </div>
    )

  }
}

export default MovieDescription;