import React, { Component } from 'react';
import Movies from "./Movies.js";
import MovieDescription from './MovieDescription.js';
// import movieData from './fake_movie_data.js'
import './App.css';
import { Route, Switch } from 'react-router-dom';

class App extends Component {
  constructor() {
    super();
    this.state = {
      movies: [],
      error: '',
    }
  }

  componentDidMount = () => {
    fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
    .then(data => this.setState({movies: data.movies}))
    .catch(error => this.setState({error: error.message}))
  }

  render() { 
    return (
      <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>
        {this.state.error && <h2>{this.state.error}</h2>}
        <Switch>

          <Route exact path='/'>        
            <Movies movies={this.state.movies} />
          </Route>

          <Route path='/movies/:id' render={({ match }) => {
            const selectedMovie = this.state.movies.find(movie => movie.id === parseInt(match.params.id) )
            return <MovieDescription selectedMovie={selectedMovie} />} } 
          />

        </Switch>
        
      </div>
    )
  };
}

export default App;
