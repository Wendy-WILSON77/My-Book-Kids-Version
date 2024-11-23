// import { StrictMode } from 'react'
//import browserRouter est un composant qui permet de gérer les routes de l'application
//  et doit englober l'ensemble des composants de l'application

import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { AuthProvider } from "./context/authContext.jsx";

createRoot(document.getElementById("root")).render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
