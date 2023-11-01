// Cypress reference
/// <reference types="cypress" />

import { Given } from '@badeball/cypress-cucumber-preprocessor'
import { titre } from '../bs/common'
import { getVar } from '../commands'

// Définition des conditions de test
/**
 * French version
 */
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

/**
 * English version
 */

Given(/^the browser is "(.*?)"$/, d => {
    cy.screen(d).then(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    })
})
Given(/^the browser is "(.*?)" with "(portrait|paysage) mode"$/, (d, m) => {
    cy.screen(d, m).then(() => {
        cy.viewport(Cypress.config('viewportWidth'), Cypress.config('viewportHeight'))
    })
})
Given(/^(the user|i) want to test on (local|internet) environment$/, (a, environment) => {
    cy.setVar('env', environment)
})

Given(/^(the user|i) visit "(.*?)"$/, (a, website) => {
    cy.environnement(getVar.env).then(url => {
        cy.visit(url)
    })
})
Given(/^(the user is|i am) on the page "(.*?)"$/, (a, title) => {
    titre(title)
})
