import { Box, Button } from "@mui/material";
import Header from "../../components/Header";
import { useState } from "react";
import "./style.css";
import axios from "axios";
import Model from "../../components/Model";

const Form = () => {
  const [name, setUserName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [model, setModel] = useState(false);
  const handleCreate = (e) => {
    e.preventDefault();
    axios
      .post(
        "http://localhost:8000/users/register",
        {
          name: name,
          email: name,
          password: "azerty123",
          is_comercial: "true",
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      .then((response) => {
        const emailAlreadyExists = response.data.emailAlreadyExists;
        emailAlreadyExists
          ? setErrorMessage("Ce username existe déja.")
          : setErrorMessage("Commercial créer.");
        !emailAlreadyExists && setUserName(" ");
      })
      .catch((error) => {
        console.error("erreur dans register", error);
      });
  };
  return (
    <Box m="20px">
      <Header
        title="CREATION D'UN COMPTE COMMERCIAL"
        subtitle="creation d'on nouveau compte comercial"
      />
      <form onSubmit={handleCreate} className="createuser-form">
        <input
          type="text"
          placeholder="username"
          name={name}
          value={name}
          onChange={(e) => setUserName(e.target.value)}
        />
        <br />
        <span>*Le mot de passe est généré automatiquement: azerty123</span>
        <br />
        <Button
          type="submit"
          color="secondary"
          variant="contained"
          onClick={() => setModel(!model)}
        >
          Creer le compte
        </Button>
      </form>
      {model && <Model msg={errorMessage} model={model} setModel={setModel} />}
    </Box>
  );
};
export default Form;

{
  /* 
         <TextField
            fullWidth
            variant="filled"
            type="text"
            label="Nom d'utilisateur"
            value={values.firstName}
            onBlur={handleBlur}
            onChange={(e) => setUserName(e.target.value)}
            name="firstName"
            error={!!touched.firstName && !!errors.firstName}
            helperText={touched.firstName && errors.firstName}
            sx={{
              gridColumn: "span 2",
            }}
          />
        <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Last Name"
                value={values.lastName}
                onBlur={handleBlur}
                onChange={handleChange}
                name="lastName"
                error={!!touched.lastName && !!errors.lastName}
                helperText={touched.lastName && errors.lastName}
                sx={{
                  gridColumn: "span 2",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Email"
                value={values.email}
                onBlur={handleBlur}
                onChange={handleChange}
                name="email"
                error={!!touched.email && !!errors.email}
                helperText={touched.email && errors.email}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Contact Number"
                value={values.contact}
                onBlur={handleBlur}
                onChange={handleChange}
                name="contact"
                error={!!touched.contact && !!errors.contact}
                helperText={touched.contact && errors.contact}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 1"
                value={values.address1}
                onBlur={handleBlur}
                onChange={handleChange}
                name="address1"
                error={!!touched.address1 && !!errors.address1}
                helperText={touched.address1 && errors.address1}
                sx={{
                  gridColumn: "span 4",
                }}
              />
              <TextField
                fullWidth
                variant="filled"
                type="text"
                label="Address 2"
                value={values.address2}
                onBlur={handleBlur}
                onChange={handleChange}
                name="address2"
                error={!!touched.address2 && !!errors.address2}
                helperText={touched.address2 && errors.address2}
                sx={{
                  gridColumn: "span 4",
                }}
              /> 
            </Box>*/
}
