import React, { Component, useEffect, useState } from 'react';
import Search from '../search/Search.js';
import Movies from "../movies/Movies.js";
import MovieDescription from '../movieDescription/MovieDescription.js';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { fetchMovies } from '../utilities/apiCalls.js';
import thinking from '../assets/thinking.gif'

  // filterMovies = (movies) => {
  //   this.setState({ movies: movies })
  // }

const App = () => {
  
  const [movies, setMovies] = useState([])
  const [selectedMovie, setSelectedMovie] = useState('')
  const [error, setError] = useState('')
  
  useEffect(() => {
    fetchMovies()
    .then(data => setMovies(data.movies))
    .catch(error => setError(error.message))
  },[])
  
  return (
    <div className="App">
        <h1 className='App-header'>Rancid Tomatillos</h1>

        {/* <Search movies={movies} addMovie={setSelectedMovie} filterMovies={setMovies} assignURL={this.assignURL} /> */}
        {error && <h2 className='error-message'>{error}</h2>}

        {/* add loading info */}
        {error && <h2>Error! Movies not found</h2>}
        {movies.length === 0 && <img src={thinking} width="100px" />}
        <Switch>
          <Route exact path='/' render={() => <Movies className='Movies' movies={movies} />} />
          {/* <Route exact path='/:id' render={({ match }) => { return <MovieDescription selectedMovie={match.params.id} /> }} /> */}
        </Switch>
      </div>
  )
}

export default App;