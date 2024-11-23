import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import { useAuth } from "../../context/authContext"; // Importer le contexte d'authentification
import "../library/LikesAndSummary.scss";

function LikesAndSummary({ book, index, books, setBooks }) {
  // Recevoir l'objet `book` et `books` directement depuis le state de BooksHome
  const { isLogged } = useAuth(); // Vérifier si l'utilisateur est connecté
  const navigate = useNavigate();
  const [notification, setNotification] = useState(""); // État pour gérer la notification
  const [showNotification, setShowNotification] = useState(false); // État pour afficher/masquer la notification

  const handleClick = (book) => {
    console.log(book);
  };

  const toggleLikeBook = async () => {
    if (!isLogged) {
      alert("Tu dois être connecté pour liker ce livre");
      navigate("/connexion");
      return;
    }

    try {
      const response = await api.post(`/book/${book.id}/like`);
      // Màj de l'état du livre en fonction de la réponse
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
      navigate("/connexion");
      return;
    }

    try {
      const response = await api.post("/toggleList", { bookId: book.id });

      // Vérifiez que `books` est bien un tableau
      if (!Array.isArray(books)) {
        console.error("books is not an array");
        return;
      }

      // Vérifiez que l'index est valide
      if (index < 0 || index >= books.length) {
        console.error("Invalid index");
        return;
      }

      // MàJ l'état du livre en fonction de la réponse
      const updatedBooks = [...books];
      updatedBooks[index].addedToList = !updatedBooks[index].addedToList;
      setBooks(updatedBooks);

      // Définir un message de notification
      setNotification(
        updatedBooks[index].addedToList
          ? "Ce livre a bien été ajouté à ta liste !"
          : "Ce livre a bien été retiré de ta liste."
      );
      setShowNotification(true);

      // Masquer la notification après 3 sec
      setTimeout(() => {
        setShowNotification(false);
      }, 3000);
    } catch (error) {
      console.log(
        "Erreur lors de l'ajout/suppression du livre à la liste",
        error
      );
    }
  };

  return (
    <div className="library-btn-group">
      {showNotification && (
        <div className="fixed top-5 right-5 bg-green-500 text-white p-4 rounded-md shadow-lg max-w-sm sm:max-w-md text-sm sm:text-base">
          {notification}
        </div>
      )}

      <button
        className="btn btn-primary btn-xs lg:btn-lg"
        onClick={toggleLikeBook} // Appel de la fonction `toggleLikeBook`
        style={{ color: book.liked ? "yellow" : "black" }} // Changement de couleur pour le pouce liké ou non
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

      <Link to={`/books/${book.id}`}>
        <button
          className="btn btn-neon large-button p-2 float-right"
          onClick={() => handleClick(book)}
        >
          En savoir plus
        </button>
      </Link>
    </div>
  );
}

export default LikesAndSummary;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import axios from 'axios';
// import "../library/LikesAndSummary.scss";
// import api from "../../utils/axios/axiosInstance";

// const handleClick = (book) => {
//   console.log(book);
// };

// const favToBiblio = (book) => {
//   alert(`Le livre "${book.title}" est bien ajouté à tes favoris.`);
// };

// const removeFromBiblio = (book) => {
//   alert(`Le livre "${book.title}" a été retiré de tes favoris.`);
// };

// function LikesAndSummary({ book, handleClick, favToBiblio }) {
//   const [likes, setLikes] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [hasLiked, setHasLiked] = useState(false);

//   useEffect(() => {
//     const savedLikes = localStorage.getItem(`likes-${book.id}`);
//     const savedIsFavorite = localStorage.getItem(`isFavorite-${book.id}`);
//     const okLiked = localStorage.getItem(`okLiked-${book.id}`);

//     if (savedLikes) setLikes(parseInt(savedLikes));
//     if (savedIsFavorite) setIsFavorite(savedIsFavorite === "true");
//     if (okLiked) setHasLiked(okLiked === "true");
//   }, [book.id]);

//   const handleLikeClick = async () => {
//     const okLiked = localStorage.getItem(`okLiked-${book.id}`);
//     let newLikes;
//     if (!okLiked) {
//       newLikes = likes + 1;
//       setLikes(newLikes);
//       localStorage.setItem(`likes-${book.id}`, newLikes);
//       localStorage.setItem(`okLiked-${book.id}`, "true");
//       setHasLiked(true);
//     } else {
//       newLikes = likes - 1;
//       setLikes(newLikes);
//       localStorage.setItem(`likes-${book.id}`, newLikes);
//       localStorage.removeItem(`okLiked-${book.id}`);
//       setHasLiked(false);
//     }

//     try {
//       const response = await api.post(`/book/${book.id}/like`, {
//         likes: newLikes,
//       });
//       console.log(response);
//       console.log('Données du pouce envoyées avec succès');
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données', error);
//     }
//   };

//   const handleFavoriteClick = async () => {
//     if (!isFavorite) {
//       setIsFavorite(true);
//       localStorage.setItem(`isFavorite-${book.id}`, "true");
//       favToBiblio(book);
//     } else {
//       setIsFavorite(false);
//       localStorage.setItem(`isFavorite-${book.id}`, "false");
//       removeFromBiblio(book);
//     }

//     try {
//       const response = await api.post(`/toggleList`, {
//         isFavorite: !isFavorite,
//       });
//       console.log(response);
//       console.log('Données du coeur envoyées avec succès');
//     } catch (error) {
//       console.error('Erreur lors de l\'envoi des données', error);
//     }
//   };

//   return (
//     <div className="btn-group">
//       <button
//         className="btn btn-primary btn-xs"
//         onClick={handleLikeClick}
//       >
//         <i className="fas fa-thumbs-up"></i> {likes}
//       </button>
//       <button
//         className="btn btn-primary btn-xs"
//         onClick={handleFavoriteClick}
//         style={{ color: isFavorite ? "red" : "white" }}
//       >
//         <i className="fas fa-heart"></i>
//       </button>
//       <Link to={`/books/${book.id}`}>
//         <button
//           className="en-svr btn btn-neon center-button large-button"
//           onClick={() => handleClick(book)}
//         >
//           En savoir plus
//         </button>
//       </Link>
//     </div>
//   );
// }

// export default LikesAndSummary;
