import React, { useEffect, useState } from "react";
import "./HomeInformation.scss";
import api from "../../utils/axios/axiosInstance";

function PalmeDor() {
  const [books, setBooks] = useState([]); // Déclaration du state pour stocker tous les livres
  const [currentBookIndex, setCurrentBookIndex] = useState(0); // Déclaration du state pour l'index du livre actuellement affiché

  useEffect(() => {
    const fetchAllBooks = async () => {
      // Fonction asynchrone pour récupérer tous les livres
      try {
        const response = await api.get("/randomBooks"); // Requête GET vers l'endpoint /randomBooks
        setBooks(response.data); // Mise à jour du state avec les données récupérées
      } catch (error) {
        console.error("Erreur à la récupération des données Palme Dor", error); // Affichage de l'erreur en cas de problème
      }
    };

    fetchAllBooks(); // Appel de la fonction pour récupérer les livres immédiatement lors du montage de la composante

    const fetchIntervalId = setInterval(fetchAllBooks, 2 * 60 * 1000); // Récupération des nouveaux livres toutes les 2 minutes

    const switchIntervalId = setInterval(
      () => {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length); // Changement de l'index pour afficher le livre suivant toutes les 2 minutes
      },
      2 * 60 * 1000
    );

    return () => {
      clearInterval(fetchIntervalId); // Nettoyage de l'intervalle de récupération des livres lors du démontage de la composante
      clearInterval(switchIntervalId); // Nettoyage de l'intervalle de changement de livre lors du démontage de la composante
    };
  }, [books.length]); // Re-exécution de l'effet si la longueur du tableau books change

  const currentBook = books[currentBookIndex]; // Récupération du livre actuellement affiché

  const baseURL =
    import.meta.env.VITE_API_URL || "https://mbi-back.onrender.com/api";
  if (!import.meta.env.VITE_API_URL) {
    console.warn(
      "VITE_API_URL n'est pas définie. Utilisation de l'URL par défaut."
    );
  }

  return (
    <div className="container">
      <div className="logo-text">
        {currentBook ? (
          <>
            <img
              className="bookIntro w-full object-cover rounded-md bookIntro roll"
              //   src={`https://mbi-back.onrender.com/${currentBook.cover_image}`}
              src={`${baseURL.replace("/api", "")}/${currentBook.cover_image}`}
              alt="book"
              style={{ width: "10vw", height: "10vw", borderRadius: "50%" }}
            />
            <div className="text-content">
              <h2 className="mt-1 mb-2 text-teal-500 text-1xl font-bold ">
                Et si on découvrait ...
              </h2>
              <div className="books-card glass p-5" data-id={currentBook.id}>
                <p className="mt-4 text-base lg:text-lg text-center">
                  "{currentBook.title}" de {currentBook.author.name},{" "}
                  {currentBook.author.surname}
                </p>
                <p className="mt-2 text-sm lg:text-base text-center">
                  proposé par un fidèle lecteur
                </p>
                <p className="mt-3 text-sm font-bold">Bonne lecture !</p>
              </div>
            </div>
          </>
        ) : (
          <p className="mt-2 text-sm lg:text-base text-center">loading...</p>
        )}
      </div>
    </div>
  );
}

export default PalmeDor;
