import React from "react";
import { Link } from "react-router-dom";
import "../notFoundPage/NotFoundPage.scss";

function NotFoundPage() {
  return (
    <div className="container">
      <div className="right conatiner">
        <Link to="/">
          <button className="px-4 py-2 bg-teal-700 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 text-white">
            Retour à l'accueil
          </button>
        </Link>

        <span className="all numer">4</span>
        <div className="circle">
          <div className="drops"></div>
          <div className="drops"></div>
          <div className="hand"></div>
          <div className="hand rgt"></div>
          <div className="holder">
            <div className="bob">
              <div className="nose"></div>
              <div className="face">
                <div className="mouth">
                  <div className="tongue"></div>
                </div>
              </div>
              <div className="ear"></div>
              <div className="ear rgt"></div>
              <div className="neck"></div>
            </div>
          </div>
        </div>

        <span className="numer all">4</span>
        <h1> ooooOOH je suis désolée ta page sur le site </h1>
        <h1> My Book - Kids version - </h1>
        <h1>n'a malheureusement pas été trouvée</h1>
      </div>
    </div>
  );
}

export default NotFoundPage;
