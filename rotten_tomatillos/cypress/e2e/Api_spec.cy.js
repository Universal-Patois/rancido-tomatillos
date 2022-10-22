describe('api calls', () => {
  it('should be able to get movie data from our fixture', () => {
    cy.intercept('GET', '/', {fixture: 'test_data.json'} )
  })

  it('should be able to get movie posters from our api', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      },
      []
    )
  })

  it('should be able to get movie information on a single movie from our fixture', () => {
    cy.intercept('GET', '/694919', {fixture: 'single_movie_data.json'})
  })

  it('should be able to get information on a single movie from our api', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919',
      },
      []
    )
  })
})
