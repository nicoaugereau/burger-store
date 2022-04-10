/// <reference types="cypress" />

import { clic } from '../../../support/bs/common'
import { creerBurger } from '../../../support/bs/home'
import { getVar } from '../../../support/commands'

const customer = 'Nicolas'

describe('Mock et erreurs réseau', () => {
    const environment = 'local'

    it('Le site est en ligne', () => {
        cy.environnement(environment).then(url => {
            cy.setVar('url', url)
            cy.visit(url)
        })
    })

    it('Le site est en ligne mais avec des lenteurs réseau', () => {
        /**
         * Preset,download(kb/s),upload(kb/s),RTT(ms)
         * GPRS,50,20,500
         * Regular 2G,250,50,300
         * Good 2G,450,150,150
         * Regular 3G,750,250,100
         * Good 3G, 1000,750,40
         * Regular 4G, 4000,3000,20
         * DSL 2000, 1000,5
         * WiFi 30000,15000,2
         */
        cy.intercept('GET', '**/ingredientes', req => {
            req.reply({
                delay: 500, // milliseconds
                throttleKbps: 50 // to simulate a GPRS connection
            })
        }).as('slowNetwork')

        cy.visit(getVar.url)

        cy.wait('@slowNetwork')
    })

    it('Simuler une erreur serveur', () => {
        cy.intercept('POST', '**/burgers', { statusCode: 500 }).as('getServerFailure')

        cy.visit(getVar.url)

        creerBurger({ client: customer })
        creerBurger({ pain: '3 Fromages' })
        creerBurger({ viande: 'Boeuf' })
        clic('Créer mon Burger!')

        cy.wait('@getServerFailure')
        //cy.get('[data-testid="orders-table"] div p').should('contain', errorMsg)
        cy.get('@getServerFailure').then(res=>{
            expect(res.response.statusCode).eq(500)
        })
    })

    it('Simuler une erreur réseau', () => {
        cy.intercept('POST', '**/burgers', { forceNetworkError: true }).as('getNetworkFailure')

        cy.visit(getVar.url)
        creerBurger({ client: customer })
        creerBurger({ pain: '3 Fromages' })
        creerBurger({ viande: 'Boeuf' })
        clic('Créer mon Burger!')

        cy.wait('@getNetworkFailure').then(res=>{
            expect(res.error.name).eq('Error')
        })
    })

    it('Mock des données sur la Gestion des commandes', () => {
        cy.intercept('GET', '**/burgers', { fixture: 'mock-orders.json' }).as('mockOrdersList')

        cy.visit(getVar.url)
        cy.contains('Commandes').click()

        cy.wait('@mockOrdersList')
    })
})
