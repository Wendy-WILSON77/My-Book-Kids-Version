import React, { useState } from "react";
import "../../index.css";
import { useAuth } from "../../context/authContext";
import { Link, useNavigate } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import "../authentification/styleAuthentification.scss";
import "./ResetPassword";

function Login() {
  // Déclaration de l'état pour les données du formulaire
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  // Déclaration de l'état pour le message d'erreur
  const [errorMessage, setErrorMessage] = useState(""); // Ajout de l'état pour le message d'erreur
  const { setIsLogged, setUser } = useAuth();

  // Gérer les changements de données des inputs
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const navigate = useNavigate();
  //Gerer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    // console.log("FormFinaleAvantAxios : ", formData);  Afficher les données du formulaire AVANT l'envoi

    try {
      // envoyer les données du formulaire à l'API
      const response = await api.post("/login", formData);
      if (response.status === 200) {
        const { user, isLoggedIn } = response.data;
        setIsLogged(isLoggedIn); //Met à jour l'etat de connexion
        setUser(user); // met à jour l'utilisateur connecté
        navigate("/");
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        setErrorMessage("Mauvais couple email/mot de passe."); 
      } else {
        setErrorMessage("Une erreur s'est produite. Veuillez réessayer."); 
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center maxContainer">
      <div className="w-full max-w-md rounded-lg shadow-md p-6 neon-border bgcolor">
        <h2 className="text-2xl font-semibold text-white text-center">
          CONNEXION
        </h2>
        <p className="mt-2 text-center text-teal-600">MY BOOK KIDS</p>
        <form className="mt-4" onSubmit={handleSubmit}>
          {errorMessage && (
            <div className="mb-4 text-red-500 text-center">{errorMessage}</div>
          )}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="textInput">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="px-3 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton Email ici"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="textInput">
              MOT DE PASSE
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="px-3 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton mot de passe ici"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-600"
          >
            <span className="flex items-center justify-center">
              <span>SE CONNECTER</span>
            </span>
          </button>
          <Link to="/inscription" className="text-gray-400 text-center mt-4">
            <button
              type="button"
              className="w-full mt-4 py-2 px-4 text-white hover:bg-teal-700 rounded-md bg-teal-400"
            >
              S'INSCRIRE
            </button>
          </Link>
        </form>
        <Link to="/reset-password" className="text-gray-400 text-center mt-4">
          <button
            type="button"
            className="w-full mt-4 py-2 px-4 text-white hover:bg-teal-700 rounded-md "
          >
            Mot de passe oublié ?
          </button>
        </Link>
      </div>
    </div>
  );
}

export default Login;
