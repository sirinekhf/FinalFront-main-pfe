import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import "./editProfile.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
const EditProfile = () => {
  const { user } = useContext(AuthContext);
  const type = user.type;
  const [name, setName] = useState(user.name);
  const [phone, setphone] = useState(user.phone);
  const [email, setMail] = useState(user.email);
  const [street, setstreet] = useState("");
  const [street2, setstreet2] = useState("");
  const [communename, setCommuneName] = useState("");
  const [wilayaname, setWilayaName] = useState("");
  const [localite_id, setlocalite_id] = useState("");
  const [redirect, setredirect] = useState(false);
  const [bool, setBool] = useState(false);
  const [wilaya, setWilaya] = useState([]);
  const [state_id, setWilayaId] = useState([]);
  const [commune, setCommune] = useState([]);
  const [partner, setPartner] = useState();
  const navigate = useNavigate();
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

  const submit = async (e) => {
    e.preventDefault();
    let response = await fetch("http://localhost:8000/partners/edit", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        email,
        phone,
        street,
        street2,
        state_id,
        localite_id,
      }),
    });

    if (response.status === 200) {
      setredirect(true);
    }
  };
  if (redirect) return navigate("/");

  return (
    <div className="container d-flex justify-content-center align-items-center ">
      <div className="Editform" onSubmit={submit}>
        <div className="liv-form">
          <h4>Profile</h4>
          <form>
            <div className="first-input">
              <span>Email</span>
              <input
                type="email"
                placeholder="Email"
                name="mail"
                value={email || ""}
                onChange={(e) => setMail(e.target.value)}
                required
              />
            </div>
            <div className="first-input">
              <span>Nom</span>
              <input
                type="text"
                placeholder="Nom"
                name="nom"
                value={name || ""}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="first-input">
              <span>+213</span>
              <input
                type="text"
                placeholder="Téléphone mobile"
                name="phone"
                value={phone || ""}
                onChange={(e) => setphone(e.target.value)}
                minLength={10}
                required
              />
            </div>
            <div>
              <h5>Adresse</h5>
              <input
                type="text"
                placeholder="Adresse"
                name="street"
                onChange={(e) => setstreet(e.target.value)}
                style={{ width: "100%" }}
                value={street || ""}
                required
              />
              {/* <input
                type="text"
                placeholder="Adresse 2"
                style={{ width: "100%" }}
                name="street2"
                value={street2 || ""}
                onChange={(e) => setstreet2(e.target.value)}
              /> */}
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
              </div>{" "}
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

            {type === "groupe" ? (
              <>
                <h5>Données supplémentaires</h5>
                <div className="d-flex first-input">
                  <input
                    type="text"
                    name="Secteur"
                    className="form-control"
                    placeholder="Secteur"
                  />
                  <input
                    type="text"
                    name="Activite"
                    className="form-control"
                    placeholder="Activite"
                  />
                </div>
                <div className="d-flex first-input">
                  <input
                    type="text"
                    name="Societe mere"
                    className="form-control"
                    placeholder="Societe mere"
                  />
                  <input
                    type="text"
                    className="form-control"
                    placeholder="Branche"
                    name="Branche"
                  />
                </div>

                <input
                  type="text"
                  name="N° de registre de commerce"
                  className="form-control"
                  placeholder="N° de registre de commerce"
                />
                <div className="d-flex first-input">
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="NIS"
                  />
                  <input
                    type="text"
                    name="name"
                    className="form-control"
                    placeholder="ART"
                  />
                </div>
                <div className="d-flex first-input">
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="Code comptable"
                  />
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="Date denregistrement RC"
                  />
                </div>
                <div className="d-flex first-input">
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="N° d'identification Fiscle NIF"
                  />
                  <input
                    type="text"
                    name="Name"
                    className="form-control"
                    placeholder="TIN"
                  />
                </div>
              </>
            ) : null}
            <div className="d-flex justify-content-end">
              <div className="d-flex btn-form">
                <button type="submit" className="success-Ok">
                  ENREGISTRER
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
    // <div class="container d-flex justify-content-center align-items-center">
    //   <div className="Editform" onSubmit={submit}>
    //     <form className="form-edit">
    //       <h1 className="h3 mb-3 fw-normal">Edit Profile</h1>
    //       <input
    //         type="text"
    //         name="nom"
    //         className="form-control"
    //         placeholder="Modifier votre Nom"
    //         onChange={(e) => setName(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         type="text"
    //         name="phone"
    //         className="form-control"
    //         placeholder="N° de telephone"
    //         onChange={(e) => setphone(e.target.value)}
    //       />
    //       <br />
    //       <label>Adresse</label>
    //       <br />
    //       <input
    //         type="text"
    //
    //         className="form-control"
    //         placeholder="Rue ..."
    //         name="street"
    //         onChange={(e) => setstreet(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         type="text"
    //         name="street2"
    //         className="form-control"
    //         placeholder="Rue ..."
    //         onChange={(e) => setstreet2(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         type="text"
    //         name="state_id"
    //         className="form-control"
    //         placeholder="Wilaya "
    //         onChange={(e) => setstate_id(e.target.value)}
    //       />{" "}
    //       <input
    //         type="text"
    //         name="localite_id"
    //         className="form-control"
    //         placeholder="Commune"
    //         onChange={(e) => setlocalite_id(e.target.value)}
    //       />{" "}
    //       <input
    //         type="text"
    //         name="zip"
    //         className="form-control"
    //         placeholder="Code postal"
    //         onChange={(e) => setzip(e.target.value)}
    //       />
    //       <br />
    //       <input
    //         type="text"
    //         name="country_id"
    //         className="form-control"
    //         placeholder="Pays"
    //         onChange={(e) => setcountry_id(e.target.value)}
    //       />
    //       <br />
    //       {type === "groupe" ? (
    //         <>
    //           <input
    //             type="text"
    //             name="Secteur"
    //             className="form-control"
    //             placeholder="Code postal"
    //           />
    //           <br />
    //           <input
    //             type="text"
    //             name="Activite"
    //             className="form-control"
    //             placeholder="Activite"
    //           />
    //           <input
    //             type="text"
    //             name="Branche"
    //             className="form-control"
    //             placeholder="Branche"
    //           />
    //           <input
    //             type="text"
    //             name="Societe mere"
    //             className="form-control"
    //             placeholder="Societe mere"
    //           />
    //           <input
    //             type="text"
    //             name="N° de registre de commerce"
    //             className="form-control"
    //             placeholder="N° de registre de commerce"
    //           />
    //           <input
    //             type="text"
    //             name="name"
    //             className="form-control"
    //             placeholder="NIS"
    //           />
    //           <input
    //             type="text"
    //             name="name"
    //             className="form-control"
    //             placeholder="ART"
    //           />
    //           <input
    //             type="text"
    //             name="Name"
    //             className="form-control"
    //             placeholder="Code comptable"
    //           />
    //           <input
    //             type="text"
    //             name="Name"
    //             className="form-control"
    //             placeholder="Date denregistrement RC"
    //           />
    //           <input
    //             type="text"
    //             name="Name"
    //             className="form-control"
    //             placeholder="N° d'identification Fiscle NIF"
    //           />
    //           <input
    //             type="text"
    //             name="Name"
    //             className="form-control"
    //             placeholder="TIN"
    //           />
    //         </>
    //       ) : null}
    //       <button className="w-100 btn btn-lg btn-primary" type="submit">
    //         Modifier
    //       </button>
    //       <br />
    //       <br />
    //     </form>
    //  </div>
    //</div>
  );
};
export default EditProfile;
