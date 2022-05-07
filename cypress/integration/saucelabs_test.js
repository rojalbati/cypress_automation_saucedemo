/// <reference types="cypress" />

describe('Sauce Labs Test: Login', function () {

    beforeEach(() => {
        // Load the test data from fixture file fixtures/user.json
        cy.fixture('user').then(function (data) {
            this.user = data;
        })
    })

    it('Verify locked_out_user cannot login', function () {
        cy.login(this.user.invalidusername, this.user.password)
        cy.get('[data-test="error"]').should('have.text', this.user.errorText) // Verify error message is displayed
    })

    it('Verify you can log in with user: Standard_user', function () {
        cy.login(this.user.username, this.user.password)
        cy.url().should('include', '/inventory.html') // Verify the user is logged in
    })

})

describe('Sauce Labs Test: Add to Cart, Filter, Checkout', function () {

    beforeEach(function () {
        cy.fixture('user').then(function (data) {
            this.user = data;
        }).then(function () {
            // User login before each test and skip login steps if user session already exists
            cy.loginwithSession(this.user.username, this.user.password)
            cy.visit('/inventory.html', { failOnStatusCode: false })
        })
    })

    it('Verify the Standard_user can add items to the card', function () {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('.inventory_item_name').should('have.text', 'Sauce Labs Backpack') // Verify the item is added to the cart
    })

    it('Verify the Standard_user user can filter the products', function () {
        cy.get('.product_sort_container').select('Price (low to high)');
        cy.verifyPriceLowToHigh()
    })

    it('Verify the Standard_user user can perform a checkout', function () {
        cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click()
        cy.get('.shopping_cart_link').click()
        cy.get('[data-test="checkout"]').click()
        cy.enterCheckoutInformation(this.user.firstName, this.user.lastName, this.user.postalCode)
        cy.get('[data-test="finish"]').click()
        cy.get('.complete-text').should('have.text', this.user.completedText) // Verify the user can perform checkout
    })

})
