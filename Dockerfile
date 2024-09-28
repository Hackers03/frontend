FROM node:alpine

WORKDIR /Frontend

COPY . .

# Construction de l'application
#RUN npm run build

# Nettoyage des fichiers non nécessaires après la construction
#RUN rm -rf src .dockerignore Dockerfile


# Expose le port utilisé par l'application
EXPOSE 3000

# Commande pour démarrer l'application
# CMD [ "npm", "start", "--", "-H", "0.0.0.0"]
CMD [ "npm", "run", "dev", "--", "-H", "0.0.0.0"]
