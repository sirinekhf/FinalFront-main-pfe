import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";

const HeaderWrap = () => {
  const location = useLocation();
  const isLoginForm =
    location.pathname === "/connexion" || location.pathname === "/register";
  if (isLoginForm) {
    return null;
  }
  return (
    <div>
      <Header />
    </div>
  );
};

export default HeaderWrap;
