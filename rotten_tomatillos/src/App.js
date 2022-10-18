import React, { Component } from 'react';
import Movies from "./Movies.js";
import MovieDescription from './MovieDescription.js';
import { Route } from 'react-router-dom';
// import movieData from './fake_movie_data.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      selectedMovie: '',
      error: '',
  }
}

componentDidMount = () => {
  fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
  .then(response => response.json())
  .then(data => this.setState({movies: data.movies}))
  .catch(error => this.setState({error: error.message}))
}

fetchSingleMovie = (id) => {
  fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${id}`)
  .then(response => response.json())
  .then(data => this.setState({selectedMovie: data.movie}))
  .catch(error => this.setState({error: error.message}))
}

selectMovie = (id) => {
  this.fetchSingleMovie(id)
  // const selectedMovie = this.state.movies.find(movie => movie.id === id)
  // this.setState({ ...this.state, selectedMovie: selectedMovie})
  // document.querySelector('.movies-container').classList.add('hidden')
  // document.querySelector('.single-movie').classList.remove('hidden')
}

clickBackButton = () => {
  this.setState({ ...this.state, selectedMovie: ''})
  // document.querySelector('.movies-container').classList.remove('hidden')
  // document.querySelector('.single-movie').classList.add('hidden')
}

  render() { 
    return (
      <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>
        {this.state.error && <h2>{this.state.error}</h2>}
        
        {/* <Movies movies={this.state.movies} selectMovie={this.selectMovie} /> */}

        <Route exact path='/' render={ () => <Movies movies={this.state.movies} selectMovie={this.selectMovie}/> } />

        <Route 
        exact path={`/${this.state.selectedMovie.id}`} 
        render={() => <MovieDescription 
        selectedMovie={this.state.selectedMovie} 
        clickBackButton={this.clickBackButton}/>} 
        />

         {/* <MovieDescription selectedMovie={this.state.selectedMovie} clickBackButton={this.clickBackButton}/> */}

      </div>
    )
  };
}

// <Route exact path='/' render={ () => <Movies movies={this.state.movies} selectMovie={this.selectMovie} />

export default App;
