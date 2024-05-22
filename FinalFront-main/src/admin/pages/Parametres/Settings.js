import React, { useEffect, useState } from "react";
import "./settings.css";
import { Container, Row, Col, Button } from "react-bootstrap";
import {
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import { Sliders2 } from "react-bootstrap-icons";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const Settings = () => {
  const [filiales, setFiliales] = useState([]);
  const [settings, setSettings] = useState();
  const [tva, setTVA] = useState("");
  const [company_name, setCompanyName] = useState("");
  const notify = () => {
    toast.success("Mise à jour des parametres est prise en charge", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/getcompanies/")
      .then((response) => setFiliales(response.data))
      .catch((error) => console.log(error));
    axios
      .get("http://localhost:8000/products/getsettings/")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const dataApi = {
    company_name,
    tva,
  };
  const handleSettingsChange = (event) => {
    const inputValue = event.target.value;
    setTVA(inputValue);
    if (
      inputValue === "" ||
      (inputValue !== "" &&
        !inputValue.startsWith("0.") &&
        Number(inputValue) >= 0 &&
        Number(inputValue) <= 100)
    ) {
      setSettings({ tva: inputValue });
    }
  };
  const handleConfirmClick = () => {
    axios
      .patch(`http://localhost:8000/products/editSettings`, dataApi)
      .then((response) => notify())
      .catch((error) => console.log(error));
  };

  return (
    <Container className="settings">
      <Row>
        <h1 className="text-center">
          <Sliders2 style={{ fontSize: "82%", marginRight: "1%" }} />
          Paramétres
        </h1>

        <Col xs={9} md={8} lg={8} className="mx-auto">
          <TextField
            fullWidth
            variant="filled"
            type="number"
            label="Taux de taxes en pourcentage"
            name="taxe"
            value={settings?.tva}
            onChange={handleSettingsChange}
            inputProps={{
              min: 1,
              max: 100,
              step: 1,
            }}
          />
          <br />
          <br />

          {/* <FormControl fullWidth variant="filled">
            <InputLabel id="filiale-label">La filiale</InputLabel>
            <Select
              labelId="filiale-label"
              id="filiale"
              name="filiale"
              style={{ height: "55px" }}
              onChange={(e) => {
                setCompanyName(e.target.value);
              }}
              value={settings?.company_name}
            >
              <MenuItem value={settings?.company_name}>
                {settings?.company_name}
              </MenuItem>
              {filiales.map((item, key) => {
                return (
                  <MenuItem value={item.name} key={key}>
                    {item.name}
                  </MenuItem>
                );
              })}
            </Select>
          </FormControl>
          <br /> */}
          <br />
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleConfirmClick()}
            style={{ float: "right" }}
          >
            Confirmer
          </Button>
        </Col>
      </Row>
      <ToastContainer
        position="top-left"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
    </Container>
  );
};

export default Settings;
