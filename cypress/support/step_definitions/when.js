// Cypress reference
/// <reference types="cypress" />

import { When } from 'cypress-cucumber-preprocessor/steps'
import { creerBurger } from '../bs/home'
import { clic } from '../bs/common'

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
