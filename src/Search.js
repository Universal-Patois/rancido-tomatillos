import React, { Component } from 'react';
import './Search.css';

class Search extends Component {
  constructor() {
    super()
    this.state = {
      query: '',
      error: false,
      sort: ''
    }
  }

  handleChange = (event) => {
    // this.setState({ ...this.state, [event.target.name]: event.target.value})
    if (event.target.name === 'search'){
      this.setState({query: event.target.value})
    } else if (event.target.value === 'average_rating') {
      this.setState({...this.state, sort: 'average_rating'})
      this.sortMoviesByRating()
    } else if (event.target.value === 'release_date') {
      this.setState({...this.state, sort: 'release_date'})
      this.sortMoviesByDate()
    }
  }

  submitSearch = (event) => {
    event.preventDefault()
    this.searchMovie()
    this.clearInput()
  }

  searchMovie = () => {
    const movie = this.props.movies.find(movie => {
      const foundMovie = movie.title === this.state.query
      if (foundMovie) {
        window.location.pathname = `/${movie.id}`
        return foundMovie
      }
    })
    movie ? this.props.addMovie(movie) : this.errorMessage()
  }

  sortMoviesByRating = () => {
    const sortedMovies = this.props.movies.sort((a ,b) => { 
      return b.average_rating - a.average_rating
    })
    this.props.filterMovies(sortedMovies)
  }

  sortMoviesByDate = () => {
    const sortedMovies = this.props.movies.map(movie => {
      const newDates = new Date(movie.release_date)
      movie.release_date = newDates
      return movie
    }).sort((a ,b) => { 
      return b.release_date - a.release_date
    })
    this.props.filterMovies(sortedMovies)
  }

  clearInput = () => {
    this.setState({query: ''})
  }

  errorMessage = () => {
    this.setState({error: true})
    setTimeout(this.clearMessage, 4000)
  }
  
  clearMessage = () => {
    this.setState({error: false})
  }

  render() {
    return (
      <section className='filter-container'>
        <div> 
          <input type="radio" value="average_rating" name="sort" onChange={event => this.handleChange(event)}/> Sort by  Highest Rating
        </div>
        <div>
          <input type="radio" value="release_date" name="sort" onChange={event => this.handleChange(event)}/> Sort by Newest
        </div>
        <div>
          <input
          className='.search-bar' 
          type='text' 
          name='search' 
          value={this.state.query} 
          placeholder='Search for a movie here' 
          onChange={event => this.handleChange(event)}
          />
          <button className='search-button' onClick={event => this.submitSearch(event)}>Search</button>
          {this.state.error && <h2>Sorry! No movies were found. Please check that your spelling is correct and try again.</h2>}
        </div>
      </section>
    )
  }
}

export default Search;