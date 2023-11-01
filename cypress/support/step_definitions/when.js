// Cypress reference
/// <reference types="cypress" />

import { When } from '@badeball/cypress-cucumber-preprocessor'
import { creerBurger } from '../bs/home'
import { clic } from '../bs/common'

/**
 * French version
 */
When(/^(l'utilisateur saisit|je saisis) le nom "(.*?)"$/, (a, name) => {
    //cy.get('[data-testid="username"]').scrollIntoView().type(name)
    creerBurger({ client: name })
    //creerBurger.client = name
})
When(/^(l'utilisateur saisit|je saisis) les informations de commande$/, () => {
    creerBurger({ auto: true })
    //creerBurger.automatique()
})
When(/^(l'utilisateur choisit|je choisis) le pain "(Italiano Branco|3 Fromages|Parmesan et Origan|Complet)"$/, (a, pao) => {
    //cy.get('[data-testid="pao"]').select(pao)
    creerBurger({ pain: pao })
    //creerBurger.pain = pao
})
When(/^(l'utilisateur choisit|je choisis) la viande "(Boeuf|Poulet|Porc|Veggie burger)"$/, (a, carne) => {
    //cy.get('[data-testid="carne"]').select(carne)
    creerBurger({ viande: carne })
    //creerBurger.viande = carne
})
When(/^(l'utilisateur choisit|je choisis) l'option "(Bacon|Cheddar|Salami|Tomate|Oignon rouge|Concombre)"$/, (a, opcionais) => {
    // cy.contains('span', opcionais)
    //     .parent()
    //     .then($el => {
    //         cy.wrap($el).find('input').click({ multiple: true })
    //     })
    creerBurger({ option: opcionais })
    //creerBurger.option = opcionais
})
When(/^(l'utilisateur|je) clique sur "(.*?)"$/, (a, clicAction) => {
    //cy.contains(clicAction).click()
    clic(clicAction)
    //clic.bouton = clicAction
})

When(/^(l'utilisateur|je) change le statut de la commande du client "(.*?)" à (En préparation|En attente|Terminée)$/, (customer, status) => {
    cy.contains(customer).then($el => {
        cy.wrap($el).parent().find('[data-testid="order-status"]').select(status)
    })
})

/**
 * English version
 */
When(/^(the user |i) type the name "(.*?)"$/, (a, name) => {
    creerBurger({ client: name })
})
When(/^(the user|i) type the order informations$/, () => {
    creerBurger({ auto: true })
})
When(/^(the user|i) choose "(Italiano Branco|3 Fromages|Parmesan et Origan|Complet)" bread$/, (a, pao) => {
    creerBurger({ pain: pao })
})
When(/^(the user|i) choose "(Boeuf|Poulet|Porc|Veggie burger)" for the beaf$/, (a, carne) => {
    creerBurger({ viande: carne })
})
When(/^(the user|i) choose "(Bacon|Cheddar|Salami|Tomate|Oignon rouge|Concombre) option"$/, (a, opcionais) => {
    creerBurger({ option: opcionais })
})
When(/^(the user|i) click "(.*?)"$/, (a, clicAction) => {
    clic(clicAction)
})

When(/^(the user|i) modify the order status for "(.*?)" to (In progress|Waiting|Finished)$/, (customer, status) => {
    cy.contains(customer).then($el => {
        cy.wrap($el).parent().find('[data-testid="order-status"]').select(status)
    })
})
