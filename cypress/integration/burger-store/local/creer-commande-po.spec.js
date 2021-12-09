/// <reference types="cypress" />

import { titre, clic } from '../pages/common'
import { creerBurger } from '../pages/home'
import { commande } from '../pages/pedidos'

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
        titre.texte = 'Créez votre propre Burger'
        creerBurger.client = customer
        creerBurger.pain = '3 Fromages'
        creerBurger.viande = 'Boeuf'
        creerBurger.option = 'Tomate'
        creerBurger.option = 'Concombre'
        clic.bouton = 'Créer mon Burger!'
    })

    it(`Contrôler l'état de la commande`, () => {
        titre.texte = 'Créez votre propre Burger'
        clic.bouton = 'Commandes'
        titre.texte = 'Gestion des commandes'
        commande.nom = customer
        commande.status = 'En attente'
    })
})
