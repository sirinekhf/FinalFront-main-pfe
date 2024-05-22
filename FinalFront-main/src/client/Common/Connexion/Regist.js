import React, { useState } from "react";
import Register from "./Register";
import "./style.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
const handleInscription = (name) => {
  confirmAlert({
    title: `Alerte`,
    message: `${name}, votre compte n'est pas encore active, vous serez informer par email une fois votre compte est active.`,
    buttons: [
      {
        label: "Fermer",
      },
    ],
  });
};
const Regist = () => {
  const [values, setValues] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
  const [is_client_particulier, setclientParticulier] = useState(false);
  const [is_client_groupe, setclientGroupe] = useState(false);
  const [redirect, setredirect] = useState(false);
  const navigate = useNavigate();
  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Nom et prenom",
      errorMessage:
        "Le nom doit être une chaine de caractères de longueur 3-16 sans caracteres spéciaux !",
      label: "Nom et prénom",
      pattern: "^[A-Za-z ]{3,16}$",
      required: true,
    },
    {
      id: 2,
      name: "email",
      type: "email",
      placeholder: "Email",
      errorMessage: "L'adresse e-mail doit être valide !",
      label: "Email",
      required: true,
    },
    {
      id: 3,
      name: "phone",
      type: "tel",
      placeholder: "Numéro de téléphone",
      errorMessage: "Veillez entrer un numé ro de téléphone valide !",
      label: "Numéro de téléphone",
      pattern: "[0-9]{8,10}",
    },
    {
      id: 4,
      name: "password",
      type: "password",
      placeholder: "mot de passe",
      errorMessage:
        "Mot de passe doit etre de 8-20 caractères avec au moins  1 lettre, 1 nombre and 1 caractère spécial !",
      label: "Mot de passe ",
      pattern: `^(?=.*[0-9])(?=.*[a-zA-Z])[a-zA-Z0-9]{8,20}$`,
      required: true,
    },
    {
      id: 5,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirmer le mot de passe ",
      errorMessage: "mot de passe ne correspond pas !",
      label: "Confirmer le mot de passe ",
      pattern: values.password,
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/users/register",
        {
          name: values.username,
          email: values.email,
          password: values.password,
          phone: values.phone,
          is_client_groupe: is_client_groupe,
          is_client_particulier: is_client_particulier,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        handleInscription(values.username);
        setredirect(true);
      })
      .catch((error) => {
        console.error("erreur dans register", error);
      });
  };
  redirect && navigate("/connexion");

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="regist">
      <form onSubmit={handleSubmit}>
        <h1>S'inscrire </h1>
        {inputs.map((input) => (
          <Register
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <input
          type="radio"
          id="client"
          name="client"
          value="is_client_particulier"
          onChange={(e) => setclientParticulier(true)}
          required
        />
        <label htmlFor="is_client_particulier">Particulier</label>
        <input
          type="radio"
          id="client1s"
          name="client"
          value="is_client_groupe"
          required
          onChange={(e) => setclientGroupe(true)}
        />
        <label htmlFor="is_client_groupe">Groupe</label>
        <br />
        <button>S'inscrire</button>
      </form>
    </div>
  );
};

export default Regist;
