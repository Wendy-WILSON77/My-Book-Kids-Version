import React, { useState, useEffect } from "react";
import api from "../../utils/axios/axiosInstance";

const CommentsSection = ({ bookId }) => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false); // Gérer l'état de soumission

  // Récupérer les commentaires
  const fetchComments = async () => {
    setLoading(true);
    try {
      const response = await api.get(`/notice/${bookId}`);
      console.log("Commentaires récupérés:", response.data); // Affichez les commentaires dans la console
      setComments(response.data); // Mettez à jour les commentaires récupérés
    } catch (err) {
      console.error("Erreur lors de la récupération des commentaires:", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (bookId) {
      fetchComments(); // Récupérer les commentaires à chaque fois que bookId change
    }
  }, [bookId]); // Quand bookId change, récupère les commentaires

  // Ajouter un nouveau commentaire
  const handleAddComment = async (e) => {
    e.preventDefault(); // Empêcher le rechargement de la page
    if (!newComment.trim()) {
      return; // Ne rien faire si le commentaire est vide
    }

    setIsSubmitting(true); // Indiquer que la soumission est en cours

    try {
      const response = await api.post(`/notice/${bookId}`, {
        commentary: newComment,
      });
      console.log("Nouveau commentaire ajouté:", response.data); // Vérifiez ce qui est renvoyé par l'API
      // Ajoute le nouveau commentaire à la liste existante
      setComments((prevComments) => [response.data, ...prevComments]);
      setNewComment(""); // Réinitialiser le champ de commentaire
    } catch (err) {
      console.error("Erreur lors de l'ajout du commentaire:", err);
      setError(err);
    } finally {
      setIsSubmitting(false); // Fin de la soumission
    }
  };

  if (loading) {
    return <div>Chargement des commentaires...</div>; // Affiche le message de chargement
  }

  if (error) {
    return <div>Erreur : {error.message}</div>; // Affiche l'erreur
  }

  return (
    <div className="comments-section mt-8">
      <h2 className="text-2xl font-bold mb-4">Les avis</h2>
      {/* Liste des commentaires */}
      <div className="comments-list bg-gray-100 p-4 rounded-lg shadow-md mb-6">
        {comments.length > 0 ? (
          comments.map((comment, index) => (
            <div key={index} className="comment-item mb-3 text-gray-800">
              {comment.commentary} {/* Affichage du commentaire */}
            </div>
          ))
        ) : (
          <p className="text-gray-600">Aucun commentaire pour le moment.</p>
        )}
      </div>
      {/* Formulaire pour ajouter un commentaire */}
      <form onSubmit={handleAddComment} className="flex flex-col space-y-3">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Ajoutez votre commentaire..."
          className="p-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-400"
          rows="4"
        />
        <button
          type="submit"
          className="bg-teal-600 text-white py-2 px-4 rounded-lg shadow-md hover:bg-orange-500 transition-all duration-200"
          disabled={isSubmitting} // Désactive le bouton pendant la soumission
        >
          {isSubmitting ? "Envoi en cours..." : "Envoyer"}
        </button>
      </form>
    </div>
  );
};

export default CommentsSection;
