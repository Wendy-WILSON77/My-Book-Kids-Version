import { Book, User, Notice } from "../models/associations.js";

export const toggleLikeBook = async (req, res) => {
  try {
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    const { id } = req.params; // récup l'id du book dans les paramètres de la requête

    if (!id) {
      return res
        .status(404)
        .json({ message: "Lidentifiant du livre est requis." });
    }

    // Chercher le livre
    const book = await Book.findByPk(id);
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé." });
    }

    // chercher l'avis de l'utilisateur pour ce livre (le like)
    let likeNotice = await Notice.findOne({
      where: {
        user_id: userId,
        book_id: id,
      },
    });

    if (likeNotice) {
      // on vérifie si l'utilisateur a déjà liké le livre
      await Notice.update(
        { like: !likeNotice.like },
        { where: { id: likeNotice.id } } // pour spécifier quel enregistrement mettre à jour
      );
      // rechercher l'avis mis à jour
      const updateNotice = await Notice.findByPk(likeNotice.id);

      // compter le nombre de likes pour ce livre
      const likeCount = await Notice.count({
        where: {
          book_id: id,
          like: true,
        },
      });

      // on inverse l'état du like
      return res.status(200).json({
        // on renvoi un message et l'état actuel du like
        message: updateNotice.like
          ? "Vous aimez ce livre."
          : "Vous n'aimez plus ce livre.",
        liked: updateNotice.like,
        likeCount: likeCount,
      });
    } else {
      // ajouter un nouveau like
      await Notice.create({
        user_id: userId,
        book_id: id,
        like: true,
      });
      // compter le nombre de likes pour ce livre
      const likeCount = await Notice.count({
        where: {
          book_id: id,
          like: true,
        },
      });

      return res
        .status(200)
        .json({
          message: "Vous aimez ce livre.",
          liked: true,
          likeCount: likeCount,
        });
    }
  } catch (error) {
    console.error(
      `Erreur lors de l'ajout ou de la suppression du like.`,
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
