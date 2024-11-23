import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import { useAuth } from "../../context/authContext"; // import du contexte d'authentification

function GroupButton({ book, index, books, setBooks }) {
  // Recevoir l'objet `book` et `books` directement depuis le state de BooksHome
  const { isLogged } = useAuth(); // Vérifier si l'utilisateur est connecté
  const navigate = useNavigate();
  const [notification, setNotification] = useState(""); // État pour gérer la notification
  const [isLoading, setIsLoading] = useState(false);
  const [showNotification, setShowNotification] = useState(false); // État pour afficher/masquer la notification

  const toggleLikeBook = async () => {
    if (!isLogged) {
      alert("Tu dois être connecté pour liker ce livre");
      navigate("/connexion");
      return;
    }

    try {
      const response = await api.post(`/book/${book.id}/like`);
      // Mettre à jour l'état du livre en fonction de la réponse
      const updatedBooks = [...books];
      updatedBooks[index].liked = response.data.liked;
      updatedBooks[index].likeCount = response.data.likeCount;
      setBooks(updatedBooks);
    } catch (error) {
      console.log("Erreur lors du like/unlike du livre", error);
    }
  };

  const toggleBookList = async () => {
    if (!isLogged) {
      alert("Tu dois être connecté pour ajouter ce livre à ta liste");
      navigate("/connexion"); // Redirection vers la page de connexion
      return;
    }

    try {
      setIsLoading(true);
      const response = await api.post(`/book/${book.id}/like`);

      // Vérification de la réponse
      if (!response.data) throw new Error("Réponse invalide");

      // Mise à jour sécurisée des livres
      if (books && Array.isArray(books)) {
        const updatedBooks = books.map((b, idx) => {
          if (idx === index) {
            return {
              ...b,
              liked: response.data.liked,
              likeCount: response.data.likeCount || 0,
            };
          }
          return b;
        });
        setBooks(updatedBooks);
        showNotification(response.data.message);
      }
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout/suppression du livre à la liste",
        error
      );
    }
  };

  return (
    <div className="books-btn-group">
      {showNotification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg max-w-sm sm:max-w-md text-sm sm:text-base">
          {notification}
        </div>
      )}

      <button
        className="btn btn-primary px-4 py-2 btn-xs lg:btn-lg"
        onClick={toggleLikeBook} // Appel de la fonction `toggleLikeBook`
        style={{ color: book.liked ? "purple" : "white" }} // Changement de couleur pour le pouce liké ou non
      >
        <i className="fas fa-thumbs-up"></i> {book.likeCount}
      </button>
      <button
        className="btn btn-primary btn-xs lg:btn-lg"
        onClick={toggleBookList} // Appel de la fonction `toggleBookList`
        style={{ color: book.addedToList ? "red" : "white" }} // Changement de couleur du coeur ajouté/retiré de la liste
      >
        <i className="fas fa-heart"></i>
      </button>
    </div>
  );
}

export default GroupButton;
