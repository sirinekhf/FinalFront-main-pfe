import React, { useContext, useEffect, useState } from "react";
import "./commandes.css";
import { Col, Container, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";

const LivraisonPage = () => {
  const { id, amount } = useParams();

  const { user } = useContext(AuthContext);
  const [bool, setBool] = useState(false);

  const [secondStep, setSecondStep] = useState(false);
  const [name, setName] = useState(user.name);
  const [phone, setphone] = useState(user.phone);
  const [email, setMail] = useState(user.email);
  const [mode, setMode] = useState("EDAHABIA");
  const [street, setstreet] = useState("");
  const [street2, setstreet2] = useState("");
  const [communename, setCommuneName] = useState("");
  const [wilayaname, setWilayaName] = useState("");
  const [localite_id, setlocalite_id] = useState("");
  const [state_id, setWilayaId] = useState("");
  const [wilaya, setWilaya] = useState([]);
  const [commune, setCommune] = useState([]);
  const [partner, setPartner] = useState();

  const dataApi = {
    name,
    email,
    phone,
    street,
    street2,
    state_id,
    localite_id,
  };
  const data = {
    state: "paid",
  };
  const handlePaiement = (e) => {
    e.preventDefault();
    const client = user.name;
    const clientEmail = user.email;
    const queryParams = `${client}&${clientEmail}&${amount}&${mode}`;
    axios
      .patch(`http://localhost:8000/partners/edit`, dataApi)
      .then((response) => {})
      .catch((error) => console.log(error));
    axios
      .patch(
        `http://localhost:8000/orders/saleorder/${id}/user/${user.user_id}/update/`,
        data
      )
      .then((response) => {})
      .catch((error) => console.log(error));
    console.log("mode", mode);
    window.location.href = `http://localhost:8000/pay/create/${queryParams}/`;
  };
  useEffect(() => {
    axios
      .get(`http://localhost:8000/partners/getpartnerfromuser/${user.user_id}`)
      .then((response) => {
        setPartner(response.data);
        setstreet(response.data?.street);
        setstreet2(response.data?.street2);
        setlocalite_id(response.data?.localite_id);
        setWilayaId(response.data?.code_ville);
        setWilayaName(response.data?.wilaya);
        setCommuneName(response.data?.commune);
        setBool(true);
      })
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    axios
      .get("http://localhost:8000/partners/getwilaya")
      .then((response) => setWilaya(response.data))
      .catch((error) => console.log(error));
  }, []);

  useEffect(() => {
    if (bool) {
      axios
        .get(`http://localhost:8000/partners/getcommune/${state_id}`)
        .then((response) => setCommune(response.data))
        .catch((error) => console.log(error));
    }
  }, [bool, state_id]);

  return (
    <div className="livrer">
      <Container>
        {!secondStep ? (
          <Row>
            <Col xs={9} md={10} xl={10}>
              <div className="liv-form">
                <h3> Informations de livraison</h3>
                <form>
                  <div className="d-flex">
                    <div className="inputs">
                      <span>Email</span>

                      <input
                        type="text"
                        placeholder="Email"
                        name="mail"
                        value={email}
                        onChange={(e) => setMail(e.target.value)}
                        required
                      />
                    </div>
                    <div className="inputs">
                      <span>+213</span>
                      <input
                        type="text"
                        placeholder="Téléphone mobile"
                        name="phone"
                        value={phone}
                        onChange={(e) => setphone(e.target.value)}
                        required
                      />
                    </div>
                  </div>
                  <div className="inputs" style={{ width: "100%" }}>
                    <span>Adresse</span>
                    <input
                      type="text"
                      placeholder="Adresse"
                      name="street"
                      onChange={(e) => setstreet(e.target.value)}
                      style={{ width: "100%" }}
                      value={street}
                      required
                    />
                  </div>
                  <div className="d-flex">
                    <div className="inputs">
                      <span>Wilaya</span>
                      <select
                        name="wilaya"
                        onChange={(e) => {
                          setWilayaId(e.target.value);
                          setCommuneName("");
                        }}
                        className="custom-select"
                        required
                      >
                        <option value="">{wilayaname}</option>
                        {wilaya.map((item, index) => {
                          return (
                            <option key={index} value={item.code}>
                              {item.code} {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                    <div className="inputs">
                      <span>Commune</span>
                      <select
                        name="commune"
                        className="custom-select"
                        onChange={(e) => setlocalite_id(e.target.value)}
                        required
                      >
                        <option value="">{communename}</option>
                        {commune.map((item, index) => {
                          return (
                            <option key={index} value={item.id}>
                              {item.name}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="d-flex btn-form">
                      <button
                        className="success-Ok"
                        onClick={() => setSecondStep(true)}
                      >
                        CONTINUER
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
            <Col xs={3} md={2} xl={2}></Col>
          </Row>
        ) : (
          <Row>
            <Col xs={9} md={10} xl={10}>
              <div className="liv-form">
                <h3> Informations de Paiement</h3>
                <form>
                  <div className="inputs" style={{ width: "100%" }}>
                    <span style={{ width: "36%" }}>
                      Numero de la carte de crédit
                    </span>
                    <input
                      type="number"
                      placeholder="carte de crédit"
                      maxLength={16}
                      minLength={16}
                    />
                  </div>
                  <div className="inputs" style={{ width: "100%" }}>
                    <span style={{ width: "36%" }}>Code CVC2/CVV2</span>
                    <input type="number" placeholder="CVC2/CVV2" />
                  </div>
                  <div className="inputs" style={{ width: "100%" }}>
                    <span style={{ width: "36%" }}>Date d'expiration</span>
                    <input
                      type="month"
                      min="yyyy-MM"
                      max="yyyy-MM"
                      inputMode="numeric"
                      placeholder="Date d'expiration"
                    />
                  </div>
                  <div className="inputs" style={{ width: "100%" }}>
                    <span style={{ width: "36%" }}>Mode de Paiement</span>

                    <select
                      name="mode"
                      className="custom-select"
                      style={{ width: "90%" }}
                      onChange={(e) => setMode(e.target.value)}
                    >
                      <option value="EDAHABIA">EDAHABIA</option>
                      <option value="CIB">CIB</option>
                    </select>
                  </div>
                  <div className="d-flex justify-content-end">
                    <div className="d-flex btn-form">
                      <button
                        className="success-Ok"
                        onClick={(e) => handlePaiement(e, amount)}
                      >
                        CONTINUER
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </Col>
          </Row>
        )}
      </Container>
    </div>
  );
};

export default LivraisonPage;
