/// <reference types="cypress" />

let msTimeout = Cypress.config('requestTimeout')

/**
 * Gestion de la Homepage
 */
class creerBurgers {
    set client(nom) {
        cy.setVar('orderName', nom)
        cy.get('[data-testid="username"]', { timeout: msTimeout }).scrollIntoView().type(nom)
    }
    set pain(label) {
        cy.get('[data-testid="pao"]').select(label)
    }
    set viande(label) {
        cy.get('[data-testid="carne"]').select(label)
    }
    set option(label) {
        cy.contains('span', label)
            .parent()
            .then($el => {
                cy.wrap($el).find('input').click({ multiple: true })
            })
    }
    automatique(options) {
        cy.fixture('example').then(user => {
            cy.setVar('orderName', user.burgers[0].nome)
            this.client = user.burgers[0].nome
            this.pain = user.burgers[0].pao
            this.viande = user.burgers[0].carne
            for (let element in user.burgers[0].opcionais) {
                this.option = user.burgers[0].opcionais[element]
            }
        })
        clic('Créer mon Burger!')
    }
}

var creerBurger = new creerBurgers()

module.exports = { creerBurger }
