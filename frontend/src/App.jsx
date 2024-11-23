import "../src/style/reset/reset.css";
import "./index.css";
import "./App.css";
import MainLayout from "./components/mainLayout/MainLayout";
import Login from "./components/authentification/Login";
import SignUp from "./components/authentification/SignUp";
import { useAuth } from "./context/authContext";
import { Route, Routes, BrowserRouter as Router } from "react-router-dom";
import NotFoundPage from "./components/notFoundPage/NotFoundPage";
import HomePage from "./components/homePage/HomePage";
import PersonnalLibraryPage from "./components/list/PersonnalLibraryPage";
import LibraryPage from "./components/library/LibraryPage";
import ProtectedRoute from "./components/protectedRoute/ProtectedRoute";
import DetailPage from "./components/detailpage/DetailPage";
import ProfilPage from "./components/profiles/ProfilPage";
import Contact from "./components/footer/Contact";
import Faq from "./components/faq/Faq";
import Apropos from "./components/footer/Apropos";
import ResetPassword from "./components/authentification/ResetPassword";

function App() {
  const { isLogged } = useAuth();
  console.log("Connecté ? :", isLogged);

  return (
    /**
     * Router contient Routes qui permet d'englober nos routes imbriquées
     * Chacunes d'entres elle est liées à la route / et viendra remplacer l'outlet du mainLayout
     */
    <Router>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          {/* les routes sont encapsulées dans le layout principal pour conserver l'architecture de l'application */}
          <Route index element={<HomePage />} />
          <Route path="connexion" element={<Login />} />
          <Route path="inscription" element={<SignUp />} />
          <Route path="bibliotheque" element={<LibraryPage />} />
          <Route path="ma-liste" element={<PersonnalLibraryPage />} />
          <Route path="books/:id" element={<DetailPage />} />
          <Route path="contact" element={<Contact />} />
          <Route path="faq" element={<Faq />} />
          <Route path="a-propos" element={<Apropos />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route
            path="ma-liste"
            element={
              <ProtectedRoute isLogged={isLogged}>
                <PersonnalLibraryPage />
              </ProtectedRoute>
            }
          />
          <Route path="profil" element={<ProfilPage />} />
        </Route>
        {/* la route page 404 est en dehors du layout principal pour qu'il n'affiche aucun autre composant */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Router>
  );
}

export default App;