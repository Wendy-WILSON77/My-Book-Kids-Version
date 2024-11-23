import { Author, Book, Category, List, User } from "../models/associations.js";

export const toggleBookList = async (req, res) => {
  try {
    // Récupérer l'ID de l'utilisateur connecté (via session)
    const userId = req.session.user.id;
    const { bookId } = req.body; // Récupérer l'id du livre dans la requête

    // Vérifier si le livre existe dans la BDD
    const book = await Book.findByPk(bookId, {
      include: [
        {
          model: Category,
          as: "categories", // Inclure les catégories liées au livre
        },
      ],
    });
    if (!book) {
      return res
        .status(404)
        .json({ message: `Ce livre n'existe pas en base de données.` });
    }

    // Récupérer les détails de l'utilisateur
    const user = await User.findByPk(userId);
    if (!user) {
      return res.status(404).json({ message: "Utilisateur non trouvé." });
    }

    // Vérifier si l'utilisateur a déjà une liste
    let userBookList = await List.findOne({
      where: { user_id: userId },
      include: [
        {
          model: Book,
          as: "book", // Alias dans l'association
          through: { attributes: [] }, // Extraire les attributs de la table de liaison
        },
      ],
    });

    // Si la liste n'existe pas, on la crée
    if (!userBookList) {
      const categoryNames = book.categories.map((cat) => cat.name).join(",");
      userBookList = await List.create({
        user_id: userId, // Créer une nouvelle liste pour cet utilisateur
        title: `${user.pseudo}`, // Titre de la liste basé sur le titre du premier livre ajouté
        category_name: categoryNames,
      });
    }

    // Vérifier si le livre est déjà dans la liste
    const isBookInList =
      userBookList.book && userBookList.book.some((b) => b.id === bookId);

    if (isBookInList) {
      // Si le livre est dans la liste, on le retire
      await userBookList.removeBook(book); // Retirer le livre de la liste
      return res
        .status(200)
        .json({ message: "Livre retiré de la liste avec succès" });
    } else {
      // Si le livre n'est pas dans la liste, on l'ajoute
      await userBookList.addBook(book); // Ajouter le livre
      return res
        .status(200)
        .json({ message: "Livre ajouté à la liste avec succès" });
    }
  } catch (error) {
    console.error(
      `Erreur lors de l'ajout ou de la suppression du livre à la liste`,
      error
    );
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getBookList = async (req, res) => {
  try {
    // récupérer la liste des livres dans la liste de l'utilisateur
    const userId = req.session.user.id; // Récupérer l'ID de l'utilisateur connecté (via session)
    // récupérer les livres de la liste de l'user
    const userBookList = await List.findOne({
      where: {
        user_id: userId, // filtrer les listes appartenant à l'user connecté
      },
      include: [
        {
          model: Book,
          as: "book",
          include: [
            {
              model: Author,
              as: "author",
              attributes: ["surname", "name"],
            },
            {
              model: Category,
              as: "categories",
              attributes: ["category_name"],
              through: { attributes: [] },
            },
          ],
        },
      ],
    });
    // si aucune liste n'est trouvée === vide
    if (!userBookList || userBookList.length === 0) {
      return res
        .status(404)
        .json({ message: "Aucune liste existante pour cet utilisateur" });
    }
    res.status(200).json(userBookList);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres de la liste");
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
