// Cypress reference
/// <reference types="cypress" />

import { Then } from 'cypress-cucumber-preprocessor/steps'
import { commandes } from '../bs/pedidos'
import { titre } from '../bs/common'

Then(/^l'application redirige vers la page "(.*?)"$/, title => {
    //cy.get('[data-testid="page-title"]').scrollIntoView().should('have.text', title)
    titre(title)
    //titre.texte = title
})
Then(/^une commande au nom de "(.*?)" est présente$/, orderName => {
    // cy.setVar('orderName', orderName)
    // cy.get('[data-testid="orders-table"]').should('contain', orderName)
    commandes({ client: orderName })
    //commande.nom = orderName
})
Then(/^la commande est au statut (En attente|En préparation|Terminée)$/, orderStatus => {
    // cy.contains(getVar.orderName).then($el => {
    //     cy.wrap($el).parent().find('select[name="status"]').should('have.value', orderStatus)
    // })
    commandes({ statut: orderStatus })
    //commande.status = orderStatus
})
Then(/^(l'utilisateur|je) modifie la commande du client "(.*?)" au statut (En attente|En préparation|Terminée)$/, (a, client, newStatus) => {
    cy.contains(client).then($el => {
        cy.wrap($el).parent().find('select[name="status"]').select(newStatus)
    })
})
Then(/^un message affiche une actualisation de la commande à (En attente|En préparation|Terminée)$/, msgStatus => {
    cy.get('[data-testid="orders-table"] div p').should('contain', msgStatus)
})
