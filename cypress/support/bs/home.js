/// <reference types="cypress" />

import { clic } from './common'
/**
 * Gestion de la création d'un burger
 * @param {*} options { client: 'name' }
 */
export const creerBurger = options => {
    if (options.client) {
        cy.setVar('orderName', options.client)
        cy.get('[data-testid="username"]').scrollIntoView().type(options.client)
    }
    if (options.pain) cy.get('[data-testid="pao"]').select(options.pain)
    if (options.viande) cy.get('[data-testid="carne"]').select(options.viande)
    if (options.option)
        cy.contains('span', options.option)
            .parent()
            .then($el => {
                cy.wrap($el).find('input').click({ multiple: true })
            })
    if (options.auto) {
        cy.fixture('example').then(user => {
            cy.setVar('orderName', user.burgers[0].nome)
            creerBurger({ client: user.burgers[0].nome })
            creerBurger({ pain: user.burgers[0].pao })
            creerBurger({ viande: user.burgers[0].carne })
            for (let element in user.burgers[0].opcionais) {
                creerBurger({ option: user.burgers[0].opcionais[element] })
            }
        })
        clic('Créer mon Burger!')
    }
}
