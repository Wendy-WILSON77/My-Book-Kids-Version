import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/authContext"; // import du contexte d'authentification
import api from "../../utils/axios/axiosInstance";
import "../homePage/BooksHome.scss";

function BooksHome() {
  const { isLogged } = useAuth(); // récupération de l'état de connexion (true ou false) via le authContext
  const navigate = useNavigate(); // pour la redirection
  const [books, setBooks] = useState([]); // état pour stocker la liste des livres
  const [loading, setLoading] = useState(true); // état pour afficher le chargement
  const [showNotification, setShowNotification] = useState(false);
  const imgRefs = useRef([]); // références pour les images

  const handleShowNotification = (message) => {
    setShowNotification(message);
    setShowNotification(true);
    setTimeout(() => {
      setShowNotification(false);
    }, 3000);
  };

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        console.log("variable d'env utilisee : baseURL", api.defaults.baseURL);
        const response = await api.get("/randomBooks");

        setBooks(response.data); // stocker les livres récupérés dans l'état
        setLoading(false); // masquer le chargement une fois les livres chargés
      } catch (error) {
        console.log(error);
      }
    };
    fetchBooks();
  }, []);

  useEffect(() => {
    if ("IntersectionObserver" in window) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              const img = entry.target;
              img.src = img.dataset.src; // charger l'image
              if (img instanceof Element) {
                // vérifier que l'élément est un élément DOM valide
                observer.unobserve(img); // arrêter d'observer cette image
              }
            }
          });
        },
        {
          rootMargin: "0px 0px 50px 0px", // déclencher un peu avant que l'image n'entre dans le viewport
          threshold: 0.04, // seuil de déclenchement à 4% de visibilité
        }
      );

      imgRefs.current.forEach((img) => {
        if (img instanceof Element) {
          // vérifier que l'élément est valide
          observer.observe(img); // observer chaque image
        }
      });

      return () => {
        if (imgRefs.current) {
          imgRefs.current.forEach((img) => {
            if (img instanceof Element) {
              // vérifier que l'élément est valide
              observer.unobserve(img); // arrêter l'observation
            }
          });
        }
      };
    } else {
      // fallback pour les navigateurs qui ne supportent pas Intersection Observer
      imgRefs.current.forEach((img) => {
        if (img instanceof Element) {
          // vérifier que l'élément est valide
          img.src = img.dataset.src; // charger les images immédiatement
        }
      });
    }
  }, [books]); // dépendance sur books

  const handleClick = (book) => {
    navigate(`/books/${book.id}`);
  };

  if (loading) {
    return <div>Chargement...</div>;
  }

  const baseURL = import.meta.env.VITE_API_URL
    //  || "https://mbi-back.onrender.com/api";
  if (!import.meta.env.VITE_API_URL) {
    console.warn(
      "VITE_API_URL n'est pas définie. Utilisation de l'URL par défaut."
    );
  }
  console.log("baseURL:", baseURL);

  return (
    <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 mt-4">
      {books.map((book, index) => (
        <div
          key={book.id}
          className="books-card glass p-4 neon-border"
          data-id={book.id}
        >
          <figure>
            <img
              className="books-img-dimensions"
              data-src={
                baseURL
                  ? `${baseURL.replace("/api", "")}/${book.cover_image}`
                  : ""
              }
              alt="book"
              ref={(el) => (imgRefs.current[index] = el)} // assigne la référence de l'image
            />
          </figure>
          <div className="card-body">
            <h2 className="books mt-3 text-lg font-bold">{book.title}</h2>
            <div className="mt-2 gp-info">
              <p>
                Auteur: {book.author.name} {book.author.surname}
              </p>
              <p>Catégorie: {book.categories[0].category_name}</p>
              <p>Date de publication: {book.date_of_publication}</p>
            </div>
            <Link to={`/books/${book.id}`}>
              <button
                className="btn btn-neon large-button p-2 float-right"
                onClick={() => handleClick(book)}
              >
                En savoir plus
              </button>
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BooksHome;