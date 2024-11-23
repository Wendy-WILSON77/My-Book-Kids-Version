import React from "react";
import "./HomeInformation.scss";

function IntroHome() {
  return (
    <div className="introHomeContainer">
      <div className="intro-home-text logo-text flex flex-col items-center justify-center">
        <div className="text-content">
          <h2 className="mt-1 mb-2 text-teal-700 text-1xl font-bold">
            {" "}
            Bienvenue sur My Book{" "}
          </h2>

          <span className="text-teal-500 clignotant-texte">
            [ kids version ]
          </span>
          <br />
          <p className="mt-4  lg:text-sm">
            ici vous découvrirez uniquement des livres pour enfants{" "}
          </p>
          <br />
          <h3 className="mt-4 text-base lg:text-lg text-center">
            <span className="text-xs font-bold">petits</span>,
            <span className="text-sm font-bold"> moyens</span>,
            <span className="text-lg font-bold"> grands et </span>
            <span className="text-xl font-bold"> très grands</span>
          </h3>
          <p className="mt-1 lg:text-sm">
            Grands parents, parents, tontons, taties, nounous ...{" "}
          </p>
          <p className="font-bold"> vous êtes tous les bienvenus !</p>
        </div>
      </div>
    </div>
  );
}

export default IntroHome;
