import React, { useEffect, useState, useRef } from "react";
import "../library/LibraryList.scss";
import { Link } from "react-router-dom";
import LikesAndSummary from "./LikesAndSummary";
import api from "../../utils/axios/axiosInstance";

function LibraryList() {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  // stocker les références des images dans un tableau pour l'instant vide
  const imgRefs = useRef([]);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await api.get("/allBooks");
        console.log("API Response", response.data);
        setBooks(response.data);
        setLoading(false);
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

  if (loading) {
    return <div>Chargement...</div>;
  }

  return (
    <div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 p-2 mt-4 cont1">
      {books.map((book, index) => {
        const dateDePublication = new Date(book.date_of_publication);
        const options = { year: "numeric", month: "long", day: "numeric" };
        const dateFormatee = dateDePublication.toLocaleDateString(
          "fr-FR",
          options
        );

        const baseURL =
          import.meta.env.VITE_API_URL || "https://mbi-back.onrender.com/api";
        if (!import.meta.env.VITE_API_URL) {
          console.warn(
            "VITE_API_URL n'est pas définie. Utilisation de l'URL par défaut."
          );
        }

        return (
          <div
            key={book.id}
            className="card-container card glass p-3 neon-border"
            data-id={book.id}
          >
            <Link to={`/books/${book.id}`}>
              <figure>
                <img
                  className="library-img-dimensions"
                  data-src={`${baseURL.replace("/api", "")}/${book.cover_image}`}
                  alt="livre"
                  // ref : pour stocker la référence de l'image dans le tableau imgRefs
                  // pour donner une place à chaque imag edans le tableau
                  ref={(el) => (imgRefs.current[index] = el)}
                />
              </figure>
            </Link>
            <div className="card-body">
              <h2 className="books mt-3 text-lg font-bold">{book.title}</h2>
              <div className="mt-2 library-gp-info">
                <p>
                  <span style={{ color: "#8B4513", fontWeight: "bold" }}>
                    Auteur:
                  </span>{" "}
                  {book.author.name} {book.author.surname}
                </p>
                <p>
                  <span style={{ color: "#8B4513", fontWeight: "bold" }}>
                    Catégorie:
                  </span>{" "}
                  {book.categories.map((cat) => cat.category_name).join(", ")}
                </p>
                <p>
                  <span style={{ color: "#8B4513", fontWeight: "bold" }}>
                    Date de publication:
                  </span>{" "}
                  {dateFormatee}
                </p>
              </div>
              <br />
              <LikesAndSummary
                book={book}
                index={index}
                books={books}
                setBooks={setBooks}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default LibraryList;

