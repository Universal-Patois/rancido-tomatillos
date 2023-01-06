import React, { Component, useState } from 'react';
import './Search.css';

const Search = ({ movies }) => {

  const [suggestions, setSuggestions] = useState([])
  const [suggestionIndex, setSuggestionsIndex] = useState(0)
  const [suggestionsActive, setSuggestionActive] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const query = titleCase(event.target.value)
    setValue(query)
    if (query.length > 1) {
      const filterSuggestions = movies.filter(movie => movie.title.indexOf(query) > -1)
      setSuggestions(filterSuggestions)
      setSuggestionActive(true)
    } else {
      setSuggestionActive(false)
    }
  }

  const handleClick = (event) => {
    setSuggestions([])
    setValue(event.target.innerText)
    setSuggestionActive(false)
  }

  const handleKeyDown = (event) => {
    if (event.keyCode === 38) {
      if (suggestionIndex === 0) {
        return
      }
      setSuggestionsIndex(suggestionIndex - 1)
    } else if (event.keyCode === 40) {
      if (suggestionIndex - 1 === suggestions.length) {
        return
      }
      setSuggestionsIndex(suggestionIndex + 1)
    } else if (event.keyCode === 13) {
      setValue(suggestions[suggestionIndex].title)
      setSuggestionsIndex(0)
      setSuggestionActive(false)
    }
  }

  const titleCase = (string) => {
    return string.toLowerCase().split(' ').map((word) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  const Suggestions = () => {
    return (
      <ul className="suggestions">
        {suggestions.map((movieSuggestion, index) => {
          return (
            <li
              className={index === suggestionIndex ? "active" : ""}
              key={index}
              onClick={handleClick}
            >
              {movieSuggestion.title}
            </li>
          );
        })}
      </ul>
    );
  }

  return (
    <section className='filter-container'>
      <div>
        <input className='radio-button' type="radio" value="average_rating" name="sort" onChange={event => this.handleChange(event)} /> Sort by  Highest Rating
      </div>
      <div>
        <input className='radio-button' type="radio" value="release_date" name="sort" onChange={event => this.handleChange(event)} /> Sort by Newest
      </div>
      <div>
        <input
          className='search-bar'
          type="text"
          value={value}
          placeholder='Search for a movie here...'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className='search-button' onClick={event => this.submitSearch(event)}>Search</button>
        {suggestionsActive && <Suggestions />}
      </div>
    </section>
  );
}

export default Search


{/* handleChange = (event) => {
    if (event.target.name === 'search') {
      this.setState({ query: event.target.value })
    } else if (event.target.value === 'average_rating') {
      this.setState({ ...this.state, sort: 'average_rating' })
      this.sortMoviesByRating()
    } else if (event.target.value === 'release_date') {
      this.setState({ ...this.state, sort: 'release_date' })
      this.sortMoviesByDate()
    }
  } */}

{/* submitSearch = (event) => {
    event.preventDefault()
    this.searchMovie()
    this.clearInput()
  } */}

{/* sortMoviesByRating = () => {
    const sortedMovies = this.props.movies.sort((a, b) => {
      return b.average_rating - a.average_rating
    })
    this.props.filterMovies(sortedMovies)
  } */}

{/* sortMoviesByDate = () => {
    const sortedMovies = this.props.movies.map(movie => {
      const newDates = new Date(movie.release_date)
      movie.release_date = newDates
      return movie
    }).sort((a, b) => {
      return b.release_date - a.release_date
    })
    this.props.filterMovies(sortedMovies)
  } */}

{/* clearInput = () => {
    this.setState({ query: '' })
  } */}