import "./Apropos.scss";
import "../../index.css";

import { Link } from "react-router-dom";

function Apropos() {
  return (
    <div className="page-container">
      <div className=" content-apropos shadow shadow-gray-300 w-full px-8 md:px-auto">
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <h1 className="h1 text-4xl font-bold mb-4 text-slate-50">A Propos</h1>
        </div>

        <div className="body">
          <h3 className="h3 text-2xl font-bold text-red-400 mb-4">
            Présentation
          </h3>
          <br />
          <p className="paragraphe px-4 py-2 text-gray-50 rounded-xl flex items-center gap-2 text-white neon-border">
            <br />
            My Book Kids version se destine à tous les petits lecteurs et leurs
            parents, qu’ils soient confirmés ou encore novices souhaitant gérer
            leur bibliothèque personnelle, découvrir de nouveaux livres pour
            enfant et partager des avis. Notre mission est de vous aider à
            découvrir et partager des livres incroyables.
            <br />
            <br />
            Que vous soyez à la recherche de la prochaine lecture du soir, de la
            sieste de votre enfant, ou que vous souhaitiez laisser une critique
            sur un livre que vous avez adoré, My Book Kids est la communauté
            idéale pour les enfants et leurs parents passionnés de lecture.
          </p>
          <h3 className="h3 text-2xl font-bold text-red-400 mb-4">
            Qui suis-je ?
          </h3>
          <br />
          <p className="paragraphe px-4 py-2 text-gray-50 rounded-xl flex items-center gap-2 text-white neon-border">
            Hello à tous, Je m’appelle Wendy, maman de deux jeunes enfants et je
            suis passionnée de développement informatique et de lecture. <br />
            J’ai créé cette plateforme pour connecter d’autres parents qui
            pourraient être à la recherche de nouvelles histoires à raconter aux
            bout d'choux. Je suis enthousiaste à l’idée de construire une
            communauté dynamique autour des livres pour enfants.
          </p>

          <h3 id="ancrage" className="h3 text-2xl font-bold text-red-400 mb-4">
            Comment ça marche ?
          </h3>
          <br />
          <p className="paragraphe px-4 py-2 text-gray-50 rounded-xl flex items-center gap-2 text-white neon-border">
            <br />
            - Dés la page d'accueil vous avez un aperçu de quelques livres
            aléatoire présent dans notre bibliotheque.
            <br />
            <br />
            - A partir de la barre de recherche vous pouvez rechercher un
            ouvrage à partir de son titre.
            <br />
            <br />
            - A l'onglet "BIBLIOTHEQUE" vous avez accès à tous les livres dont
            le résumé et ses propres informations sont disponibles.
            <br />
            <br />
            - Une fois connecté votre espace lecteur vous avez la possibilité
            d'ajouter des livres en favori, vous les retrouverez dans l'onglet
            "MA LISTE".
            <br />
            <br />
            -Pour chaque livre, une page de détail est disponible afin d’avoir
            des informations complémentaires tel que le résumé du livre,
            l'auteur, la catégorie... etc
            <br />
          </p>
        </div>
      </div>
    </div>
  );
}

export default Apropos;
