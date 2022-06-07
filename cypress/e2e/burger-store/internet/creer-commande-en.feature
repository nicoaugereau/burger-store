Feature: Créer un burger et contrôler l'état de la commande

    Background: Configuration environnement
        Given je teste sur l'environnement internet
        And je visite le site "Burger Store"

    Scenario: Créer mon burger
        Given je suis sur la page "Créez votre propre Burger"
        When je saisis le nom "Nicolas"
        And je choisis le pain "3 Fromages"
        And je choisis la viande "Boeuf"
        And je choisis l'option "Tomate"
        And je choisis l'option "Concombre"
        And je clique sur "Créer mon Burger!"

    Scenario: Contrôler l'état de la commande
        Given je suis sur la page "Créez votre propre Burger"
        When je clique sur "Commandes"
        Then l'application redirige vers la page "Gestion des commandes"
        And une commande au nom de "Nicolas" est présente
        And la commande est au statut En attente

    @focus 
    Scenario: Création automatique d'une commande
        Given je suis sur la page "Créez votre propre Burger"
        When je saisis les informations de commande
        And je clique sur "Commandes"
        Then la commande est au statut En attente