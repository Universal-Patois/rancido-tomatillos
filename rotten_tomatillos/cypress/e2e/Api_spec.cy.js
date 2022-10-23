// beforeEach(() => {cy.visit('http://localhost:3000/')})
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
    cy.get('h1').contains('Rancid Tomatillos')
    cy.get('a img').should('have.attr', 'src').should('include', 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg')

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
    cy.get('h1').contains('Rancid Tomatillos')
    cy.get('h2').contains('Error! Movies not found :(')
  })

  it('should be able to get movie information on a single movie from our fixture', () => {
    cy.intercept('GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919', {fixture: 'single_movie_data'})
    cy.visit('http://localhost:3000/694919')

    cy.get('h2').contains('Money Plane')
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

  it('shows an error when the movies cannot be displayed', () => {
    cy.intercept(
      {
        method: 'GET',
        url: 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      },{
        forceNetworkError: true
      }).as('movies')
      
      cy.visit('http://localhost:3000/')

      cy.get('.error-message')
        .should('be.visible')
  })
  
})
