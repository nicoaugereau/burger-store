/// <reference types="cypress" />

/**
 * Gestion des commandes
 */
const { getVar } = require('../../../support/commands')

class commandes {
    set client(nom) {
        cy.setVar('orderName', nom)
        cy.get('[data-testid="orders-table"]').should('contain', nom)
    }
    set status(state) {
        cy.contains(getVar.orderName).then($el => {
            cy.wrap($el).parent().find('select[name="status"]').should('have.value', state)
        })
    }
    get annuler() {}
}

var commande = new commandes()

module.exports = { commande }
