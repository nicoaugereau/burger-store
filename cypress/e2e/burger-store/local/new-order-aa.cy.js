/// <reference types="cypress" />

import { titre, clic } from '../../../support/bs/common'
import { creerBurger } from '../../../support/bs/home'
import { commandes } from '../../../support/bs/pedidos'

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
        titre('Créez votre Burger')
        creerBurger({ client: customer })
        creerBurger({ pain: '3 Fromages' })
        creerBurger({ viande: 'Boeuf' })
        creerBurger({ option: 'Tomate' })
        creerBurger({ option: 'Concombre' })
        clic('Créer mon Burger!')
    })

    it(`Contrôler l'état de la commande`, () => {
        titre('Créez votre Burger')
        clic('Commandes')
        titre('Gestion des commandes')
        commandes({ client: customer })
        commandes({ statut: 'En attente' })
    })
})
