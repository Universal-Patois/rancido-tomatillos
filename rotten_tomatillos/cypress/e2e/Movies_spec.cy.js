beforeEach(() => {cy.visit('http://localhost:3000/')})

describe('App', () => {

  it('passes', () => {
    cy.visit('http://localhost:3000/')
  })

  it('should have a home url', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should display page heading', () => {
    cy.get('h1').contains('Rancid Tomatillos')
  })

  it('should display a grid of movie posters', () => {
    cy.get('img[class="movie-image"]').should('be.visible')
  })

  it('should show movie info when I click on a poster', () => {
    cy.get('img[src="https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"]').click()
    cy.get('h3').contains('Money Plane')
  })


})