import emailValidator from "email-validator";
import passwordValidator from "password-validator";
import bcrypt from "bcrypt";

import { User } from "../models/User.js";

export const authController = {
  async registerUser(req, res) {
    try {
      // Récupérer le body : surname, name, email, password, confirm
      const { surname, name, pseudo, email, password, confirmation } = req.body;

      // Valider que tous les champs sont présents ==> Sinon : renvoyer sur la même page mais avec un message d'erreur
      if (
        !surname ||
        !name ||
        !pseudo ||
        !email ||
        !password ||
        !confirmation
      ) {
        res
          .status(400)
          .json({ errorMessage: "Tous les champs sont obligatoires." });
        return;
      }

      // Vérifier le format de l'email (email-validator) ==> Sinon : renvoyer sur la même page mais avec un message d'erreur
      if (!emailValidator.validate(email)) {
        return res.status(400).json({
          errorMessage: "Le format de l'email fourni n'est pas valide.",
        });
      }

      // Vérifier que le MDP + sa confirmation match  ==> Sinon : renvoyer sur la même page mais avec un message d'erreur
      if (password !== confirmation) {
        return res.status(400).json({
          errorMessage:
            "Le mot de passe et sa validation ne correspondent pas.",
        });
      }

      // Vérifier la complexité du mot de passe ==> Sinon : renvoyer sur la même page mais avec un message d'erreur
      const passwordSchema = new passwordValidator()
        .is()
        .min(8)
        .has()
        .uppercase()
        .has()
        .lowercase()
        .has()
        .digits(1);
      if (!passwordSchema.validate(password)) {
        return res.status(400).json({
          errorMessage:
            "Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une majuscule et une minuscule.",
        });
      }

      // Vérifier que l'email n'est pas déjà pris ! ==> Sinon : renvoyer sur la même page mais avec un message d'erreur
      // On cherche dans la BDD UN (findOne) utilisateur DONT (where) le email vaut ....
      const alreadyExistingUser = await User.findOne({
        where: { email: email },
      }); // recherche la valeur mail dans le champ mail de la table user
      if (alreadyExistingUser) {
        // si truthy (object valide), ça veut dire que l'utilisateur existe déjà
        return res
          .status(409)
          .json({ errorMessage: "L'email fourni est déjà utilisé." });
      }

      // Hasher le mot de passe avant de l'enregistrer en base de données
      const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
      const hashedPassword = await bcrypt.hash(password, saltRounds);

      // Créer l'utilisateur en BDD en utilisant Sequelize (donc protège des injections SQL)
      await User.create({
        surname,
        name,
        pseudo,
        isAdmin: false,
        email,
        password: hashedPassword,
      });

      // Rediriger vers la page de login pour permettre à l'utilisateur de se connecter

      res.json({
        successMessage:
          "Compte utilisateur créé avec succès. Veuillez à présent vous authentifier.",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json("500");
    }
  },

  async loginUser(req, res) {
    try {
      // console.log(req.body);

      // Récupérer l'email et le password depuis le body
      const { email, password } = req.body;

      // Récupérer l'utilisateur dans la BDD correspondant à l'email donné
      const user = await User.findOne({ where: { email } });

      // S'il n'existe pas ==> Erreur : mauvais email
      if (!user) {
        return res
          .status(400)
          .json({ errorMessage: "Mauvais couple email/mot de passe." });
      }

      // Comparer à l'aide de bcrypt le mot de passe fourni avec le mot de passe hashé enregistré
      const isMatching = await bcrypt.compare(password, user.password);
      if (!isMatching) {
        // Si ça match pas => Erreur : mauvais mdp
        return res
          .status(400)
          .json({ errorMessage: "Mauvais couple email/mot de passe." });
      }

      //Quand on récupére user on ne veut envoyer le mot de passe vers le front on le delete de l'instance.
      delete user.dataValues.password;

      console.log(req.session.views["/api/login"]);
      req.session.user = user;

      res.status(200).json({ isLoggedIn: true, user: req.session.user });
    } catch (error) {
      console.error(error);
      res.status(500).json("500 : erreur serveur");
    }
  },
  logoutUser(req, res) {
    try {
      // Détruire la session (supprimer la session)
      req.session.destroy();
      // Supprime le cookie de session côté client (vue)
      res.clearCookie("connect.sid");
      res.status(200).json({ message: "Déco réussie" });
    } catch (error) {
      console.error(error);
      res.status(500).json("500 : erreur serveur");
    }
  },
  checkAuth(req, res) {
    // Si l'utilisateur est connecté
    if (req.session && req.session.user) {
      res.status(200).json({
        isLoggedIn: true,
        user: req.session.user.email,
      });
    } else {
      // L'utilisateur n'est pas connecté
      res
        .status(401)
        .json({ isLoggedIn: false, message: "Utilisateur non connecté" });
    }
  },
};
