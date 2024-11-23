import React from "react";
import "../homePage/BackGroundImageHome.scss";

function BackgroundImageHome() {
  return (
    // <div className="relative w-2/3 h-full imgDecal">
    <div className="relative w-full h-full imgDecal ">
      <img
        src="/integrations/backgroundimage/MY-BOOK-KIDS.webp"
        alt="Background image de mybook kids version"
        // className=" top-0 left-0 w-full h-full object-cover z-10"
        className="w-full h-full object-contain border-rounded"
      />
      {/* className="w-full h-full object-contain rounded-2xl"/> */}
    </div>
  );
}
export default BackgroundImageHome;
