import "dotenv/config";
import express from "express";
import { router } from "./app/router/router.js"; 
import cors from 'cors';
import parseurl from "parseurl";
import session from 'express-session';
import { createClient } from 'redis';
import RedisStore from 'connect-redis';

const redisClient = createClient({
  url: process.env.UPSTASH_REDIS_URL,
});

redisClient.connect().catch(console.error);

const redisStore = new RedisStore({
  client: redisClient,
  prefix: "mbk-sess:",
})


export const app = express();

app.set('trust proxy', 1); // render proxy?


app.use(
  session({
    store: redisStore,
    secret: "forest squirrel",
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: true, // true uniquement en production
      sameSite: 'None',
      httpOnly: true,
    }
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