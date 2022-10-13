import React, { Component } from 'react';
import Movies from "./Movie.js";
import movieData from './fake_movie_data.js'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = movieData
  }

  render() { 
    return (
      <div className="App">
        <h1>Rancid Tommatillos</h1>
        <Movies movies={this.state.movies}/>
      </div>
    )
  };
}

export default App;
