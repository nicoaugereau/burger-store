Feature: Tester le site en version mobile

    Background: Configuration environnement
        Given je teste sur l'environnement local
        And le navigateur est paramétré pour "iphone-11"

    Scenario: Créer mon burger        
        Given je visite le site "Burger Store"
        Given je suis sur la page "Créez votre propre Burger"
        When je saisis le nom "Nicolas"
        And je choisis le pain "3 Fromages"
        And je choisis la viande "Boeuf"
        And je choisis l'option "Tomate"
        And je choisis l'option "Concombre"