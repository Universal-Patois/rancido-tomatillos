import React, { Component } from 'react';
import Movies from "./Movies.js";
import MovieDescription from './MovieDescription.js';
import movieData from './fake_movie_data.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: movieData.movies,
      selectedMovie: '',
  }
}

selectMovie = (id) => {
  const selectedMovie = this.state.movies.find(movie => movie.id === id)
  this.setState({ movies: movieData.movies, selectedMovie: selectedMovie})
  document.querySelector('.movies-container').classList.add('hidden')
}

clickBackButton = () => {
  console.log('Click')
  this.setState({ movies: movieData.movies, selectedMovie: ''})
  document.querySelector('.movies-container').classList.remove('hidden')
}

  render() { 
    return (
      <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>
        <Movies movies={this.state.movies} selectMovie={this.selectMovie} />
        <MovieDescription selectedMovie={this.state.selectedMovie} clickBackButton={this.clickBackButton}/>
      </div>
    )
  };
}

export default App;
