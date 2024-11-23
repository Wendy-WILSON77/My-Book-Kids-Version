import React from "react";
import { Outlet, Link } from "react-router-dom";
import Navbar from "../header/NavBar";
import SearchBar from "../header/SearchBar";
import Footer from "../footer/Footer";

const MainLayout = () => {
  return (
    <>
      <Navbar />
      <SearchBar />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default MainLayout;