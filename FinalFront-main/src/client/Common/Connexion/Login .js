import React, { useContext, useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import { AuthContext } from "../../../Context/AuthContext";
import { Container, Row, Col } from "react-bootstrap";
import LoadingButton from "../../Components/LoadingButton";

const Login = () => {
  let { loginUser } = useContext(AuthContext);
  let { login_message } = useContext(AuthContext);
  let { loader } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isValidated, setValidated] = useState(false);

  const handleChangeEmail = (event) => {
    if (!isValidated) {
      setValidated(true);
    }
  };

  // const password = document.getElementById("password-input");
  // const passwordAlert = document.getElementById("password-alert");
  // let lengBoolean;
  // useEffect(() => {
  //   const password = document.getElementById("password-input");
  //   const passwordAlert = document.getElementById("password-alert");
  //   const requirements = document.querySelectorAll(".requirements");
  //   let lengBoolean, bigLetterBoolean, numBoolean;
  //   let leng = document.querySelector(".leng");
  //   let bigLetter = document.querySelector(".big-letter");
  //   let num = document.querySelector(".num");
  //   const numbers = "0123456789";

  //   requirements.forEach((element) => element.classList.add("wrong"));

  //   password.addEventListener("focus", () => {
  //     passwordAlert.classList.remove("d-none");
  //     if (!password.classList.contains("is-valid")) {
  //       password.classList.add("is-invalid");
  //     }
  //   });

  //   password.addEventListener("input", () => {
  //     let value = password.value;
  //     if (value.length < 8) {
  //       lengBoolean = false;
  //     } else if (value.length > 7) {
  //       lengBoolean = true;
  //     }

  //     if (value.toLowerCase() == value) {
  //       bigLetterBoolean = false;
  //     } else {
  //       bigLetterBoolean = true;
  //     }

  //     numBoolean = false;
  //     for (let i = 0; i < value.length; i++) {
  //       for (let j = 0; j < numbers.length; j++) {
  //         if (value[i] == numbers[j]) {
  //           numBoolean = true;
  //         }
  //       }
  //     }

  //     if (
  //       lengBoolean == true &&
  //       bigLetterBoolean == true &&
  //       numBoolean == true
  //     ) {
  //       password.classList.remove("is-invalid");
  //       password.classList.add("is-valid");

  //       requirements.forEach((element) => {
  //         element.classList.remove("wrong");
  //         element.classList.add("good");
  //       });
  //       passwordAlert.classList.remove("alert-warning");
  //       passwordAlert.classList.add("alert-success");
  //     } else {
  //       password.classList.remove("is-valid");
  //       password.classList.add("is-invalid");

  //       passwordAlert.classList.add("alert-warning");
  //       passwordAlert.classList.remove("alert-success");

  //       if (lengBoolean == false) {
  //         leng.classList.add("wrong");
  //         leng.classList.remove("good");
  //       } else {
  //         leng.classList.add("good");
  //         leng.classList.remove("wrong");
  //       }

  //       if (bigLetterBoolean == false) {
  //         bigLetter.classList.add("wrong");
  //         bigLetter.classList.remove("good");
  //       } else {
  //         bigLetter.classList.add("good");
  //         bigLetter.classList.remove("wrong");
  //       }

  //       if (numBoolean == false) {
  //         num.classList.add("wrong");
  //         num.classList.remove("good");
  //       } else {
  //         num.classList.add("good");
  //         num.classList.remove("wrong");
  //       }
  //     }
  //   });

  //   password.addEventListener("blur", () => {
  //     passwordAlert.classList.add("d-none");
  //   });

  //   return () => {
  //     password.removeEventListener("focus", handlePasswordFocus);
  //     password.removeEventListener("input", handlePasswordInput);
  //     password.removeEventListener("blur", handlePasswordBlur);
  //   };
  // }, []);
  // const handlePasswordFocus = () => {
  //   passwordAlert.classList.remove("d-none");
  //   if (!password.classList.contains("is-valid")) {
  //     password.classList.add("is-invalid");
  //   }
  // };
  // const handlePasswordInput = () => {
  //   let value = password.value;
  //   if (value.length < 8) {
  //     lengBoolean = false;
  //   } else if (value.length > 7) {
  //     lengBoolean = true;
  //   }
  // };

  // const handlePasswordBlur = () => {
  //   passwordAlert.classList.add("d-none");
  // };

  return (
    <Container>
      <Row>
        <Col xl={6}>
          {" "}
          <img
            src={require("../../Assets/images/login2.png")}
            className="login-img"
          />
        </Col>
        <Col xl={6}>
          <div
            className={
              "wrapperr align-items-center justify-content-center w-100"
            }
            onSubmit={loginUser}
          >
            <div className="login" onSubmit={loginUser}>
              <h2>Bienvenu chez Groupe Hasnaoui</h2>
              <form className="needs-validation">
                <div
                  className={`form-group ${
                    isValidated ? "was-validated" : ""
                  } mb-2`}
                >
                  <input
                    name="email"
                    type="email"
                    className={
                      login_message === "Cette utilisateur n'existe pas !"
                        ? "form-control error-border"
                        : "form-control"
                    }
                    placeholder="Adresse email"
                    required
                    onChange={handleChangeEmail}
                  />
                  <div className="invalid-feedback">
                    {" "}
                    L'adresse email renseignée n'est pas valide{" "}
                  </div>
                </div>
                {login_message === "Cette utilisateur n'existe pas !" ? (
                  <p style={{ color: "red" }}>{login_message}</p>
                ) : null}
                <div className="form-group mb-2">
                  <input
                    name="password"
                    type="password"
                    className={
                      login_message === "Mot de passe incorrect !"
                        ? "form-control  error-border"
                        : "form-control"
                    }
                    placeholder="Mot de passe"
                    aria-label="password"
                    aria-describedby="password"
                    id="password-input"
                    required
                  />
                </div>

                {login_message === "Mot de passe incorrect !" ||
                login_message === "Ce compte est désactivé !" ? (
                  <p style={{ color: "red" }}>{login_message}</p>
                ) : null}
                <div className="btn-container">
                  <button type="submit" className="btn btn-success w-100 mt-2">
                    {loader ? <LoadingButton /> : "Se connecter"}
                  </button>
                  <br />
                  <button
                    type="submit"
                    onClick={() => navigate("/register")}
                    className="btn btn-success w-100 mt-2"
                  >
                    Creer un nouveau compte
                  </button>
                </div>
                <a href="#" className="link-register">
                  Mot de passe oublié?
                </a>
                <br />
              </form>
            </div>

            <div className="error mt-4 mt-xxl-0 w-auto h-auto">
              <div
                className=" px-4 py-3 mb-0 d-none"
                role="alert"
                data-mdb-color="warning"
                id="password-alert"
              >
                <ul className="list-unstyled mb-0">
                  <li className="requirements leng"></li>
                  <li className="requirements big-letter"></li>
                  <li className="requirements num"></li>
                </ul>
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;
