import { User, List, Book } from "../models/associations.js";
import bcrypt from "bcrypt";
import PasswordValidator from "password-validator";
import { Model } from "sequelize";

export const getMonProfil = async (req, res) => {
  try {
    // accéder aux informations personnelles de l'utilisateur
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    //récuperer la liste des informations personelles de l'utilisateur via son ID
    const userProfil = await User.findOne({
      where: { id: userId }, // filtrer par l'ID de l'utilisateur connecté
      attributes: [
        "email",
        "surname",
        "name",
        "pseudo",
        "isAdmin",
        "date_inscription",
      ], // les champs à retourner
    });
    // si l'user n'est pas trouvé
    if (!userProfil) {
      return res.status(404).json({ message: `Utilisateur non trouvé.` });
    }
    // réponse de succès et envoi des informations du profil
    res.status(200).json(userProfil);
  } catch (error) {
    console.error(
      "Erreur lors de la récupération des informations personnelles de l'utilisateur",
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

const passwordSchema = new PasswordValidator()
  .is()
  .min(8)
  .has()
  .uppercase()
  .has()
  .lowercase()
  .has()
  .digits(1);

export const updateMonProfil = async (req, res) => {
  try {
    // accéder aux informations personnelles de l'utilisateur
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    const { email, surname, name, pseudo, password, newPassword } = req.body; //-_-
    //récuperer la liste des informations personelles de l'utilisateur via son ID
    const userProfil = await User.findOne({
      where: { id: userId }, // filtrer par l'ID de l'utilisateur connecté
    });
    // si l'user n'est pas trouvé
    if (!userProfil) {
      return res.status(404).json({ message: `Utilisateur non trouvé.` });
    }

    // mettre à jour les autres infos si elles sont fournies
    if (email) userProfil.email = email;
    if (surname) userProfil.surname = surname;
    if (name) userProfil.name = name;
    if (pseudo) userProfil.pseudo = pseudo;

    // Vérifier et maj les infos perso
    if (password && newPassword) {
      // vérifier le mot de passe actuel
      const isPasswordValid = await bcrypt.compare(
        password,
        userProfil.password
      );
      if (!isPasswordValid) {
        return res
          .status(400)
          .json({ message: `Mot de passe actuel incorrect.` });
      }

      if (!passwordSchema.validate(newPassword)) {
        return res
          .status(400)
          .json({
            errorMessage:
              "Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une majuscule et une minuscule.",
          });
      }
      // Hacher le nouveau mot de passe grace à Bcrypt
      const hashedNewPassword = await bcrypt.hash(newPassword, 10); // 10tou de salage "SECU en+ ,ajoute des caractère en plus du hachage de bcrypt AVANT d'etre stocké en BDD"
      userProfil.password = hashedNewPassword;
    }
    console.log("après maj", userProfil);
    // sauvegarder les modifications
    await userProfil.save();

    // réponse de succès et envoi des informations du profil
    res.status(200).json({ message: "Profil mis à jour avec succès" });
  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil utilisateur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const deleteMonProfil = async (req, res) => {
  try {
    // supprimer le compte de l'utilisateur
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    //récuperer la liste des informations personelles de l'utilisateur via son ID
    const userProfil = await User.findOne({
      where: { id: userId }, // filtrer par l'ID de l'utilisateur connecté
      include: [
        {
          model: List,
          as: "list",
          include: [
            {
              model: Book,
              as: "book",
            },
          ],
        },
      ],
    });
    // si l'user n'est pas trouvé
    if (!userProfil) {
      return res.status(404).json({ message: `Utilisateur non trouvé.` });
    }
    // Supprimer la liste de livres si elle existe
    if (userProfil.list) {
      // retirer tous les livres de la liste
      await userProfil.list.setBook([]); // le 'set' dissocie tout les enregistrements de la relation (book list)
      // supprimer la liste
      await userProfil.list.destroy();
    }
    // supprimer l'utilisateur
    await userProfil.destroy();

    // détruire la session de l'utilisateur
    req.session.destroy();

    // réponse de succès
    res.status(200).json({ message: "Profil supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du profil utilisateur", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
