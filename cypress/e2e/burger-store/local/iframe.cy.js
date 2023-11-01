//** Testcase input **//
//** -_-_-_-_-_-_-_-_-_-_- **//
const environment = 'local'
//** -_-_-_-_-_-_-_-_-_-_- **//

const getIframeDocument = () => {
    return (
        cy
            .get('#myFrame')
            // Cypress yields jQuery element, which has the real
            // DOM element under property "0".
            // From the real DOM iframe element we can get
            // the "document" element, it is stored in "contentDocument" property
            // Cypress "its" command can access deep properties using dot notation
            // https://on.cypress.io/its
            .its('0.contentDocument')
            .should('exist')
    )
}

const getIframeBody = () => {
    // get the document
    return (
        getIframeDocument()
            // automatically retries until body is loaded
            .its('body')
            .should('not.be.undefined')
            // wraps "body" DOM element to allow
            // chaining more Cypress commands, like ".find(...)"
            .then(cy.wrap)
    )
}

describe('working with iframe', () => {
    beforeEach(function () {
        cy.environnement(environment).then(url => {
            cy.visit(url)
        })
    })

    it('Go to iframe page', () => {
        cy.get('[data-testid="iframe"]').click()
        cy.wait(2000)
        getIframeBody().find('h1').should('have.text', 'Example Domain')
        getIframeBody().find('a').should('include.text', 'More information')
    })
})
