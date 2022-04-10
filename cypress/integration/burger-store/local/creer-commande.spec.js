/// <reference types="cypress" />

let msTimeout = Cypress.config('requestTimeout')

//** INPUTS du cas de test **//
//** -_-_-_-_-_-_-_-_-_-_- **//
const environment = 'local'
const customer = 'Nicolas'
//** -_-_-_-_-_-_-_-_-_-_- **//

describe(`Créer un burger et contrôler l'état de la commande`, () => {
    beforeEach(function () {
        cy.environnement(environment).then(url => {
            cy.visit(url)
        })
    })

    it(`Créer mon burger`, () => {
        cy.get('[data-testid="page-title"]', { timeout: msTimeout }).scrollIntoView().should('have.text', 'Créez votre Burger')
        cy.get('[data-testid="username"]').scrollIntoView().type(customer)
        cy.get('[data-testid="pao"]').select('3 Fromages')
        cy.get('[data-testid="carne"]').select('Boeuf')
        cy.contains('span', 'Tomate')
            .parent()
            .then($el => {
                cy.wrap($el).find('input').click({ multiple: true })
            })
        cy.contains('span', 'Concombre')
            .parent()
            .then($el => {
                cy.wrap($el).find('input').click({ multiple: true })
            })
        cy.contains('Créer mon Burger!').click()
    })

    it(`Contrôler l'état de la commande`, () => {
        cy.get('[data-testid="page-title"]', { timeout: msTimeout }).scrollIntoView().should('have.text', 'Créez votre Burger')
        cy.contains('Commandes').click()
        cy.get('[data-testid="page-title"]').scrollIntoView().should('have.text', 'Gestion des commandes')
        cy.contains(customer).then($el => {
            cy.wrap($el).parent().find('select[name="status"]').should('have.value', 'En attente')
        })
    })

    it(`Création automatique d'une commande`, () => {
        cy.get('[data-testid="page-title"]', { timeout: msTimeout }).scrollIntoView().should('have.text', 'Créez votre Burger')
        cy.fixture('example').then(user => {
            cy.get('[data-testid="username"]').scrollIntoView().type(user.burgers[0].nome)
            cy.get('[data-testid="pao"]').select(user.burgers[0].pao)
            cy.get('[data-testid="carne"]').select(user.burgers[0].carne)
            for (let element in user.burgers[0].opcionais) {
                cy.contains('span', user.burgers[0].opcionais[element])
                    .parent()
                    .then($el => {
                        cy.wrap($el).find('input').click({ multiple: true })
                    })
            }
        })
        cy.contains('Créer mon Burger!').click()
        cy.contains('Commandes').click()
        cy.contains(customer).then($el => {
            cy.wrap($el).parent().find('select[name="status"]').should('have.value', 'En attente')
        })
    })
})
