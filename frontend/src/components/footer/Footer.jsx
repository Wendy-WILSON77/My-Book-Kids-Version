import "./Footer.scss";

// import du composant Link de react router-dom (on va l'utiliser dans le JSX,  fonctionne comme un A, mais change l'url au click)
import { Link } from "react-router-dom";

function Footer() {
  return (
    <footer className="bgCfooter shadow shadow-gray-300 w-full px-8 md:px-auto">
      <div className="text-gray-500 order-3 w-full md:w-auto md:order-2">
        <ul className="flex flex-col md:flex-row font-semibold footer ">
          <li className="md:px-2 md:py-2 hover:text-indigo-400 text-purple-400 neon-footer">
            <Link to="/contact">Me Contacter</Link>
          </li>
          <li className="md:px-4 md:py-2 hover:text-indigo-400 text-purple-400 neon-footer">
            <Link to="/faq">FAQ</Link>
          </li>
          <li className="md:px-4 md:py-2 hover:text-indigo-400 text-purple-400 neon-footer">
            <Link to="/a-propos">A Propos</Link>
          </li>
        </ul>
      </div>
      <div className="order-2 md:order-3"></div>

      <div className="footer-reseau ">
        <p className="md:px-4 md:py-2 hover:text-indigo-400 text-purple-400">
          SUIVEZ My Book Kids
        </p>
        {/* Logo Facebook */}
        <Link to="https://www.facebook.com/">
          <button className="logo">
            <img
              src="/integrations/logos/facebook.webp"
              alt="logo facebook"
              height="50"
              width="50"
            ></img>
          </button>
        </Link>
        {/* Logo Instagram */}
        <Link to="https://www.instagram.com/kidsversion77/">
          <button>
            <img
              src="/integrations/logos/instagram.webp"
              alt="logo instagram"
              height="50"
              width="50"
            ></img>
          </button>
        </Link>
      </div>
      <div className="footer-copyright">
        <p>© 2024 My Book Kids. Tous droits réservés.</p>
      </div>
    </footer>
  );
}

export default Footer;
