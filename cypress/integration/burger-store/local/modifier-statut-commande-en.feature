Feature: Modifier le statut d'une commande et contrôle

    Scenario: Modifier le statut d'une commande
        Given je teste sur l'environnement local
        And je visite le site "Burger Store"
        Then l'application redirige vers la page "Créez votre Burger"
        When je clique sur "Commandes"
        Then l'application redirige vers la page "Gestion des commandes"
        And je modifie la commande du client "Cecília Moura" au statut En préparation

    Scenario: Contrôler le message de confirmation
        Given je suis sur la page "Gestion des commandes"
        Then un message affiche une actualisation de la commande à En préparation