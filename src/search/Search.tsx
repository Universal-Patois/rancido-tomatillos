import React, { useState } from 'react';
import './Search.css';

const Search = ({ movies, sortMoviesByDate, sortMoviesByRating }) => {

  const [suggestions, setSuggestions] = useState([])
  const [suggestionIndex, setSuggestionsIndex] = useState(0)
  const [suggestionsActive, setSuggestionActive] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    if (event.target.name === 'search-bar') {
      const query = titleCase(event.target.value)
      setValue(query)
      if (query.length > 1) {
        const filterSuggestions = movies.filter(movie => movie.title.indexOf(query) > -1)
        setSuggestions(filterSuggestions)
        setSuggestionActive(true)
      } else {
        setSuggestionActive(false)
      }
    } else if (event.target.value === 'average_rating') {
      sortMoviesByRating()
    } else if (event.target.value === 'release_date') {
      sortMoviesByDate()
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

  const submitSearch = () => {
    const movieId = movies.find(movie => {
      return movie.title === value
    })
    window.location.pathname = `movie/${movieId.id}`
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
        <input className='radio-button' type="radio" value="average_rating" name="sort" onChange={handleChange} /> Sort by  Highest Rating
      </div>
      <div>
        <input className='radio-button' type="radio" value="release_date" name="sort" onChange={handleChange} /> Sort by Newest
      </div>
      <div>
        <input
          className='search-bar'
          name='search-bar'
          type="text"
          value={value}
          placeholder='Search for a movie here...'
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
        <button className='search-button' onClick={submitSearch}>Search</button>
        {suggestionsActive && <Suggestions />}
      </div>
    </section>
  );
}

export default Search