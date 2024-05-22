import "./style.css";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Row, Col, Container } from "react-bootstrap";
import { tokens } from "../../theme";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { AuthContext } from "../../../Context/AuthContext";
import Box from "@mui/material/Box";
import axios from "axios";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";

const CommandeDetails = () => {
  const notify = () => {
    toast.success("Mise à jour de la commande est prise en charge", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  };
  const columns = [
    {
      field: "product id",
      headerName: "ID",
      flex: 1,
      valueGetter: (params) => params.row.product_id.product_product_id,
    },
    { field: "name", headerName: "Article", flex: 1 },

    {
      field: "product_id.attribute",
      headerName: "Choix",
      flex: 1,
      valueGetter: (params) => {
        const values = params.row.product_id.variantes_choice?.map((item) =>
          item.attribute ? `${item.attribute}: ${item.value}` : null
        );
        return values.join("\n");
      },
    },
    // {
    //   field: "product_id.attribute_value",
    //   headerName: "Attribute",
    //   flex: 1,
    //   valueGetter: (params) => params.row.product_id.attribute_value,
    // },
    { field: "qty_conditionnee", headerName: "Qté demandée", flex: 1 },
    { field: "order_uom_qty", headerName: "Qté conditionnée", flex: 1 },
    {
      field: "qty_available",
      headerName: "Stock Restant",
      flex: 1,
      valueGetter: (params) => {
        const qtyStockValues = params.row.qty_available.map((qtyStock) =>
          qtyStock.name
            ? `${qtyStock.name}: ${qtyStock.qty}`
            : `Bouira: ${qtyStock.qty}`
        );

        return qtyStockValues.join("\n");
      },
    },
    {
      field: "product_id.price",
      headerName: "Prix unitaire",
      flex: 1,
      valueGetter: (params) => params.row.product_id.price,
    },
    {
      field: "total ",
      headerName: "Sous total",
      flex: 1,
      valueGetter: (params) =>
        params.row.order_uom_qty * params.row.product_id.price,
      valueFormatter: (params) => ` ${params.value.toFixed(2)}DZ`,
    },
  ];
  const navigate = useNavigate();
  const { id } = useParams();
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [model, setModel] = useState(false);

  const { user } = useContext(AuthContext);
  const [cmd, setCmd] = useState([]);
  const [motif, setMotif] = useState("");
  const [commande, setCommande] = useState();
  const [chauffeur, setChauffeur] = useState("");
  const [Transporteur, setTransporteur] = useState("");
  const [ImRemorque, setImRemorque] = useState("");
  const [ImVehicule, setImVehicule] = useState("");
  const [scamp, setScamp] = useState("");
  const [disable, setDisable] = useState(false);
  const [update, setUpdate] = useState(false);
  const [disabled, setDisabled] = useState(false);
  const [canceled, setCanceled] = useState(false);

  const [checkboxValues, setCheckboxValues] = useState({
    is_convention: true,
    is_contract: false,
    shipped: false,
  });
  useEffect(() => {
    axios
      .get(`http://localhost:8000/orders/getCmd/${id}`)
      .then((response) => {
        setCommande(response.data);
        setDisabled(
          response.data.state === "paid" || response.data.state === "shipped"
        );
        setUpdate(response.data.state != "draft");
        setChauffeur(response.data.driver);
        setTransporteur(response.data.transporter);
        setImRemorque(response.data.matricule);
        setImVehicule(response.data.matricule_remorque);
        setScamp(response.data.fiscal_stamp_amount);
        if (
          response.data.state === "cancel" ||
          response.data.state === "shipped"
        )
          setCanceled(true);

        // const { is_convention, is_contract, shipped } = response.data;
        // setCheckboxValues({
        //   is_contract: is_contract,
        //   is_convention: is_convention,
        //   shipped: shipped,
        // });
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8000/orders/getCmdById/${id}`)
      .then((response) => {
        setCmd(response.data);
        console.log(response.data);
      })
      .catch((error) => console.log(error));
  }, [id]);

  // const handleChange = (e) => {
  //   const { name, checked } = e.target;
  //   setCheckboxValues((prevValues) => ({
  //     ...prevValues,
  //     [name]: checked,
  //   }));
  // };
  const handleSubmit = (e, state) => {
    e.preventDefault();
    setDisable(true);
    const dataApi = {
      state: state,
      driver: chauffeur,
      transporter: Transporteur,
      fiscal_stamp_amount: scamp,
      matricule: ImVehicule,
      matricule_remorque: ImRemorque,
      shipped: checkboxValues.shipped,
    };
    axios
      .patch(
        `http://localhost:8000/orders/saleorder/${id}/user/${user.user_id}/update/`,
        dataApi
      )
      .then((response) => {
        setDisable(false);
        setUpdate(true);
        if (state === "shipped") setCanceled(true);
        notify();
      })
      .catch((error) => console.log(error));
  };
  const handleRefuse = (e) => {
    e.preventDefault();
    setDisable(true);
    const dataApi = {
      state: "cancel",
    };
    axios
      .patch(
        `http://localhost:8000/orders/saleorder/${id}/user/${user.user_id}/update/`,
        dataApi
      )
      .then((response) => {
        setUpdate(true);
        setCanceled(true);
        notify();
      })
      .catch((error) => console.log(error));
  };
  const handleCancel = (e) => {
    e.preventDefault();
    const dataApi = {
      state: "cancel",
      driver: chauffeur,
      transporter: Transporteur,
      fiscal_stamp_amount: scamp,
      matricule: ImVehicule,
      matricule_remorque: ImRemorque,
      shipped: checkboxValues.shipped,
      is_contract: checkboxValues.is_contract,
      is_convention: checkboxValues.is_convention,
      motif: motif,
    };
    axios
      .patch(
        `http://localhost:8000/orders/saleorder/${id}/user/${user.user_id}/update/`,
        dataApi
      )
      .then((response) => {
        setUpdate(true);
        setCanceled(true);
      })
      .catch((error) => console.log(error));

    setModel(!model);
  };
  const handleClick = (id) => {
    navigate(`/comercial/userDetails/${id}`);
  };
  const handleRowClick = (id) => {
    navigate(`/comercial/productDetails/${id}`);
  };
  if (model) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }

  return (
    <div className="card">
      <Container>
        <Row>
          <div className="title"> Devis {commande?.name}</div>
          <Col xs={12} md={6} xl={6}>
            <div className="cmd-data">
              <div>
                <span>
                  Société: <p>Groupe Puma</p>
                </span>
              </div>
              <div>
                <span>
                  Etat de commande:<p>{commande?.state}</p>
                </span>
              </div>
              <div>
                <span>
                  Date de création:<p>{commande?.create_date}</p>
                </span>
              </div>
              <div>
                <span>
                  Date de validité:
                  {commande?.date_validite ? (
                    <p>{commande.date_validite}</p>
                  ) : (
                    <p>/</p>
                  )}
                </span>
              </div>
            </div>
            <div className="cmd-inputs">
              <label htmlFor="chauffeur">Chauffeur</label>
              <input
                type="text"
                name="chauffeur"
                value={chauffeur}
                placeholder="Nom du Chauffeur"
                onChange={(e) => {
                  setChauffeur(e.target.value);
                }}
                readOnly={disabled}
              />
              <label htmlFor="chauffeur">Transporteur</label>
              <input
                type="text"
                name="Transporteur"
                value={Transporteur}
                placeholder="Nom du Transporteur"
                onChange={(e) => {
                  setTransporteur(e.target.value);
                }}
                readOnly={disabled}
              />
            </div>
          </Col>
          <Col xs={12} md={6} xl={6}>
            <div
              className="user-data"
              onClick={() => {
                handleClick(commande?.user_partner.id);
              }}
            >
              <div>
                <span>
                  Nom: <p>{commande?.user_partner.name}</p>
                </span>
              </div>
              <div>
                <span>
                  Adresse email:<p>{commande?.user_partner.email}</p>
                </span>
              </div>
              <div>
                <span>
                  Numéro de téléphone:<p>{commande?.user_partner.phone}</p>
                </span>
              </div>
              <div>
                <span>
                  Adresse de livraison:
                  {commande?.adresse ? <p>{commande.adresse}</p> : <p>/</p>}
                </span>
              </div>
            </div>

            <div className="cmd-check">
              {/* <label htmlFor="scamp">% Régime fiscal </label>
              <input
                type="text"
                placeholder="% Régime fiscal"
                name="scamp"
                value={scamp}
                onChange={(e) => setScamp(e.target.value)}
                readOnly={disabled}
              /> */}
              {/* <div>
                {" "}
                <input
                  type="checkbox"
                  id="shipped"
                  checked={checkboxValues.shipped}
                  onChange={handleChange}
                  name="shipped"
                />
                <p>Livré</p>
              </div> */}
              <label htmlFor="ImVehicule">Matricule</label>
              <input
                type="text"
                name="ImVehicule"
                value={ImVehicule}
                placeholder="Immatriculation Véhicule"
                onChange={(e) => {
                  setImVehicule(e.target.value);
                }}
                readOnly={disabled}
              />
              <label htmlFor="ImRemorque">Matricule Remorque</label>
              <input
                type="text"
                name="ImRemorque"
                value={ImRemorque}
                placeholder="Immatriculation Remorque"
                onChange={(e) => {
                  setImRemorque(e.target.value);
                }}
                readOnly={disabled}
              />
              {/* <div>
                {" "}
                <input
                  type="checkbox"
                  id="is_contract"
                  checked={checkboxValues.is_contract}
                  onChange={handleChange}
                  name="is_contract"
                  disabled={disabled}
                />
                <p>Contrat</p>
              </div>
              <div>
                {" "}
                <input
                  type="checkbox"
                  id="is_convention"
                  checked={checkboxValues.is_convention}
                  onChange={handleChange}
                  name="is_convention"
                  disabled={disabled}
                />
                <p>Convention</p>
              </div>
              <div>
                {disabled ? (
                  <>
                    <input
                      type="checkbox"
                      id="shipped"
                      checked={checkboxValues.shipped}
                      onChange={handleChange}
                      name="shipped"
                    />
                    <p>Livré</p>
                  </>
                ) : null}
              </div> */}
            </div>
          </Col>
        </Row>

        <Row>
          <span id="heading">La liste des articles achetés : </span>
          <Box
            m="10px 0 0 0"
            height="40vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
              },
              "& .MuiDataGrid-cell": {
                borderBottom: "none",
              },
              "& .name-column--cell": {
                color: colors.greenAccent[300],
              },
              "& .MuiDataGrid-columnHeaders": {
                backgroundColor: colors.blueAccent[700],
                borderBottom: "none",
              },
              "& .MuiDataGrid-virtualScroller": {
                backgroundColor: colors.primary[400],
              },
              "& .MuiDataGrid-footerContainer": {
                borderTop: "none",
                backgroundColor: colors.blueAccent[700],
              },
              "& .MuiCheckbox-root": {
                color: `${colors.greenAccent[200]} !important`,
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${colors.grey[100]} !important`,
              },
            }}
          >
            <DataGrid
              rows={cmd}
              columns={columns}
              components={{ Toolbar: GridToolbar }}
              getRowId={(row) => row.id}
              getRowClassName={(params) => "clickable-row"}
              onRowClick={(params) =>
                handleRowClick(params.row.product_id.tmpl_id)
              }
            />
          </Box>
        </Row>
        <Row>
          <Col xs={8} md={8} xl={8}></Col>
          <Col xs={2} md={2} xl={2}>
            <div className="cmd-total">
              <span>Montant hors-taxe : </span>
              {/* <br /> <span> Remise : </span> */}
              <br /> <span>Taxe : </span>
              <br />
              {/* <span>Montant du timbre : </span><br /> */}
              <span style={{ float: "right" }} id="total">
                Total :{" "}
              </span>
            </div>
          </Col>
          <Col xs={2} md={2} xl={2}>
            <div className="cmd-total-price">
              <div className="cmd-first">
                <span> {commande?.amount_untaxed} DZ</span>
                <br />
                {/* <span> 0.00 DZ</span>
                <br /> */}
                <span> {commande?.amount_tax} DZ</span>
                <br />
                {/* <span> {commande?.fiscal_stamp_amount} DZ</span>
                <br /> */}
              </div>
              <span> {commande?.amount_total} DZ</span>
            </div>
          </Col>
        </Row>
        <Row>
          {update ? (
            <>
              {!canceled ? (
                <>
                  {disabled ? (
                    <div className="cmd-btn">
                      <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, "shipped")}
                        disabled={disable}
                        className={disable ? "disabled-button" : "btn-conf"}
                      >
                        Livrer
                      </button>
                    </div>
                  ) : (
                    <div className="cmd-btn">
                      <button
                        type="submit"
                        onClick={(e) => handleSubmit(e, "confirm")}
                        disabled={disable}
                        className={disable ? "disabled-button" : "btn-conf"}
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </>
              ) : null}
            </>
          ) : (
            <div className="cmd-btn">
              <button
                onClick={() => {
                  setModel(!model);
                  handleRefuse();
                }}
                disabled={disable}
                className={disable ? "disabled-button" : "btn-ref"}
              >
                Annuler
              </button>
              <button
                type="submit"
                onClick={(e) => handleSubmit(e, "confirm")}
                disabled={disable}
                className={disable ? "disabled-button" : "btn-conf"}
              >
                Confirmer
              </button>
            </div>
          )}
        </Row>
      </Container>
      {model && (
        <div className="modal-refus">
          <div className="overlay"></div>
          <div className="modal-content">
            {" "}
            <h1>Envoie de Mail</h1>
            <textarea
              placeholder="Veuillez entrer le motif de refus de cette commande afin d'informer le client par mail"
              rows="10"
              cols="90"
              name="motif"
              onChange={(e) => setMotif(e.target.value)}
            />
            <div className="modal-btn">
              <button
                type="submit"
                className="btn-cont"
                style={{ backgroundColor: "#db4f4a" }}
                onClick={() => setModel(!model)}
              >
                FERMER
              </button>
              <button type="submit" className="btn-cont" onClick={handleCancel}>
                CONTINUER
              </button>
            </div>
          </div>
        </div>
      )}
      {/* {model && (
        <div className="modal-refus">
          <div className="overlay"></div>
          <div className="modal-content">
            {" "}
            <h1>Envoie de Mail</h1>
            <textarea
              placeholder="Veuillez entrer le motif de refus de cette commande afin d'informer le client par mail"
              rows="10"
              cols="90"
              name="motif"
              onChange={(e) => setMotif(e.target.value)}
            />
            <div className="modal-btn">
              <button
                type="submit"
                className="btn-cont"
                style={{ backgroundColor: "#db4f4a" }}
                onClick={() => setModel(!model)}
              >
                FERMER
              </button>
              <button
                type="submit"
                className="btn-cont"
                onClick={handleCancel}
              >
                CONTINUER
              </button>
            </div>
          </div>
        </div>
      )} */}
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
        theme="colored"
      />
    </div>
  );
};

export default CommandeDetails;
