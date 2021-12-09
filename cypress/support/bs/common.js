/// <reference types="cypress" />

/**
 * Gestion des clics
 * @param {*} options
 */
export const clic = options => {
    cy.contains(options).click()
}

/**
 * Gestion des titres
 * @param {*} options
 */
export const titre = options => {
    cy.get('[data-testid="page-title"]').scrollIntoView().should('have.text', options)
}
