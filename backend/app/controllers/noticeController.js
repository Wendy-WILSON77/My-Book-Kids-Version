import { where } from "sequelize";
import { Notice, Book, User } from "../models/associations.js";

export const getNotice = async (req, res) => {
  try {
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    const { id: bookId } = req.params; // récup l'id du livre depuis les paramètres
    if (!bookId) {
      return res
        .status(400)
        .json({ message: `L'identifiant du livre est requis.` });
    }
    //récuperer la liste des commentaires pour ce livre (id)
    const noticeList = await Notice.findAll({
      where: { book_id: bookId },
      include: [
        {
          association: "user",
          attributes: ["surname", "name"],
        },
        {
          association: "book",
          attributes: ["title"],
        },
      ],
    });

    if (noticeList.length === 0) {
      return res
        .status(400)
        .json({ message: `Aucun commentaire trouvé pour ce livre.` });
    }
    // réponse de succès
    res.status(200).json(noticeList);
  } catch (error) {
    console.error("Erreur lors de la récupération des commentaires", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
export const addNotice = async (req, res) => {
  try {
    const userId = req.session.user.id; // Vérifie si l'ID de l'utilisateur est correctement récupéré
    console.log("User ID:", userId); // Ajoute un log pour vérifier l'ID de l'utilisateur

    const { id: bookId } = req.params;
    const { comment } = req.body;

    if (!bookId) {
      return res
        .status(400)
        .json({ message: "L'identifiant du livre est requis." });
    }
    if (!comment) {
      return res
        .status(400)
        .json({ message: "Le commentaire ne peut pas être vide." });
    }

    // Créer le nouveau commentaire
    const newCommentary = await Notice.create({
      book_id: bookId,
      user_id: userId,
      commentary: comment,
    });

    // Réponse de succès
    res
      .status(201)
      .json({
        message: "Commentaire ajouté avec succès.",
        notice: newCommentary,
      });
  } catch (error) {
    console.error("Erreur lors de l'ajout du commentaire", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const deleteNotice = async (req, res) => {
  try {
    // récup les ID du livre et du commentaire depuis les paramètres de la requête
    const { id: bookId } = req.params;
    const { noticeId } = req.body;

    if (!bookId) {
      return res
        .status(404)
        .json({ message: `L\'identifiant du livre est requis.` });
    }

    if (!bookId) {
      return res
        .status(404)
        .json({ message: `L\'identifiant du commentaire est requis.` });
    }

    // vérifier si le commentaire appartient au livre spécifié
    const commentary = await Notice.findOne({
      where: { id: noticeId, book_id: bookId },
    });

    if (!commentary) {
      return res
        .status(404)
        .json({ message: "Commentaire non trouvé pour ce livre." });
    }

    // supprimer le commentaire
    await commentary.destroy();

    // réponse de succès
    res.status(200).json({ message: "Commentaire supprimé avec succès" });
  } catch (error) {
    console.error("Erreur lors de la suppression du commentaire", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
