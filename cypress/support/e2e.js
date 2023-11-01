// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.js using ES2015 syntax:
import './commands'
import 'cypress-plugin-api'
// Alternatively you can use CommonJS syntax:
// require('./commands')

Cypress.on('fail', (error, runnable) => {
    //debugger
    // we now have access to the err instance
    // and the mocha runnable this failed on
    throw error // throw error to have test still fail
})
Cypress.on('uncaught:exception', (err, runnable) => {
    // returning false here prevents Cypress from
    // failing the test
    return false
})

/**
 * Arreter ou continuer le test si echec
 * https://stackoverflow.com/questions/58657895/is-there-a-reliable-way-to-have-cypress-exit-as-soon-as-a-test-fails
 */
function abortEarly() {
    if (this.currentTest.state === 'failed') {
        cy.getCookie('shouldSkip').then(cookie => {
            if (cookie == null || cookie.value === 'true') {
                debugger
                return cy.task('shouldSkip', true)
            }
        })
    }
    cy.task('shouldSkip').then(value => {
        if (value) this.skip()
    })
}

/**
 * Voir cette solution si besoin ajout autres spécificités dans beforeEach et afterEach
 * https://medium.com/@rajneesh.m49/skipping-cypress-tests-on-first-failure-and-saving-resources-2c63e3bb0705
 */
beforeEach(abortEarly)
afterEach(abortEarly)

before(() => {
    cy.task('resetShouldSkipFlag')
    //Clear downloads folder
    cy.task('clearFolder', 'cypress/downloads')
    cy.task('db:seed')
})

after(() => {
    cy.clearCookies()
})
