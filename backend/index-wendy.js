import "dotenv/config";
import express from "express";
import { router } from "./app/router/router.js"; 
import cors from 'cors';
import session from 'express-session';
import parseurl from 'parseurl';
import { Redis } from '@upstash/redis';
import connectRedis from 'connect-redis';

// Initialiser le client Upstash Redis
const redis = new Redis({
  url: 'https://proper-tetra-29874.upstash.io',
  token: 'AXSyAAIjcDE5OTc5ZWQ5NjA1OGI0NTRhYWQ4NGU2ZDljMDhiYzhiNHAxMA',
});

// Exemple de définition d'une valeur dans Upstash Redis
await redis.set('foo', 'bar');

// Configurer connect-redis avec une fonction pour obtenir un client Redis compatible
const RedisStore = new connectRedis(session); // La bonne façon d'initialiser RedisStore

// Créer un client Redis compatible pour connect-redis
const redisClient = {
  get: (key, callback) => {
    redis.get(key).then(result => callback(null, result)).catch(err => callback(err));
  },
  set: (key, value, callback) => {
    redis.set(key, value).then(result => callback(null, result)).catch(err => callback(err));
  },
  del: (key, callback) => {
    redis.del(key).then(result => callback(null, result)).catch(err => callback(err));
  }
};

export const app = express();

console.log('REDIS_URL:', process.env.REDIS_URL);

app.use(
  session({
    store: new RedisStore({ client: redisClient }), // Utilisation du mot-clé `new`
    secret: "forest squirrel",
    resave: false,
    saveUninitialized: true,
  })
);

app.use(function (req, res, next) {
  if (!req.session.views) {
    req.session.views = {};
  }

  // obtenir le chemin de l'URL
  var pathname = parseurl(req).pathname;

  // compter les vues
  req.session.views[pathname] = (req.session.views[pathname] || 0) + 1;
  next();
});

app.get("/foo", function (req, res, next) {
  res.send("vous avez consulté cette page " + req.session.views["/foo"] + " fois");
});

app.get("/bar", function (req, res, next) {
  res.send("vous avez consulté cette page " + req.session.views["/bar"] + " fois");
});

// Body parser (JSON/urlEncoded)
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// Ajouter les CORS
const whitelist = ["https://mybookkidsversion.vercel.app", "http://localhost:5173"];

app.use(cors({
  origin: whitelist,
  credentials: true
}));

// configuration des headers pour autoriser le front-end à accéder à l'API
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (whitelist.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  res.header("Access-Control-Allow-Credentials", "true");
  next();
});

// Utiliser le router /api 
app.use("/api", router);

// Exemple d'une route spécifique
app.get('/protected-route', (req, res) => {
  if (!req.headers.authorization) {
    res.setHeader('WWW-Authenticate', 'Basic realm="example"');
    return res.status(401).json({ message: 'Non autorisé' });
  }
  res.send('route protégée');
});

// Middleware 404
app.use((req, res, next) => {
  res.status(404).json('La page demandée est introuvable');
});

// démarrer le serveur
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`🚀 Serveur en écoute à http://localhost:${port}`);
});