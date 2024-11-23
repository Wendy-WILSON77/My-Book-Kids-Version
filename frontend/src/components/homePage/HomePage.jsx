import React from "react";
import BackgroundImageHome from "./BackGroundImageHome";
import PalmeDor from "./PalmeDor";
import IntroHome from "./IntroHome";
import "../homePage/HomePage.scss";
import BooksHome from "./BooksHome";

function HomePage() {
  return (
    <div className="bgContainer ">
      <div className="flex flex-col lg:flex-row">
        {/* Image background sur la gauche */}
        <div className="relative lg:w-[40%] w-full h-64 lg:h-screen lg:max-h-full overflow-hidden p-4 rounded-lg">
          <BackgroundImageHome />
        </div>

        {/* Palme d'Or et Intro sur la droite */}
        <div className="lg:w-[60%] w-full flex flex-col p-4 space-y-11">
          <div className="border-rounded flex-1 content-center">
            <IntroHome />
          </div>
          <div className="border-rounded flex-1 content-center">
            <PalmeDor />
          </div>
        </div>
      </div>
      <BooksHome />
    </div>
  );
}

export default HomePage;
