import React, { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import "../header/StyleHeader.scss";

const SearchBar = () => {
  const [datas, setDatas] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const navigate = useNavigate(); // Utilisé pour rediriger vers la page de détails
  const location = useLocation(); // Utilisé pour détecter les changements de page

  useEffect(() => {
    const fetchDatas = async () => {
      try {
        const response = await api.get("/allBooks");
        // console.log(response.data);
        setDatas(response.data);
      } catch (error) {
        console.log("Erreur lors de la récupération des livres :", error);
      }
    };
    fetchDatas();
  }, []);

  useEffect(() => {
    setSearchTerm(""); // Vider la barre de recherche à chaque fois que l'utilisateur change de page
  }, [location]);

  const handleSearchTerm = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const bookFound = datas.find((book) =>
      book.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    if (bookFound) {
      navigate(`/books/${bookFound.id}`, { state: bookFound });
    } else {
      navigate("*");
    }
  };

  const handleTitleClick = (title) => {
    setSearchTerm(title); // Mettre à jour le champ de recherche avec le titre du livre
  };

  return (
    <div className="max-w-full mx-auto p-4 flex justify-center items-center bgCSearchB">
      <form
        className="flex flex-col md:flex-row items-center"
        onSubmit={handleSearch}
      >
        <div className="">
          <input
            type="text"
            id="voice-search"
            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-none block w-full pl-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-md focus:ring-white focus:border-white dark:focus:ring-white dark:focus:border-white"
            placeholder="le titre du livre"
            value={searchTerm}
            onChange={handleSearchTerm}
          />
          {searchTerm.length > 2 && (
            <div className="absolute left-0 right-0 bg-white shadow-lg rounded-b-md z-10 mt-1">
              {datas
                .filter((book) =>
                  book.title.toLowerCase().includes(searchTerm.toLowerCase())
                )
                .map((book) => (
                  <div
                    className="search_result px-4 py-2 hover:bg-gray-200 cursor-pointer"
                    key={book.id}
                    onClick={() => handleTitleClick(book.title)}
                  >
                    <p>
                      <strong>{book.title}</strong>
                    </p>
                  </div>
                ))}
              {datas.filter((book) =>
                book.title.toLowerCase().includes(searchTerm.toLowerCase())
              ).length === 0 && (
                <div className="px-4 py-2 text-gray-500">
                  Aucun résultat trouvé
                </div>
              )}
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bcCsearchButton mt-4 md:mt-0 md:ml-2 inline-flex items-center py-2.5 px-4  text-gray-50 rounded-none border border-gray-300 text-sm  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white shadow-md focus:ring-white focus:border-white dark:focus:ring-white dark:focus:border-white"
        >
          <svg
            className="mr-2 -ml-1 w-5 h-5"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            ></path>
          </svg>
          RECHERCHER
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
