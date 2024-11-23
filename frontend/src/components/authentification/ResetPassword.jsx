import React, { useState } from "react";
import emailjs from "emailjs-com";
import api from "../../utils/axios/axiosInstance";

function ResetPassword() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      // TODO il me reste à creer la route back et l'ajouter
      const response = await api.post("/reset-password", { email });
      if (response.status === 200) {
        setMessage("Un lien de réinitialisation a été envoyé à votre email.");
        sendEmail(event); // Appel de la fonction pour envoyer l'email
      }
    } catch (error) {
      setMessage("Une erreur s'est produite. Veuillez réessayer.");
    }
  };

  const sendEmail = (e) => {
    e.preventDefault();

    emailjs
      .sendForm(
        "service_zeou3ea",
        "template_7i84vef",
        e.target,
        "E4DzExcdlfwb9RkJH"
      )
      .then(
        (result) => {
          console.log(result.text);
        },
        (error) => {
          console.log(error.text);
        }
      );
  };

  return (
    <div className="min-h-screen flex items-center justify-center maxContainer">
      <div className="w-full max-w-md rounded-lg shadow-md p-6 neon-border bgcolor">
        <h2 className="text-2xl font-semibold text-white text-center">
          RÉINITIALISER LE MOT DE PASSE
        </h2>
        <form className="mt-4" onSubmit={handleSubmit}>
          {message && (
            <div className="mb-4 text-center text-white">{message}</div>
          )}
          <div className="flex flex-col mb-4">
            <label htmlFor="email" className="textInput">
              Email
            </label>
            <input
              id="email"
              name="email"
              type="email"
              className="px-3 py-2 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-400"
              placeholder="tape ton Email ici"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 bg-teal-700 text-white rounded-md hover:bg-teal-600"
          >
            <span className="flex items-center justify-center">
              <span>ENVOYER</span>
            </span>
          </button>
        </form>
      </div>
    </div>
  );
}

export default ResetPassword;
