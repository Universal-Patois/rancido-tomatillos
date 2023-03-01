import React from "react";

type Movie = { 
  id: number, 
  poster_path: string, 
  title: string, 
  release_date: number, 
  average_rating: number 
}

type SuggestionsProps = {
  suggestions: Movie[],
  suggestionIndex: number,
  handleClick: (event: React.MouseEvent<HTMLLIElement>) => void
}

const Suggestions = ({ suggestions, suggestionIndex, handleClick }: SuggestionsProps) => {


  return (
    <ul className="suggestions">
      {suggestions.map((movieSuggestion: Movie, index: number) => {
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

export default Suggestions;