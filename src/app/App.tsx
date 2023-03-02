import React from 'react';
import MovieDescription from '../movieDescription/MovieDescription';
import { Route } from 'react-router-dom';
import './App.css';
import MoviesPage from '../moviesPage/MoviesPage';

const App = () => {

  return (
    <main className="App">
      <h1 className='App-header'>Rancido Tomatillos</h1>
      <Route exact path='/' render={() => <MoviesPage />} />
      <Route exact path='/movie/:id' render={({ match }) => { return <MovieDescription movieId={match.params.id} /> }} />
    </main>
  )
}

export default App;