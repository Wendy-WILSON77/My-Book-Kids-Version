import React from "react";
import { useAuth } from "../../context/authContext";
import api from "../../utils/axios/axiosInstance";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
  const { isLogged, setIsLogged, setUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await api.get("/logout");
      // met à jour le contexte après déconnexion
      setIsLogged(false);
      setUser(null); // réinitialise l'utilisateur dans le contexte

      navigate("/");
    } catch (error) {
      console.error("Erreur lors de la déconnexion", error);
    }
  };

  return (
    <div>
      <button
        onClick={handleLogout}
        className="py-2 px-4 bg-amber-900 text-white rounded-md hover:bg-red-600"
      >
        Déconnexion
      </button>
    </div>
  );
};

export default LogoutButton;
