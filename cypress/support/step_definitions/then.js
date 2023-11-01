// Cypress reference
/// <reference types="cypress" />

import { Then } from '@badeball/cypress-cucumber-preprocessor'
import { commandes } from '../bs/pedidos'
import { titre } from '../bs/common'

/**
 * French version
 */
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

/**
 * English version
 */
Then(/^the application redect to "(.*?) page"$/, title => {
    titre(title)
})
Then(/^an order with the name "(.*?)" is in the list$/, orderName => {
    commandes({ client: orderName })
})
Then(/^the order status is (Waiting|In progress|Finished)$/, orderStatus => {
    commandes({ statut: orderStatus })
})
Then(/^(the user|i) modify the order with the nae "(.*?)" to (Waiting|In progress|Finished) status$/, (a, client, newStatus) => {
    cy.contains(client).then($el => {
        cy.wrap($el).parent().find('select[name="status"]').select(newStatus)
    })
})
Then(/^a message displays a command update to (Waiting|In progress|Finished)$/, msgStatus => {
    cy.get('[data-testid="orders-table"] div p').should('contain', msgStatus)
})
