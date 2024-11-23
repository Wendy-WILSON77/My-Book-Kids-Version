import { Author } from "../models/associations.js";

// Route pour la totalité des Auteurs => la bibliothèque MBI

export const getAllAuthor = async (req, res) => {
  try {
    //récuperer la listes des auteurs
    const allAuthor = await Author.findAll();
    // réponse de succès
    res.status(200).json(allAuthor);
  } catch (error) {
    console.error("Erreur lors de la récupération de tous les livres", error);
    res.status(500).json({ error: "Erreur interne du serveur" });
  }
};
