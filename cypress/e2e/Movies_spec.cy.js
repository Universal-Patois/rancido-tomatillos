beforeEach(() => {cy.visit('http://localhost:3000/')})

describe('App', () => {

  it('should load the site', () => {
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
    cy.get('h2').contains('Money Plane')
  })

  it('should be able to find movie by title', () => {
    cy.get('[type="text"]').type('Mulan').should('have.value', 'Mulan')
    cy.get('section > button').click()
    cy.get('h2').contains('Mulan')
  })

  it('should display error if no matching title is found', () => {
    cy.get('[type="text"]').type('random').should('have.value', 'random')
    cy.get('section > button').click()
    cy.get('h2').contains('Sorry! No movies were found. Please check that your spelling is correct and try again.')
  })

  it('should filter movie by average rating', () => {
    cy.wait(500)
    cy.get('[value="average_rating"]').click()
    cy.get('[href="/694919"] > .movie-image').should('be.visible')
    cy.get('[href="/718444"] > .movie-image').should('be.visible')
    cy.get('[href="/500840"] > .movie-image').should('be.visible')
    cy.get('[href="/581392"] > .movie-image').should('be.visible')
  })

  it('should filter movie by release date', () => {
    cy.wait(500)
    cy.get('[value="release_date"]').click()
    cy.get('[href="/694919"] > .movie-image').should('be.visible')
    cy.get('[href="/737568"] > .movie-image').should('be.visible')
    cy.get('[href="/528085"] > .movie-image').should('be.visible')
    cy.get('[href="/694919"] > .movie-image').should('be.visible')
  })


})