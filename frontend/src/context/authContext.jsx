import React, { createContext, useState, useContext, useEffect } from "react";
import api from "../utils/axios/axiosInstance";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLogged, setIsLogged] = useState(false);
  const [user, setUser] = useState(null);

  // Utiliser useEffect pour vérifier l'état de connexion lors du chargement de la page
  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const response = await api.get("/checkAuth");
        if (response.status === 200) {
          setIsLogged(true);
          setUser(response.data.user); // màj les infos de l'utilisateur
        } else {
          setIsLogged(false);
          setUser(null);
        }
      } catch (error) {
        console.error(
          "Erreur lors de la vérification de l'authentification",
          error
        );
        setIsLogged(false);
        setUser(null);
      }
    };

    checkAuthStatus(); // appel lors du premier rendu
  }, []); // ne s'exécute qu'une seule fois

  return (
    <AuthContext.Provider value={{ isLogged, setIsLogged, user, setUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
