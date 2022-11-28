describe('empty spec', () => {
  beforeEach(() => {
    // before each test, we can automatically preserve the
    // 'session_id' and 'remember_token' cookies. this means they
    // will not be cleared before the NEXT test starts.
    //
    // the name of your cookies will likely be different
    // this is an example
    // cy.setCookie('authToken', 'ZGV2ZWxvcGVyOnNraWxsYm94')
  })



  it('Auth and check bills', () => {
    cy.visit('/')
    cy.get('.form__input-login').type('developer')
    cy.get('.form__input-password').type('skillbox')
    cy.get('.form__button').click()
    cy.location('search').should('eq', '?account')
    cy
      .request({
        method: 'GET',
        url: 'http://localhost:3000/accounts', // baseUrl is prepend to URL
        // form: true,
        json: true,
        headers: {
          Authorization: `Basic ZGV2ZWxvcGVyOnNraWxsYm94`,
        }, // indicates the body should be form urlencoded and sets Content-Type: application/x-www-form-urlencoded headers
      })
      .then((resp) => {
        // if we got what we wanted
        const data = resp.body;
        cy.get('.account__bill').should('have.length', data.payload.length)
      })
  })

  it('Auth and transfer', () => {
    cy.visit('/')
    cy.get('.form__input-login').type('developer')
    cy.get('.form__input-password').type('skillbox')
    cy.get('.form__button').click()
    cy.get('.bill__button:first').click({force: true})
    cy.get('.input__number').type('82872036078224607241726833')
    cy.get('.input__count').type('10')
    cy.get('.billing__form-btn').click()
  })

  it('Auth and create bill', () => {
    cy.visit('/')
    cy.get('.form__input-login').type('developer')
    cy.get('.form__input-password').type('skillbox')
    cy.get('.form__button').click()
    cy.get('.account__button').click()
  })
})


