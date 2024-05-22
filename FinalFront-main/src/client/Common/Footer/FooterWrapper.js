import React from "react";
import Footer from "./Footer";
import { useLocation } from "react-router-dom";

const FooterWrapper = () => {
  const location = useLocation();

  // Check if the current path is "/login"
  const isLoginForm =
    location.pathname === "/connexion" || location.pathname === "/register";

  // Render the NavbarSec component everywhere except in the login form
  if (isLoginForm) {
    return null;
  }

  return (
    <div>
      <Footer />
    </div>
  );
};

export default FooterWrapper;
