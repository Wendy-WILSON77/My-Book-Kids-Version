import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom"; 
import "../list/PersonnalLibraryPage.scss";
import IntroPersonnalLibrary from "./IntroPersonnalLibrary";
import { useAuth } from "../../context/authContext";
import api from "../../utils/axios/axiosInstance";
import GroupButtonList from "./GroupButtonList";

function PersonnalLibraryPage() {
  const [userBooks, setUserBooks] = useState([]); // État pour stocker les livres de l'utilisateur
  const [loading, setLoading] = useState(true); // État pour indiquer si les données sont en cours de chargement
  const [error, setError] = useState(null); // État pour stocker les erreurs éventuelles
  const [notification, setNotification] = useState(""); // État pour gérer la notification
  const [showNotification, setShowNotification] = useState(false); // État pour afficher/masquer la notification

  const { user, isLogged } = useAuth(); // Extraction des informations utilisateur et de l'état de connexion depuis le contexte d'authentification
  const navigate = useNavigate(); // Initialisation de navigate pour la redirection

  const imgRefs = useRef([]); // Référence pour chaque image à observer

  // useEffect pour récupérer la liste des livres de l'utilisateur au chargement du composant
  useEffect(() => {
    const getList = async () => {
      try {
        const response = await api.get("/list"); // Appel API pour récupérer la liste des livres
        const list = response.data;

        if (list && list.book && list.book.length > 0) {
          setUserBooks(list.book); // Màjour état avec la liste des livres
        } else {
          setError(new Error("Aucune liste de livres trouvée")); // Gestion du cas où aucune liste n'est trouvée
        }

        setLoading(false); // Fin du chargement
      } catch (error) {
        console.error("Error fetching data:", error); // Affichage de l'erreur dans la console
        setError(error); // Mise à jour de l'état avec l'erreur
        setLoading(false); // Fin du chargement
      }
    };
    getList(); // Appel de la fonction pour récupérer la liste des livres
  }, []);

  // Fonction pour liker/unliker un livre
  const toggleLikeBook = async (book, index) => {
    if (!isLogged) {
      alert("Tu dois être connecté pour liker ce livre");
      navigate("/connexion"); 
      return;
    }

    try {
      const response = await api.post(`/toggleList`, { bookId: book.id }); 

      if (response.data.liked) {
        // Si le livre a été liké, mettre à jour l'état local
        const updatedBooks = [...userBooks];
        updatedBooks.splice(index, 1); // Suppression du livre de la liste locale
        setUserBooks(updatedBooks); // Màjl'état avec la nouvelle liste
      } else {
        // Si le livre a été unliké, mettre à jour l'état local
        const updatedBooks = [...userBooks];
        updatedBooks.splice(index, 1); // Suppression du livre de la liste locale
        setUserBooks(updatedBooks); // Màj état avec la nouvelle liste
      }
    } catch (error) {
      console.log("Erreur lors du like/unlike du livre", error); // Affichage de l'erreur dans la console
    }
  };

  // useEffect pour configurer l'observateur d'Intersection Observer pour le lazy loading des images
  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              if (img && img.dataset.src) {
                img.src = img.dataset.src; // Charger l'image à partir de l'attribut data-src
                observer.unobserve(img); // Ne plus observer cette image
              }
            }
          });
        },
        {
          rootMargin: "0px 0px 50px 0px", // L'image sera chargée un peu avant d'entrer dans le viewport
          threshold: 0.04, // Seuil de déclenchement (4% de l'image visible)
        }
      );

      // Observer chaque image
      imgRefs.current.forEach((img) => {
        if (img) {
          // Vérifier que img n'est pas null ou undefined
          observer.observe(img); // Observer l'image si elle existe
        }
      });

      // Clean-up: désinscription des observations lorsque le composant est démonté
      return () => {
        if (imgRefs.current) {
          imgRefs.current.forEach((img) => {
            if (img) {
              // Vérifier que img n'est pas null ou undefined
              observer.unobserve(img); // Arrêter l'observation
            }
          });
        }
      };
    } else {
      // Si IntersectionObserver n'est pas supporté, charger les images immédiatement
      imgRefs.current.forEach((img) => {
        if (img && img.dataset.src) {
          img.src = img.dataset.src; // Charger les images immédiatement
        }
      });
    }
  }, [userBooks]); // Déclencher à chaque fois que la liste des livres change

  // Affichage du composant en fonction de l'état de chargement et des erreurs
  if (loading) {
    return <div>Loading...</div>; 
  }

  if (error) {
    return <div>Erreur : {error.message}</div>; 
  }

  const baseURL = import.meta.env.VITE_API_URL;
  if (!import.meta.env.VITE_API_URL) {
    console.warn(
      "VITE_API_URL n'est pas définie. Utilisation de l'URL par défaut."
    );
  }

  return (
    <div className="bgContainer">
      <IntroPersonnalLibrary pseudo={user.pseudo} />{" "}
      {/* Affichage de l'introduction de la bibliothèque personnelle */}
      {userBooks.length ? ( // Affichage de la liste des livres si elle n'est pas vide
        <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userBooks.map((book, index) => (
            <div key={book.id} className="card glass p-4" data-id={book.id}>
              <figure>
                <img
                  data-src={`${baseURL.replace("/api", "")}/${book.cover_image}`} // Attribut data-src pour stocker l'URL de l'image
                  alt="book"
                  ref={(el) => (imgRefs.current[index] = el)} // Référence pour chaque image
                  className="w-full h-85 object-cover overflow-hidden lg:max-h-full rounded-lg mt-4"
                />
              </figure>
              <div className="card-body">
                <h2 className="text-base font-bold">{book.title}</h2>{" "}
                {/* Titre du livre */}
                <div className="mt-2 list-gp-info">
                  <p className="text-sm">
                    Auteur: {book.author.name} {book.author.surname}{" "}
                    {/* Auteur du livre */}
                  </p>
                  <p className="text-sm">
                    Catégorie:{" "}
                    {book.categories.map((cat) => cat.category_name).join(", ")}{" "}
                    {/* Catégories du livre */}
                  </p>
                </div>
                <GroupButtonList
                  book={book}
                  index={index}
                  toggleLikeBook={toggleLikeBook} // Passage de la fonction toggleLikeBook au composant enfant
                />
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div>Tu n'as aucun livre dans ta liste</div> 
      )}
    </div>
  );
}

export default PersonnalLibraryPage;