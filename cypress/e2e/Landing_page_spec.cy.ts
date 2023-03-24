describe('Application landing page', () => {
  beforeEach(() => {
    cy.intercept(
      "GET", 'https://rancid-tomatillos.herokuapp.com/api/v2/movies',
      {
        statusCode: 201,
        fixture: "movies_data.json",
      }
    ).as("user")
    cy.visit("http://localhost:3000/")
  });

  it('should load the site and have a home url', () => {
    cy.url().should('eq', 'http://localhost:3000/')
  })

  it('should display page heading', () => {
    cy.get('h1').contains('Rancido Tomatillos')
  })

  it('should have radio buttons to sort movies by rating or date', () => {
    cy.get('.filter-container > :nth-child(1)').contains("Sort by Highest Rating")
    cy.get(':nth-child(1) > .radio-button').should('be.visible')
    cy.get('.filter-container > :nth-child(2)').contains("Sort by Newest")
    cy.get(':nth-child(2) > .radio-button').should('be.visible')
  })
  
  it('should have a search bar and button for looking up a movie', () => {
    cy.get('.search-bar').should('be.visible')
    cy.get('.search-button').contains('Search')
  })

  it('should display a grid of movie posters', () => {
    cy.get('img[class="movie-image"]').should('be.visible')
  })

  it('should show matching suggested movies as the user types', () => {
    cy.get('.search-bar').type('Mo')
    cy.get('.suggestions').contains('Money Plane').click()
    cy.get('.search-bar').should('have.value', 'Money Plane')
  })

  it('should filter movie by average rating', () => {
    cy.get(':nth-child(1) > .radio-button').click()
    cy.get('.movies-container img').eq(0).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg')
    cy.get('.movies-container img').eq(1).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//sy6DvAu72kjoseZEjocnm2ZZ09i.jpg')
    cy.get('.movies-container img').eq(2).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg')
    cy.get('.movies-container img').eq(3).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg')
  })

  it('should filter movie by release date', () => {
    cy.get(':nth-child(2) > .radio-button').click()
    cy.get('.movies-container img').eq(0).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//4BgSWFMW2MJ0dT5metLzsRWO7IJ.jpg')
    cy.get('.movies-container img').eq(1).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//6CoRTJTmijhBLJTUNoVSUNxZMEI.jpg')
    cy.get('.movies-container img').eq(2).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//aKx1ARwG55zZ0GpRvU2WrGrCG9o.jpg')
    cy.get('.movies-container img').eq(3).should('have.attr', 'src', 'https://image.tmdb.org/t/p/original//uOw5JD8IlD546feZ6oxbIjvN66P.jpg')
  })

  it('should take the user to the information page for a movie when the title is selected from search suggestions and the search button is clicked', () => {
    cy.get('.search-bar').type('Mo')
    cy.get('.suggestions').contains('Money Plane').click()
    cy.intercept(
      'GET', 'https://rancid-tomatillos.herokuapp.com/api/v2/movies/694919',
      {
        statusCode: 201,
        fixture: 'single_movie_data.json',
      }
    )
    cy.get('.search-button').click()
    cy.get('h2').contains('Money Plane')
  })
})
