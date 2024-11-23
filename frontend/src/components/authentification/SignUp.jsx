import React, { useState } from "react";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import api from "../../utils/axios/axiosInstance";
import "../authentification/styleAuthentification.scss";

function SignUp() {
  const navigate = useNavigate();
  const [signUpForm, setSignUp] = useState({
    name: "",
    surname: "",
    pseudo: "",
    email: "",
    password: "",
    confirmation: "",
  });

  // Gérer les changements dans les champs du formulaire
  const handleChange = (event) => {
    const { name, value } = event.target;
    setSignUp({
      ...signUpForm,
      [name]: value,
    });
  };

  //Valider le mot de passe avec une expression régulière
  const validatePassword = (password) => {
    const regex = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9]).{8,}$/;
    return regex.test(password);
  };

  // Vérifier si l'email est déjà utilisé
  const checkEmail = async (email) => {
    try {
      const response = await api.post("/check-email", { email });
      return response.data.exists;
    } catch (error) {
      console.error("Erreur lors de la vérification de l'email :", error);
      return false;
    }
  };

  //Gérer la soumission du formulaire
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log("SignUpFinaleAvantAxios OK: ", signUpForm);

    // Vérification de la validité du mot de passe
    if (!validatePassword(signUpForm.password)) {
      alert(
        "Le mot de passe doit contenir au moins 8 caractères, dont un chiffre, une majuscule et une minuscule."
      );
      return;
    }

    // Vérification de la correspondance des mots de passe
    if (signUpForm.password !== signUpForm.confirmation) {
      alert("Le mot de passe et sa validation ne correspondent pas.");
      return;
    }

    //Validité de l'email
    if (
      typeof signUpForm.email !== "string" ||
      !signUpForm.email.includes("@")
    ) {
      alert("Le format de l'email fourni n'est pas valide.");
      return;
    }
    //
    //Disponibilité de l'email
    const isEmailUsed = await checkEmail(signUpForm.email);
    if (isEmailUsed) {
      alert("Cet email est déjà utilisé.");
      return;
    }

    // Soumission du formulaire si toutes les vérifications sont passées
    try {
      const response = await api.post("/signup", signUpForm);
      console.log("réponse du serveur :", response.data);

      if (response.status === 200) {
        alert(
          "Compte utilisateur créé avec succès. Tu peux à présent t'authentifier."
        );
        navigate("/");
      }
    } catch (error) {
      console.error("Erreur lors de l'inscription :", error);
      if (
        error.response &&
        error.response.data &&
        error.response.data.errorMessage
      ) {
        alert(error.response.data.errorMessage);
      }
    }
  };

  return (
    <div className="dark min-h-screen flex items-center justify-center  maxContainer ">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-md p-6 neon-border bgcolor">
        <h2 className="text-2xl font-semibold text-white text-center">
          INSCRIPTION
        </h2>
        <p className="mt-2 text-center text-teal-600">MY BOOK KIDS</p>
        <form className="mt-4" onSubmit={handleSubmit}>
          <div className="flex flex-col mb-4">
            <label htmlFor="firstname" className="textInput">
              Ton Prénom
            </label>
            <input
              id="firstname"
              name="name"
              type="text"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton prénom ici"
              value={signUpForm.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="lastname" className="textInput">
              Ton Nom
            </label>
            <input
              id="lastname"
              name="surname"
              type="text"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton nom ici"
              value={signUpForm.surname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="pseudonym" className="textInput">
              Ton Pseudo
            </label>
            <input
              id="pseudonym"
              name="pseudo"
              type="text"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton pseudo ici"
              value={signUpForm.pseudo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="textInput">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="text"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton Email ici"
              autoComplete="username"
              value={signUpForm.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="password" className="textInput">
              Mot de passe
            </label>
            <input
              id="password"
              name="password"
              type="password"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton mot de passe ici"
              autoComplete="new-password"
              value={signUpForm.password}
              onChange={handleChange}
              required
            />
          </div>
          <div className="flex flex-col mb-6">
            <label htmlFor="confirmation" className="textInput">
              Confirmation du mot de passe
            </label>
            <input
              id="confirmation"
              name="confirmation"
              type="password"
              className="px-3 py-2  text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape une deuxième fois ton mot de passe ici"
              autoComplete="new-password"
              value={signUpForm.confirmation}
              onChange={handleChange}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-600"
          >
            OK
          </button>
        </form>
      </div>
    </div>
  );
}

export default SignUp;
