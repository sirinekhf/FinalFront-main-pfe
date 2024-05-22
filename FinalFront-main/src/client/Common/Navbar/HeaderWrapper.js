import React from "react";
import { useLocation } from "react-router-dom";

import NavbarSec from "./NavbarSec";

const HeaderWrapper = ({ CartItem }) => {
  const location = useLocation();
  const isLoginForm =
    location.pathname === "/connexion" || location.pathname === "/register";

  if (isLoginForm) {
    return null;
  }
  return (
    <div>
      <NavbarSec CartItem={CartItem} />
    </div>
  );
};

export default HeaderWrapper;
