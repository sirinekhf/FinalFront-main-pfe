import React, { useEffect, useState, useContext, useRef } from "react";
import { Navbar, Container, Nav, Form, Button } from "react-bootstrap";
import {
  House,
  BoxArrowInRight,
  Cart3,
  BoxArrowInLeft,
  PersonCheck,
  PersonExclamation,
  BagHeart,
  Person,
} from "react-bootstrap-icons";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import SearchBar from "./SearchBar";
import SearchResultList from "./SearchResultList";

const NavbarSec = ({ CartItem }) => {
  const { user, logoutUser } = useContext(AuthContext);
  const [results, setResults] = useState([]);
  const [showMenu, setShowMenu] = useState(false);
  const [scrol, setScrol] = useState(false);
  const dropdownRef = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();
  const isHome = location.pathname === "/";
  const [input, setInput] = useState("");
  const ChangeColor = () => {
    if (window.scrollY > 30) setScrol(true);
    else setScrol(false);
  };
  window.addEventListener("scroll", ChangeColor);

  const handleClick = (event) => {
    if (dropdownRef.current && dropdownRef.current.contains(event.target)) {
      setShowMenu(!showMenu);
    } else {
      setShowMenu(false);
    }
  };
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);
  const [present, setPresent] = useState(true);
  useEffect(() => {
    if (user) {
      if (user.type === "comercial" || user.type === "admin") setPresent(false);
    }
  }, []);
  return (
    <Navbar
      expand="lg"
      className={isHome && !scrol ? "navbar" : "navbar scrolled"}
    >
      <Container>
        <Navbar.Brand>
          <Link to="/">
            <img
              src={require("../../Assets/images/gsh.png")}
              className="logo"
              alt="logo"
            />
          </Link>
        </Navbar.Brand>

        <Navbar.Toggle aria-controls="basic-navbar-nav">
          <span className="navbar-toggler-icon"></span>
        </Navbar.Toggle>
        <div>
          {" "}
          <SearchBar
            setResults={setResults}
            input={input}
            setInput={setInput}
          />
          {results.length > 0 ? (
            <SearchResultList
              results={results}
              setResults={setResults}
              setInput={setInput}
            />
          ) : null}
        </div>

        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto links">
            <Nav.Link
              className={
                location.pathname === "/" ? "navbar-link active" : "navbar-link"
              }
            >
              <House />
              <p onClick={() => navigate("/")} className="link-nav">
                Accueil
              </p>
            </Nav.Link>

            {present ? (
              <>
                <Nav.Link className="navbar-link">
                  {user ? (
                    <div ref={dropdownRef}>
                      <button onClick={handleClick} className="icon-button">
                        <PersonCheck />{" "}
                        {user && <p className="icon-name">{user.name}</p>}
                      </button>
                      {showMenu ? (
                        <div className="menu-items">
                          <ul>
                            <li>
                              <PersonExclamation />
                              <p onClick={() => navigate("/editProfile")}>
                                Mon Compte
                              </p>
                            </li>
                            <li>
                              <BagHeart />
                              <p onClick={() => navigate("/commandes")}>
                                Mes commandes
                              </p>
                            </li>
                            <li>
                              <BoxArrowInLeft />
                              <p onClick={logoutUser}> Déconnexion </p>
                            </li>
                          </ul>
                        </div>
                      ) : null}
                    </div>
                  ) : (
                    <>
                      <BoxArrowInRight />
                      <p
                        onClick={() => navigate("/connexion")}
                        className="link-nav"
                      >
                        Connexion
                      </p>
                    </>
                  )}
                </Nav.Link>

                <Nav.Link
                  className={
                    location.pathname === "/cart"
                      ? "navbar-link active"
                      : "navbar-link"
                  }
                >
                  <div className="panier">
                    {" "}
                    <Cart3 />
                    <span>{CartItem.length === 0 ? "0" : CartItem.length}</span>
                  </div>
                  <p className="link-nav" onClick={() => navigate("/cart")}>
                    Panier
                  </p>
                </Nav.Link>
              </>
            ) : (
              <Nav.Link>
                <p className="link-nav" onClick={() => navigate("/comercial")}>
                  Naviger à votre session
                </p>
              </Nav.Link>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default NavbarSec;
