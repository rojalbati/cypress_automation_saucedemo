Cypress.Commands.add('login', (username, password) => {
    // Login with username and password
    cy.visit('/')
    cy.get('#user-name').type(username)
    cy.get('#password').type(password)
    cy.get('.btn_action').click()
})

Cypress.Commands.add('loginwithSession', (username, password) => {
    // Wrap the login code inside session command to reuse the session
    cy.session([username, password], () => {
        cy.visit('/')
        cy.get('#user-name').type(username)
        cy.get('#password').type(password)
        cy.get('.btn_action').click()
    })
})

Cypress.Commands.add('verifyPriceLowToHigh', () => {
    // Check the price is low to high
    let initialPrice = 0;
    cy.get('.inventory_item_price').each(($el) => {
        let price = Number($el.text().replace('$', ''));
        expect(price).to.be.at.least(initialPrice);
        initialPrice = price;
    })
})

Cypress.Commands.add('enterCheckoutInformation', (firstName, lastName, postalCode) => {
    // Enter checkout information
    cy.get('[data-test="firstName"]').type(firstName)
    cy.get('[data-test="lastName"]').type(lastName)
    cy.get('[data-test="postalCode"]').type(postalCode)
    cy.get('[data-test="continue"]').click()
})
