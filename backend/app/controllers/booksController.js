import { Author, Book, Category, Notice } from "../models/associations.js";
import { sequelize } from "../models/dbClient.js";
import { Op } from "sequelize";

// Route pour 8 livres en random => la homePage

export const getRandomBook = async (req, res) => {
  try {
    // récuperer 8 livres random pour la home page
    const randomBooks = await Book.findAll({
      order: sequelize.random(), // utilise la fonction random de sequelize
      limit: 8, // limiter la recherche à 8
      include: [
        {
          model: Author,
          as: "author",
          attributes: ["surname", "name"],
        },
        {
          model: Category,
          as: "categories", // inclure les category
          attributes: ["category_name"],
          through: { attributes: [] }, // ignorer les champs de la table de liaison
        },
      ],
    });

    // ajouter le statut du like pour chaque livre
    // uniquement lorsque toutes les autres promesses ont été executées avec succes
    const bookStatus = await Promise.all(
      randomBooks.map(async (book) => {
        // compter le nombres de like pour ce livre
        const likeCount = await Notice.count({
          where: {
            book_id: book.id,
            like: true,
          },
        });

        // Compter le nombre de lectures pour ce livre
        const readCount = await book.countUserRead(); // Utiliser la méthode générée par Sequelize

        return {
          ...book.toJSON(), // conversion de l'objet book en JSON
          likeCount, // ajoute le nombre de likes au livre
          readCount, // afficher le nombre de lectures
        };
      })
    );

    res.json(bookStatus);
  } catch (error) {
    console.error("Erreur lors de la récupération des livres random", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Route pour la totalité des livres => la bibliothèque MBI

export const getAllBooks = async (req, res) => {
  try {
    //récuperer la listes des livres

    const books = await Book.findAll({
      include: [
        {
          association: "author",
          attributes: ["surname", "name"],
        },
        {
          model: Category,
          as: "categories",
          attributes: ["category_name"],
          through: { attributes: [] },
        },
        {
          association: "notice",
        },
      ],
    });
    // ajouter le statut du like pour chaque livre
    // uniquement lorsque toutes les autres promesses ont été executées avec succes
    const bookStatus = await Promise.all(
      books.map(async (book) => {
        // compter le nombres de like pour ce livre
        const likeCount = await Notice.count({
          where: {
            book_id: book.id,
            like: true,
          },
        });

        // Compter le nombre de lectures pour ce livre
        const readCount = await book.countUserRead(); // Utiliser la méthode générée par Sequelize

        return {
          ...book.toJSON(), // conversion de l'objet book en JSON
          likeCount, // ajoute le nbr de likes au livre
          readCount, // ajoute le nombre de lectures
        };
      })
    );
    // réponse de succès
    res.status(200).json(bookStatus);
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les livres", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

export const getOneBook = async (req, res) => {
  try {
    const { id } = req.params;

    const book = await Book.findByPk(id, {
      attributes: ["id", "title", "cover_image", "description"],
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
    });

    if (!book) {
      // si le livre n'existe pas, renvoyer une erreur 404
      return res.status(404).json(`Désolée ce livre n'existe pas !`);
    }
    // compter le nombres de like pour ce livre
    const likeCount = await Notice.count({
      where: {
        book_id: book.id,
        like: true,
      },
    });

    // Compter le nombre de lectures pour ce livre
    const readCount = await book.countUserRead(); // Utiliser la méthode générée par Sequelize

    // ajouter le nombre de likes à l'objet du livre
    const bookWithLikes = {
      ...book.toJSON(), // convertir l'objet book en JSON
      likeCount, // ajouter le nombre de likes
      readCount, // ajouter le nombre de lectures
    };

    res.json(bookWithLikes);
  } catch (error) {
    console.error("Erreur lors de la récupération du détail du livre", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Route delete un livre => detail d'un livre

export const deleteOneBook = async (req, res) => {
  try {
    //suppression d'un livre par son ID (rôle admin)
    const { id } = req.params;
    const book = await Book.findOne({
      where: { id },
    });
    if (!book) {
      // si le livre n'existe pas, renvoyer une erreur 404
      return res.status(404).json({ error: `Désolée ce livre n'existe pas !` });
    }

    // supprimer le livre
    await Book.destroy({
      where: { id },
    });
    // réponse de succès
    res.status(200).json({ message: "Ce livre a bien été suppimé" });
  } catch (error) {
    console.error("Erreur lors de la suppression du livre", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Route update d'un livre => détail d'un livre

export const updateOneBook = async (req, res) => {
  try {
    //modification d'un livre par son ID (rôle admin)
    const { id } = req.params; // récupérer l'ID depuis les paramètres de la requête
    const updateDetailBook = req.body; // récuperer les données fournies depuis le corps de la requête (form front)
    const book = await Book.findOne({
      where: { id },
      include: {
        model: Author,
        as: "author",
        attributes: ["surname", "name"],
      },
    });
    if (!book) {
      // si le livre n'existe pas, renvoyer une erreur 404
      return res.status(404).json({ error: `Désolée ce livre n'existe pas !` });
    }
    // vérifier si un fichier image est téléchargé
    if (req.file) {
      updateDetailBook.cover_image = `/uploads/${req.file.filename}`; // stocker le chemin relatif public et non le chemin système
    }

    // modifié le livre
    await Book.update(updateDetailBook, {
      where: { id },
    });
    // réponse de succès
    res.status(200).json({ message: "Ce livre a bien été modifié" });
  } catch (error) {
    console.error("Erreur lors de la modification du livre", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};

// Route pour ajouter un livre => détail d'un livre

export const addOneBook = async (req, res) => {
  try {
    //ajout d'un livre par son ID (rôle admin)
    let {
      title,
      description,
      date_of_publication,
      ISBN,
      cover_image,
      author_id,
    } = req.body;

    // Vérifier si le livre existe déjà (avec le titre)
    const existingBookTitle = await Book.findOne({ where: { title } });
    if (existingBookTitle) {
      return res.status(409).json({ error: "Ce livre existe déjà !" });
    }

    if (req.file) {
      // newBookDetails.cover_image = req.file.path; // enregistrer le chemin du fichier
      cover_image = `/uploads/${req.file.filename}`; // stocker le chemin relatif public et non le chemin système
    }

    author_id = parseInt(author_id);
    // créer le nouveau livre dans la BDD
    const newBook = await Book.create({
      title,
      description,
      date_of_publication,
      ISBN,
      cover_image,
      author_id,
    });

    // réponse de succès
    res
      .status(201)
      .json({ message: "Ce livre a bien été ajouté", book: newBook });
  } catch (error) {
    console.error("Erreur lors de l'ajout du livre", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
