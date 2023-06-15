// type definitions for Cypress object "cy"
/// <reference types="cypress" />

let burgerItem
let baseUrl = 'http://localhost:3000'

describe('api testing', () => {
    it('add burger - POST', () => {
        cy.api('POST', `${baseUrl}/burgers`, {
            nome: 'Mr Bean',
            pao: 'Italiano Branco',
            carne: 'Poulet',
            opcionais: ['Bacon'],
            status: 'En attente'
        }).then(burger => {
            expect(burger.status).to.eq(201)
        })
    })
    it('fetches burgers items - GET', () => {
        cy.api(`${baseUrl}/burgers`).as('todoRequest')
        cy.get('@todoRequest').then(burger => {
            burgerItem = burger.body[0]['id']
            expect(burger.status).to.eq(200)
            assert.isArray(burger.body, 'Burger Response is an array')
            expect(Cypress._.some(burger.body, { nome: 'John Doe' })).to.be.true
        })
    })

    it('deletes Todo items - DELETE', () => {
        cy.api('DELETE', `${baseUrl}/burgers/${burgerItem}`).as('todoRequest')
        cy.get('@todoRequest').then(function (burger) {
            expect(burger.status).to.eq(200)
        })
    })
})
