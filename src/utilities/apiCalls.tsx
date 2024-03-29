type MovieIdProp = { movieId: string }

export function fetchMovies() {
  return fetch('https://rancid-tomatillos.herokuapp.com/api/v2/movies')
    .then(response => response.json())
}

export function fetchMovieData({ movieId }: MovieIdProp) {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}`)
    .then(response => response.json())
}

export function fetchMoviePreview({ movieId }: MovieIdProp) {
  return fetch(`https://rancid-tomatillos.herokuapp.com/api/v2/movies/${movieId}/videos`)
    .then(response => response.json())
}