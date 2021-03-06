// Cypress reference
/// <reference types="cypress" />

import { Given } from 'cypress-cucumber-preprocessor/steps'
import { titre } from '../bs/common'
import { getVar } from '../commands'

// Définition des conditions de test
Given(/^le navigateur est paramétré pour "(.*?)"$/, d => {
    cy.screen(d).then(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    })
})
Given(/^le navigateur est paramétré pour "(.*?)" en mode "(portrait|paysage)"$/, (d, m) => {
    cy.screen(d, m).then(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    })
})
Given(/^(l'utilisateur|je) teste sur l'environnement (local|internet)$/, (a, environment) => {
    cy.setVar('env', environment)
})

Given(/^(l'utilisateur|je) visite le site "(.*?)"$/, (a, website) => {
    cy.environnement(getVar.env).then(url => {
        cy.visit(url)
    })
})
Given(/^(l'utilisateur est|je suis) sur la page "(.*?)"$/, (a, title) => {
    //cy.get('[data-testid="page-title"]').scrollIntoView().should('have.text', title)
    titre(title)
    //titre.texte = title
})
