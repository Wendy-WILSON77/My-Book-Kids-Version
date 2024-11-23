import React from "react";

function Contact() {
  const ouvrirApplicationMail = () => {
    window.location.href = "mailto:mybookkidsversion@gmail.com";
  };

  return (
    <div className="min-h-screen flex items-center justify-center maxContainer">
      <div className="w-full max-w-md rounded-lg shadow-md p-6 neon-border bgcolor">
        <div className="contact-container text-center">
          <h1 className="contact-heading text-3xl font-bold text-white mb-4 text-center">
            Me Contacter
          </h1>

          <p> Vous voulez me signaler un probleme,</p>
          <p> proposer un livre à lire,</p>
          <p> ou tout simplement me faire "COUCOU",</p>
          <p>écrivez moi à :</p>
          <br></br>
          <strong>mybookkidsversion@gmail.com </strong>
          <p>ou</p>
          <p>directement en cliquant </p>
          {/* Lien mailto */}
          <button
            onClick={ouvrirApplicationMail}
            className="dropbtn w-full mt-4 py-2 px-4 text-white hover:bg-teal-700 rounded-md bg-teal-400"
          >
            <a
              className="contact-mail-link"
              href="mailto:mybookis26@gmail.com?subject=Demande%20d'information&body=Bonjour,%0D%0A%0D%0AJ'aimerais avoir plus d'informations concernant..."
            >
              <i className="material-icons clikEnv">ICI</i>
            </a>
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
