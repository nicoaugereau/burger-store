/// <reference types="cypress" />

/**
 * Gestion des commandes
 */
import { getVar } from '../commands'

/**
 * Gestion des informations de commande
 * @param {*} options { client: 'name' }
 * @param {*} options { statut: 'value' }
 */
export const commandes = options => {
    if (options.client) {
        cy.get('[data-testid="orders-table"]').should('contain', options.client)
    }
    if (options.statut) {
        cy.contains(getVar.orderName).then($el => {
            cy.wrap($el).parent().find('select[name="status"]').should('have.value', options.statut)
        })
    }
}
