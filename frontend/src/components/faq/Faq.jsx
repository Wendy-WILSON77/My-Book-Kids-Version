import "./Faq.scss";
import "../../index.css";
import { Link } from "react-router-dom";
import { useState } from "react";

const FaqData = [
  {
    question: "Comment créer un compte ?",
    answer:
      "Pour créer un compte, rendez-vous sur la page d'accueil et cliquez sur 'S'inscrire'. Remplissez le formulaire avec vos informations personnelles et validez votre inscription.",
  },
  {
    question: "Comment se connecter ?",
    answer:
      "Sur la page d'accueil, cliquez sur 'S'identifier'. Entrez votre adresse email et votre mot de passe, puis cliquez sur 'Connexion'. Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' pour en générer un nouveau.",
  },
  {
    question: "Comment réinitialiser mon mot de passe ?",
    answer:
      "Si vous avez oublié votre mot de passe, cliquez sur 'Mot de passe oublié' sur la page de connexion. Entrez votre adresse email et suivez les instructions pour réinitialiser votre mot de passe.",
  },
  {
    question: "Comment modifier mes informations personnelles ?",
    answer:
      "Pour modifier vos informations personnelles, connectez-vous à votre compte et accédez à la section 'Mon profil'. Vous pouvez y modifier votre nom, email, mot de passe et autres informations personnelles.",
  },
  {
    question: "Puis-je supprimer mon compte ?",
    answer:
      "Oui, vous pouvez supprimer votre compte à tout moment. Rendez-vous dans les paramètres de votre compte et cliquez sur 'Supprimer mon compte'. Attention, cette action est irréversible.",
  },
  {
    question: "Comment ajouter un livre à ma 'Liste' ?",
    answer:
      "Pour ajouter un livre à votre 'Liste', recherchez le livre dans la bibliothèque et cliquez sur sur le bouton 'coeur' pour l'ajouter à votre liste. Retrouvez le ensuite dans l'onglet MA LISTE.",
  },
  {
    question: "Comment laisser une critique sur un livre ?",
    answer:
      "Vous pouvez laisser un commentaire en vous rendant sur la page detail du livre et en cliquant sur 'Ajouter un commentaire'.",
  },
  {
    question: "Quels sont les catégories de livres disponibles ?",
    answer:
      "Notre bibliothèque faites pour enfant de tout âge propose des catégories par tranche d'âge : bébé, maternelle, primaire et ado",
  },
  {
    question: "Comment signaler un problème technique ?",
    answer:
      "Si vous rencontrez un problème technique, vous pouvez me contacter via la page de contact en cliquant sur 'Me Contacter', je reviendrai vers vous le plus vite possible.",
  },
];

function Faq() {
  const [selected, setSelected] = useState(null);

  const toogle = (i) => {
    if (selected == i) {
      return setSelected(null);
    }
    setSelected(i);
  };

  return (
    <div className="faq shadow shadow-gray-300 w-full px-8 md:px-auto">
      <Link to="/">
        <button className="px-4 py-2 bg-amber-900 hover:bg-indigo-600 text-gray-50 rounded-xl flex items-center gap-2 text-white">
          Retour à l'accueil
        </button>
      </Link>
       {/* début de la navbar  */}
      <nav>
        <div className="md:h-16 h-28 mx-auto md:px-4 container flex items-center justify-between flex-wrap md:flex-nowrap">
          <h1 className="text-4xl font-bold text-pink-800 mb-4">
            FAQ - Foire Aux Questions
          </h1>
        </div>
      </nav>

      {/* fin de la navbar */}
      <div className="wrapper px-4 py-2 bg-violet-400 text-gray-50 rounded-xl gap-2 text-white ">
        <div className="accordion">
          {FaqData.map((item, i) => (
            <div className="item">
              <div
                className="title md:px-4 md:py-2 hover:text-indigo-400 text-white"
                onClick={() => toogle(i)}
              >
                <span className="plus-sign">{selected === i ? "-" : "+"}</span>
                <h2>{item.question}</h2>
              </div>
              <h3 className={selected === i ? "content show" : "content"}>
                {item.answer}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Faq;