import { Book, User } from "../models/associations.js";

export const toggleReadBook = async (req, res) => {
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

    // vérifier si l'utilisateur a déjà enregistré ce livre comme lu
    const hasRead = await book.hasUserRead(userId); // utilisation de la méthode générée par sequelize

    if (hasRead) {
      // si le livre est marqué comme lu, on le retire
      await book.removeUserRead(userId); // Supprimer la relation de la table 'user_read_book'

      // compter combien d'utilisateurs on lu ce livre
      const readCount = await book.countUserRead(); // méthode pour compter les relations

      return res.status(200).json({
        message: "Le livre a été marqué comme non lu",
        read: false,
        readCount: readCount,
      });
    } else {
      // sinon, on marque le livre comme lu
      await book.addUserRead(userId); // ajouter la relation dans 'user_read_book'

      // compter combien d'utilisateurs ont lu ce livre
      const readCount = await book.countUserRead(); // méthode pour compter les relations

      return res.status(200).json({
        meassage: "Le livre a été marqué comme lu",
        read: true,
        readCount: readCount,
      });
    }
  } catch (error) {
    console.error(
      `Erreur lors de la modification de l'état de lecture.`,
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
