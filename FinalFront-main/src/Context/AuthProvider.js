import React, { useState, useEffect } from "react";
import { AuthContext } from "./AuthContext";
import jwt_decode from "jwt-decode";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";

const handleButtonClick = (message) => {
  confirmAlert({
    title: `Alerte`,
    message: message,
    buttons: [
      {
        label: "OK",
        onClick: () => {
          console.log("Cancelled");
        },
      },
    ],
  });
};

export const AuthProvider = ({ children }) => {
  let [authTokens, setAuthTokens] = useState(() =>
    localStorage.getItem("authTokens")
      ? JSON.parse(localStorage.getItem("authTokens"))
      : null
  );
  let [user, setUser] = useState(() =>
    localStorage.getItem("authTokens")
      ? jwt_decode(localStorage.getItem("authTokens"))
      : null
  );
  let [login_msg, setLoggingMsg] = useState("");
  const navigate = useNavigate();
  let [loading, setLoading] = useState(true);
  let [loader, setLoader] = useState(false);
  // let loginUser = async (e) => {
  //   e.preventDefault();
  //   let response = await fetch("http://localhost:8000/api/token/", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       email: e.target.email.value,
  //       password: e.target.password.value,
  //     }),
  //   });
  //   let data = await response.json();

  //   if (response.status === 200) {
  //     setAuthTokens(data); //this state is used to check if the user is still loggedIn
  //     setUser(jwt_decode(data.access)); //decode a token and give us the object user
  //     localStorage.setItem("authTokens", JSON.stringify(data));
  //     console.log(data.type);

  //     if (data.type === "particulier") navigate("/");
  //     else if (data.type === "groupe") navigate("/editProfile");
  //     else if (data.type === "comercial") navigate("/comercial");
  //     else if (data.type === "admin") navigate("/comercial");
  //   } else {
  //     alert("LoginUser Fail");
  //   }
  // };

  function base64FromArrayBuffer(buffer) {
    let binary = "";
    const bytes = new Uint8Array(buffer);
    const len = bytes.byteLength;

    for (let i = 0; i < len; i++) {
      binary += String.fromCharCode(bytes[i]);
    }

    return btoa(binary);
  }
  let loginUser = async (e) => {
    e.preventDefault();
    setLoader(true);
    // const basicAuth =
    //   "Basic" + btoa(e.target.email.value + ":" + e.target.password.value);
    const email = e.target.email.value;
    const password = e.target.password.value;

    const encoder = new TextEncoder();
    const dataa = encoder.encode(`${email}:${password}`);
    const base64 = base64FromArrayBuffer(dataa);

    const basicAuth = `Basic ${base64}`;
    let response = await fetch(
      "https://api.ldap.groupe-hasnaoui.com/pumaprd/auth",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
          "Access-Control-Allow-Origin": "*",
          "Access-Control-Allow-Credentials": "true",
          Authorization: basicAuth,
        },
      }
    );
    let data = await response.json();
    if (data.authenticated) {
      axios
        .post("http://localhost:8000/api/token/", {
          email: email,
          password: password,
        })
        .then((response) => {
          if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            navigate("/comercial");
            setLoader(false);
          }
        })
        .catch(() => {
          axios
            .post(
              "http://localhost:8000/users/register",
              {
                name: data.userinfo.fullname,
                email: email,
                password: password,
                is_comercial: true,
                is_active: true,
                is_new: false,
              },
              {
                headers: {
                  "Content-Type": "application/json",
                },
              }
            )
            .then((response) => {
              setLoader(false);
              axios
                .post("http://localhost:8000/api/token/", {
                  email: email,
                  password: password,
                })
                .then((response) => {
                  if (response.status === 200) {
                    setAuthTokens(response.data);
                    setUser(jwt_decode(response.data.access));
                    localStorage.setItem(
                      "authTokens",
                      JSON.stringify(response.data)
                    );
                    navigate("/comercial");
                  }
                });
            })
            .catch((error) => {
              console.error("erreur dans register", error);
              setLoader(false);
            });
        });
    } else {
      axios
        .post("http://localhost:8000/api/token/", {
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((response) => {
          setLoader(false);
          if (response.status === 200) {
            setAuthTokens(response.data);
            setUser(jwt_decode(response.data.access));
            localStorage.setItem("authTokens", JSON.stringify(response.data));
            setLoggingMsg("");
            setLoader(false);
            if (response.data.type === "particulier") navigate("/");
            else if (response.data.type === "groupe") navigate("/editProfile");
            else if (response.data.type === "comercial") navigate("/comercial");
            else if (response.data.type === "admin") navigate("/comercial");
          } else {
            setLoader(false);
            alert("LoginUser Fail");
          }
        })
        .catch((error) => {
          setLoggingMsg(error.response.data.detail);
          setLoader(false);
          // handleButtonClick(error.response.data.detail);
        });
    }
  };

  let logoutUser = () => {
    setAuthTokens(null);
    setUser(null);
    localStorage.removeItem("authTokens");
    navigate("/connexion");
  };

  let updateToken = async () => {
    let response = await fetch("http://localhost:8000/api/token/refresh/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ refresh: authTokens?.refresh }),
    });
    let data = await response.json();
    if (response.status === 200) {
      setAuthTokens(data);
      setUser(jwt_decode(data.access));
      localStorage.setItem("authTokens", JSON.stringify(data));
    } else {
      logoutUser();
    }
    if (loading) {
      setLoading(false);
    }
  };

  let contextData = {
    login_message: login_msg,
    user: user,
    loader: loader,
    loginUser: loginUser,
    logoutUser: logoutUser,
  };
  useEffect(() => {
    if (loading && user) {
      updateToken();
    }

    let fourMinutes = 1000 * 60 * 4;

    let interval = setInterval(() => {
      if (authTokens) {
        updateToken();
      }
    }, fourMinutes);
    return () => clearInterval(interval);
  }, [authTokens, loading]);

  return (
    <AuthContext.Provider value={contextData}>{children}</AuthContext.Provider>
  );
};
