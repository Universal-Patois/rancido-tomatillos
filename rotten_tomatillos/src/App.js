import React, { Component } from 'react';
import Movies from "./Movies.js";
import MovieDescription from './MovieDescription.js';
import { Route, Switch } from 'react-router-dom';
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

  render() { 
    return (
      <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>
        {/* add loading info */}
        {this.state.error && <h2>Error! Movies not found :( </h2>}
        <Switch>
          <Route exact path='/' render={() => <Movies className='Movies' movies={this.state.movies} /> } />
          <Route path='/:id' render={({ match }) => {return <MovieDescription selectedMovie={match.params.id} /> }} />
        </Switch>
      </div>
    )
  };
}

export default App;
