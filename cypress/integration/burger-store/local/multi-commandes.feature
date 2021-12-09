Feature: Créer plusieurs commandes

    Scenario Outline: Exemple pour plusieurs clients
        Given je teste sur l'environnement local
        And je visite le site "Burger Store"
        Given je suis sur la page "Créez votre propre Burger"
        When je saisis le nom "<Client>"
        And je choisis le pain "<Pain>"
        And je choisis la viande "<Viande>"
        And je choisis l'option "<Option>"
        And je clique sur "Créer mon Burger!"

    Examples:
        | Client             | Pain               | Viande        | Option |
        | Elsa Zylberstein   | Complet            | Boeuf         | Tomate |
        | Alice Taglioni     | Parmesan et Origan | Veggie burger | Concombre |
        | Stéphane De Groodt | 3 Fromages         | Poulet        | Bacon|