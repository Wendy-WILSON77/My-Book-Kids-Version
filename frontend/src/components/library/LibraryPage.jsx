import React from "react";
import LibraryList from "./LibraryList";
import IntroLibrary from "./IntroLibrary";
import "../library/LibraryPage.scss";

function LibraryPage() {
  return (
    <div className="bgCLibraryPage">
      <IntroLibrary />
      {/* <AdminBookOptions /> */}
      <LibraryList />
    </div>
  );
}

export default LibraryPage;


