import "./IntroPersonnalLibrary.scss";
import { useAuth } from "../../context/authContext";
import "../library/IntroLibrary.scss";

function IntroPersonnalLibrary({ pseudo }) {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="list-logo-text">
        <div className="list-text-content ">
          <div className="intro-library bgCintroLibrary">
            <h1 className="neon-text"> Bienvenue {pseudo} </h1>
          </div>
          <p className="text-lg text-slate-100 font-bold p-4">
            {" "}
            Voici ta bibliothèque personnelle{" "}
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntroPersonnalLibrary;
