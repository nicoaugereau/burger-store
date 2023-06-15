// load type definitions that come with Cypress module
/// <reference types="cypress" />

declare namespace Cypress {
    interface Chainable {
        setVar(name: string, value: string): Chainable<any>
        setElement(value: string, propName: string): Chainable<any>
        environnement(env: string): Chainable<any>
        screen(device: string, mode: string): Chainable<any>
    }
}
