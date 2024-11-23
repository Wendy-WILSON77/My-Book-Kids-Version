import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ isLogged, children }) => {
  if (!isLogged) {
    return <Navigate to="connexion" />;
  }
  return children;
};

export default ProtectedRoute;

