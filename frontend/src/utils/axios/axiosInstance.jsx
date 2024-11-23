import axios from 'axios';

const baseURL = import.meta.env.VITE_API_URL;

const api = axios.create({
   
    withCredentials: true, // envoyer les cookies avec les requêtes
    // baseURL: 'http://localhost:3000/api'   
    // baseURL: ['http://localhost:3000/api', 'https://mbi-back.onrender.com/api'],
    // baseURL: 'https://mbi-back.onrender.com/api',
    baseURL, // variable d'environnement car j'utilise Vite 
    headers: {
        'Content-Type': 'application/json', //type de contenu envoyé dans la requête
        'Accept': 'application/json', //type de contenu accepté dans la réponse du serveur
    }
}); 

export default api;