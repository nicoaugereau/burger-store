/// <reference types="cypress" />

let msTimeout = Cypress.config('requestTimeout')

class types {
    /* 
        défini l'action à réaliser : saisie ou controle
    */
    set controle(idUser) {
        // Utilisateur 1 = id 0
        //idUser = typeof idUser == 'Number' ? idUser : 1
        this._id = idUser - 1
        this._controle = true
        this._saisie = false
    }
    set saisie(idUser) {
        // Utilisateur 1 = id 0
        this._id = idUser - 1
        this._saisie = true
        this._controle = false
    }
}
class clics extends types {
    set bouton(label) {
        cy.contains(label, { timeout: msTimeout }).click()
    }
}
class titres extends types {
    set texte(label) {
        cy.get('[data-testid="page-title"]', { timeout: msTimeout }).scrollIntoView().should('have.text', label)
    }
}

var clic = new clics()
var titre = new titres()

module.exports = { types, clic, titre }
