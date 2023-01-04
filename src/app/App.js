import React, { useEffect, useState } from 'react';
import Search from '../search/Search.js';
import Movies from "../movies/Movies.js";
import MovieDescription from '../movieDescription/MovieDescription.js';
import { Route, Switch } from 'react-router-dom';
import './App.css';
import { fetchMovies } from '../utilities/apiCalls.js';
import thinking from '../assets/thinking.gif'
import MoviesPage from '../moviesPage/MoviesPage.js';

  // filterMovies = (movies) => {
  //   this.setState({ movies: movies })
  // }

const App = () => {
  
  return (
    <main className="App">
        <h1 className='App-header'>Rancido Tomatillos</h1>
        {/* <Search movies={movies} addMovie={setSelectedMovie} filterMovies={setMovies} assignURL={this.assignURL} /> */}
          <Route exact path='/' render={() => <MoviesPage />} />
          <Route exact path='/movie/:id' render={({ match }) => { return <MovieDescription movieId={match.params.id} /> }} />
      </main>
  )
}

export default App;