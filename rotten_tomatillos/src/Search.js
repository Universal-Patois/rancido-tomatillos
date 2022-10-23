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
    if (event.target.name === 'search'){
      this.setState({query: event.target.value})
    } else if (event.target.value === 'rating') {
      this.setState({...this.state, sort: 'rating'})
    } else if (event.target.value === 'releaseDate') {
      this.setState({...this.state, sort: 'releaseDate'})
    }
  }

  submitSearch = (event) => {
    event.preventDefault()
    this.searchMovie()
    this.clearInput()
  }

  searchMovie = () => {
    const movie = this.props.movies.find(movie => {
      window.location.pathname = `/${movie.id}`
      return movie.title === this.state.query
    })
    movie ? this.props.addMovie(movie) : this.errorMessage()
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
      <section>
      <input type="radio" value="rating" name="sort" onChange={event => this.handleChange(event)}/> Movies by  Highest Rating
      <input type="radio" value="releaseDate" name="sort" onChange={event => this.handleChange(event)}/> Movies by Newest
      <input 
      type='text' 
      name='search' 
      value={this.state.query} 
      placeholder='Search for a movie here...' 
      onChange={event => this.handleChange(event)}
      />
      <button onClick={event => this.submitSearch(event)}>Search</button>
      {this.state.error && <h2>Sorry! No movies were found. Please check that your spelling is correct and try again.</h2>}
    </section>
    )
  }
}

export default Search;