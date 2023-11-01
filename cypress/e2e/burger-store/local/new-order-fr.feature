# language: fr
Fonctionnalité: Créer un burger et contrôler l'état de la commande

    Contexte: Configuration environnement
        Etant donné je teste sur l'environnement local
        Et je visite le site "Burger Store"

    Scénario: Créer mon burger
        Soit je suis sur la page "Créez votre Burger"
        Quand je saisis le nom "Nicolas"
        Et je choisis le pain "3 Fromages"
        Et que je choisis la viande "Boeuf"
        Et que je choisis l'option "Tomate"
        Et que je choisis l'option "Concombre"
        Et je clique sur "Créer mon Burger!"

    Scénario: Contrôler l'état de la commande
        Soit je suis sur la page "Créez votre Burger"
        Lorsque je clique sur "Commandes"
        Alors l'application redirige vers la page "Gestion des commandes"
        Et une commande au nom de "Nicolas" est présente
        Et la commande est au statut En attente

    Scénario: Création automatique d'une commande
        Soit je suis sur la page "Créez votre Burger"
        Lorsque je saisis les informations de commande
        Et je clique sur "Commandes"
        Alors la commande est au statut En attente