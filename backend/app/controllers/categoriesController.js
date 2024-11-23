import { Category } from "../models/associations.js";

// Route pour la totalité des catégories => la bibliothèque MBI

export const getAllCategories = async (req, res) =>{
    try { //récuperer la listes des catégory
        const allCategory = await Category.findAll();
        // réponse de succès
        res.status(200).json(allCategory);
    } catch(error) {
        console.error('Erreur lors de la récupération de tous les livres', error);
        res.status(500).json({error: 'Erreur interne du serveur'});
    }
};