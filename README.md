# My-Book-Kids-Version

Ce repo est réalisé dans le but de faire une démonstration pour le passage du Titre Professionnel DWWM.
En effet, j'ai mis en place un Docker Compose pour faire tourner mon projet React.


démarrer :  docker compose up -d

arrêter:  docker compose down

voir les logs : docker compose logs frontend

aller dans le terminal d'un conteneur : docker exec -it nom-container sh

récupérer le nom d'un conteneur : docker ps

front : http://localhost:5173
back : http://localhost:3000
adminer (DB interface) : http://localhost:8080