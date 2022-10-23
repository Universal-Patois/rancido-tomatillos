describe('api calls', () => {

  it('should be able to get movie posters from local fixture', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      },{
        fixture: 'test_data'
      }
    )
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('be.visible').contains('Rancid Tomatillos')
    cy.get('a img').should('be.visible').should('have.attr', 'src').should('include', 'https://i.redd.it/qvl0d0rwy2r91.png')
  })

  it('should display error status in case of failed API fetch', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      },{
        statusCode: 500
      }
    )
    cy.visit('http://localhost:3000/')
    cy.get('h1').should('be.visible').contains('Rancid Tomatillos')
    cy.get('h2').should('be.visible').contains('Error! Movies not found :(')
  })

  it('should be able to get movie information on a single movie from our fixture', () => {
    cy.intercept(
      {
        method: 'GET', 
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919'
      },{
        fixture: 'single_movie_data'
      }
    )
    cy.visit('http://localhost:3000/694919')
    cy.get('.movie-info').should('be.visible').contains('DANNY')
  })

  it('should display an error message if movie does not exist', () => {
    cy.visit('http://localhost:3000/42069')
    cy.get('.error-message').should('be.visible').contains('Error: Movie ID does not exist :(')
  })
})