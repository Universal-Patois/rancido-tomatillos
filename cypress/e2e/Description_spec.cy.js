beforeEach(() => {cy.visit('http://localhost:3000/')})
beforeEach(() => {cy.get('img[src="https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"]').click()
})

describe('movie description page', () => {

  it('should display only/exactly one movies information', () => {
    cy.get('img[src="https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"]').click()
    cy.get('.single-movie').should('have.length', 1)
  })

  it('should be able to go back to the main page from the movie description page', () => {
    cy.get('img[src="https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg"]').click()
    cy.url().should('eq', 'http://localhost:3000/694919')
    cy.get('.back-home').click()
    cy.url().should('eq', 'http://localhost:3000/')
  })

})