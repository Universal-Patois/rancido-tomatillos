import React, { Component } from 'react';
import Search from './Search.js';
import Movies from "./Movies.js";
import MovieDescription from './MovieDescription.js';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { fetchMovies } from './apiCalls.js';
import thinking from './thinking.gif'

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
    fetchMovies()
    .then(data => this.setState({movies: data.movies}))
    .catch(error => this.setState({error: error.message}))
  }

  addMovie = (movie) => { 
    this.setState({selectedMovie: movie})
  }

  filterMovies = (movies) => {
    this.setState({movies: movies})
  }

  render() { 
    return (
      <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>

        <Search movies={this.state.movies} addMovie={this.addMovie} filterMovies={this.filterMovies} assignURL={this.assignURL}/>
        {this.state.error && <h2 className='error-message'>{this.state.error}</h2>}
        
        {/* add loading info */}
        {this.state.error && <h2>Error! Movies not found :( </h2>}
        {this.state.movies.length === 0 && <img src={thinking} width="100px"/>} 
        <Switch>
          <Route exact path='/' render={() => <Movies className='Movies' movies={this.state.movies} /> } />
          <Route exact path='/:id' render={({ match }) => {return <MovieDescription selectedMovie={match.params.id} /> }} />
        </Switch>
      </div>
    )
  };
}

export default App;
