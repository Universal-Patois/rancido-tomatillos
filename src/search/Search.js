import React, { Component, useState } from 'react';
import './Search.css';

const Search = ({ movies }) => {

  const [suggestions, setSuggestions] = useState([])
  const [suggestionIndex, setSuggestionsIndex] = useState(0)
  const [suggestionsActive, setSuggestionActive] = useState(false)
  const [value, setValue] = useState('')

  const handleChange = (event) => {
    const query = event.target.value
    setValue(query)
    if (query.length > 1) {
      const filterSuggestions = movies.filter(movie => movie.title.indexOf(query) > -1)
      console.log(filterSuggestions)
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
      setSuggestionsIndex(setSuggestionsIndex + 1)
    } else if (event.keyCode === 13) {
      setValue(suggestions[suggestionIndex])
      setSuggestionsIndex(0)
      setSuggestionActive(false)
    }
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
    <div className="autocomplete">
      <input
        type="text"
        value={value}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
      />
      {suggestionsActive && <Suggestions />}
    </div>
  );

}

export default Search

// class Search extends Component {
//   constructor() {
//     super()
//     this.state = {
//       query: '',
//       error: false,
//       sort: ''
//     }
//   }

//   handleChange = (event) => {
//     if (event.target.name === 'search') {
//       this.setState({ query: event.target.value })
//     } else if (event.target.value === 'average_rating') {
//       this.setState({ ...this.state, sort: 'average_rating' })
//       this.sortMoviesByRating()
//     } else if (event.target.value === 'release_date') {
//       this.setState({ ...this.state, sort: 'release_date' })
//       this.sortMoviesByDate()
//     }
//   }

//   submitSearch = (event) => {
//     event.preventDefault()
//     this.searchMovie()
//     this.clearInput()
//   }

//   searchMovie = () => {
//     const movie = this.props.movies.find(movie => {
//       const foundMovie = movie.title === this.state.query
//       if (foundMovie) {
//         window.location.pathname = `/${movie.id}`
//         return foundMovie
//       }
//     })
//     movie ? this.props.addMovie(movie) : this.errorMessage()
//   }

//   sortMoviesByRating = () => {
//     const sortedMovies = this.props.movies.sort((a, b) => {
//       return b.average_rating - a.average_rating
//     })
//     this.props.filterMovies(sortedMovies)
//   }

//   sortMoviesByDate = () => {
//     const sortedMovies = this.props.movies.map(movie => {
//       const newDates = new Date(movie.release_date)
//       movie.release_date = newDates
//       return movie
//     }).sort((a, b) => {
//       return b.release_date - a.release_date
//     })
//     this.props.filterMovies(sortedMovies)
//   }

//   clearInput = () => {
//     this.setState({ query: '' })
//   }

//   errorMessage = () => {
//     this.setState({ error: true })
//     setTimeout(this.clearMessage, 4000)
//   }

//   clearMessage = () => {
//     this.setState({ error: false })
//   }

//   render() {
//     return (
//       <section className='filter-container'>
//         <div>
//           <input type="radio" value="average_rating" name="sort" onChange={event => this.handleChange(event)} /> Sort by  Highest Rating
//         </div>
//         <div>
//           <input type="radio" value="release_date" name="sort" onChange={event => this.handleChange(event)} /> Sort by Newest
//         </div>
//         <div>
//           <input
//             className='search-bar'
//             type='text'
//             name='search'
//             value={this.state.query}
//             placeholder='Search for a movie here'
//             onChange={event => this.handleChange(event)}
//           />
//           <button className='search-button' onClick={event => this.submitSearch(event)}>Search</button>
//           {this.state.error && <h2>Sorry! No movies were found. Please check that your spelling is correct and try again.</h2>}
//         </div>
//       </section>
//     )
//   }
// }

// export default Search;