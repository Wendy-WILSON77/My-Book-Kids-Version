import React, { useState, useEffect } from "react";
import api from "../../utils/axios/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import "../detailpage/DetailPage.scss";
import CommentsSection from "./CommentsSection";

const DetailPage = () => {
  const [book, setBook] = useState([]);
  const { id } = useParams();
  const navigate = useNavigate();

  const fetchBook = async () => {
    try {
      const response = await api.get(`/book/${id}`);
      setBook(response.data);
      console.log(response.data);
    } catch (error) {
      console.log("Erreur de récupération du livre");
    }
  };

  useEffect(() => {
    fetchBook();
  }, [id]);

  const baseURL =
    import.meta.env.VITE_API_URL || "https://mbi-back.onrender.com/api";
  if (!import.meta.env.VITE_API_URL) {
    console.warn(
      "VITE_API_URL n'est pas définie. Utilisation de l'URL par défaut."
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-lg rounded-lg shadow-md p-6 neon-border">
        <div className="hero bg-base-200 min-h-screen">
          <div className="hero-content flex flex-col items-center">
            <img
              // src={`https://mbi-back.onrender.com/${book.cover_image}`}
              src={
                baseURL
                  ? `${baseURL.replace("/api", "")}/${book.cover_image}`
                  : ""
              }
              className="mb-8 max-w-full rounded-lg shadow-2xl"
              alt={book.title}
            />
            <div className="w-full text-center">
              <h1
                className="animate-text mt-9 text-2xl font-bold"
                style={{
                  color: "#e84393",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {book.title}
              </h1>
              <p className="py-6 mt-4">{book.description}</p>
              <CommentsSection bookId={id} />
              <br />
              <br />
              <button
                className="btn w-full"
                style={{
                  borderRadius: "15px",
                  backgroundColor: "#e84393",
                  color: "white",
                }}
                onClick={() => navigate(-2)}
              >
                retour
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPage;
