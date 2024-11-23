import React, { useState } from "react";
import "../../index.css";
import { useAuth } from "../../context/authContext";
import { Link } from "react-router-dom";
import "../header/StyleHeader.scss";
import LogoutButton from "../authentification/Logout";
import { HashLink } from "react-router-hash-link";
import "./StyleHeader.scss";

function Navbar() {
  const { isLogged, user } = useAuth();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="navContainer">
      <nav className="navbar bgCNavBar">
        <div className="navbar-content">
          <div className="logo">
            <Link to="/">
              <img
                className="logo-img"
                src="/integrations/logos/favicon.png"
                alt="logo mbkv"
              />
            </Link>
          </div>
          <div className="burger-menu" onClick={toggleMenu}>
            <button className="burger-btn">
              <svg
                className="burger-icon"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16m-7 6h7"
                ></path>
              </svg>
            </button>
          </div>
          <div className={`nav-links ${isOpen ? "active" : ""}`}>
            <ul className="nav-list">
              <li className="nav-item">
                <Link to="/" className="nav-link">
                  ACCUEIL
                </Link>
              </li>
              <li className="nav-item">
                <Link to="/bibliotheque" className="nav-link">
                  BIBLIOTHEQUE
                </Link>
              </li>
              <li className="nav-item">
                <HashLink to="/a-propos#ancrage" className="nav-link">
                  COMMENT CA MARCHE ?
                </HashLink>
              </li>
              {isLogged && (
                <li className="nav-item">
                  <Link to="ma-liste" className="nav-link">
                    MA LISTE
                  </Link>
                </li>
              )}
            </ul>
          </div>
          <div className="auth-buttons">
            {isLogged ? (
              <>
                <Link
                  to="/profil"
                  className="text-gray-500 hover:text-indigo-400"
                >
                  <button className=" px-4 py-2 bgButton  hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 text-white ">
                    <span>Mon Profil</span>
                  </button>
                </Link>
                <LogoutButton />
              </>
            ) : (
              <>
                <Link to="/connexion" className="auth-link">
                  <button className="auth-btn bgButton">S'IDENTIFIER</button>
                </Link>
                <Link to="/inscription" className="auth-link">
                  <button className="auth-btn bgButton">S'INSCRIRE</button>
                </Link>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar;
