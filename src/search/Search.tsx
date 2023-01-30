import React, { useState, MouseEvent, KeyboardEvent, ChangeEvent } from 'react';
import Suggestions from '../suggestions/Suggestions';
import './Search.css';

type Movie = { 
    id: number, 
    poster_path: string, 
    title: string, 
    release_date: string, 
    average_rating: number 
  }

  type SearchProps = {
    movies: Movie[],
    sortMoviesByDate: () => void,
    sortMoviesByRating: () => void,
  }

const Search = ({ movies, sortMoviesByDate, sortMoviesByRating }: SearchProps) => {

  const [suggestions, setSuggestions] = useState<Array<Movie>>([])
  const [suggestionIndex, setSuggestionsIndex] = useState(0)
  const [suggestionsActive, setSuggestionActive] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.name === 'search-bar') {
      const query = titleCase(event.target.value)
      setValue(query)
      if (query.length > 1) {
        const filterSuggestions = movies.filter((movie: Movie) => movie.title.indexOf(query) > -1)
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

  const handleClick = (event: MouseEvent<HTMLLIElement>) => {
    setSuggestions([])
    setValue(event.target.innerText)
    setSuggestionActive(false)
  }

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "ArrowUp") {
      if (suggestionIndex === 0) {
        return
      }
      setSuggestionsIndex(suggestionIndex - 1)
    } else if (event.key === "ArrowDown") {
      if (suggestionIndex - 1 === suggestions.length) {
        return
      }
      setSuggestionsIndex(suggestionIndex + 1)
    } else if (event.key === "Enter") {
      setValue(suggestions[suggestionIndex].title)
      setSuggestionsIndex(0)
      setSuggestionActive(false)
    }
  }

  const titleCase = (string: string) => {
    return string.toLowerCase().split(' ').map((word) => {
      return (word.charAt(0).toUpperCase() + word.slice(1));
    }).join(' ');
  }

  const submitSearch = () => {
    // change from type any
    const movieId = movies.find(movie => {
      return movie.title === value
    })

  console.log(movieId)
    // use useParams hook
    window.location.pathname = `movie/${movieId.id}`
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
        {suggestionsActive && <Suggestions suggestions={suggestions} suggestionsIndex={suggestionIndex} handleClick={handleClick} />}
      </div>
    </section>
  );
}

export default Search