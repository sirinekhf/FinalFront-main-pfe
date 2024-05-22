import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import { Row, Col, Container } from "react-bootstrap";
import { mockDataContacts } from "../../data/mockData";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { useParams } from "react-router-dom";

/**for the Tabs */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const ProductDetails = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "registrarId", headerName: "Registrar ID", flex: 0.5 },
    {
      field: "name",
      headerName: "Name",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "website",
      headerName: "website",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Phone Number",
      flex: 1,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "address",
      headerName: "Address",
      flex: 1,
    },
    {
      field: "city",
      headerName: "City",
      flex: 1,
    },
    {
      field: "zipCode",
      headerName: "ZipCode",
      flex: 1,
    },
  ];

  /**for the Tabs */
  const [value, setValue] = React.useState(0);
  const [product, setProduct] = useState("");
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [image, setImage] = useState("slider1");
  const { id } = useParams();
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/getproduct/${id}`)
      .then((response) => {
        setProduct(response.data);
        console.log(response.data);
        setImage(response.data.id);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div class="p-details">
      <div class="title">Détail d'un produit</div>
      <Container>
        <Row>
          <Col xs={3} md={4} xl={4}>
            <img
              src={require(`../../../client/Assets/images/products/${image}.png`)}
              alt="product image"
            />
          </Col>
          <Col xs={9} md={8} xl={8}>
            <div className="top-section">
              <p className="company">{product?.company_name}</p>
              <h6> {product?.name} </h6>
              <span> Référence : {product?.template_code}</span>
              <p>{product?.description_sale}</p>
              <p>{product?.description}</p>
            </div>
          </Col>
        </Row>
      </Container>
      {/* 
              <div className="categ">
                <p> Categorie:</p>
                <p>{product?.category}</p>
              </div>
              
              
              <div className="categ">
                <p>Conditionnement:</p>
                <p>{product?.ul_name}</p>
              </div>
              <div className="categ">
                <p>Unité de mesure :</p>
                <p>{product?.uom_name}</p>
              </div> */}
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ padding: "0 8%" }}
          value={value}
          onChange={handleChange}
          // indicatorColor="#4cceac"
          // textColor={colors.greenAccent[500]}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Informations " {...a11yProps(0)} />

          <Tab label="Inventaire" {...a11yProps(1)} />
          <Tab label="Ventes" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <div class="infos">
          <div class="row">
            <div class="col-6">
              <span id="heading">Conditionnement : </span>
              <span className="detail">{product?.ul_name}</span>
              <br />
              <span id="heading">Catégorie : </span>
              <span className="detail">{product?.category}</span>
              <br />
              <span id="heading">Unité de mesure : </span>
              <span className="detail">{product?.uom_name}</span>
              <br />
              <span id="heading">Type d'article : </span>
              <span className="detail">{product?.type}</span>
              <br />
              <span id="heading">Prix de vente: </span>
              <span className="detail">{product?.list_price} DZ</span>
              <br />
              <span id="heading">Code bar : </span>
              <span className="detail">{product?.ean13} </span>
              <br />
              <span id="heading">Code Wavesoft : </span>
              <span className="detail">{product?.code_wavesoft} </span>
              <br />
            </div>
            <div class="col-6 ">
              <span id="heading">Actif ? </span>
              <span className="detail">{product?.active ? "Oui" : "Non"}</span>
              <br />
              <span id="heading">Accepte les article associés? </span>
              <span className="detail">
                {product?.accept_supplements ? "Oui" : "Non"}
              </span>
              <br />
              <span id="heading">Accepte les variantes ? </span>
              <span className="detail">
                {product?.accept_variant ? "Oui" : "Non"}
              </span>
              <br />
              <span id="heading">Est un kit ? </span>
              <span className="detail">{product?.is_kit ? "Oui" : "Non"}</span>
              <br />
              <span id="heading">Fait partie d'un kit ? </span>
              <span className="detail">
                {product?.is_kit_details ? "Oui" : "Non"}
              </span>
              <br />
              <span id="heading">Système multi-sociétés ?</span>
              <span className="detail">
                {product?.is_system ? "Oui" : "Non"}
              </span>
              <br />

              <br />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={1}>
        <div class="infos">
          <div class="row">
            <div class="col-6">
              <span id="heading">Quantité en stock : </span>
              <span className="detail"> / </span>
              <br />
              <span id="heading">Récéption : </span>
              <span className="detail"> / </span>
              <br />
              <span id="heading">Qauntité prévue : </span>
              <span className="detail"> / </span>
              <br />
              <span id="heading">Méthode d'enlevement : </span>
              <span className="detail">{product?.stock_method}</span>
              <br />
              <span id="heading">Utilise un numero de série unique ?</span>
              <span className="detail">
                {product?.use_serial_number ? "  Oui" : "  Non"}
              </span>
              <br />
            </div>
            <div class="col-6 ">
              <span id="heading">Gestion des dimensions des lots: </span>
              <span className="detail">
                {product?.manage_by_surface_or_volume}
              </span>
              <br />
              <span id="heading">Traçabilité complète des lots: </span>
              <span className="detail">{product?.track_all}</span>
              <br />

              <span id="heading">Suivre les lots reçus: </span>
              <span className="detail">{product?.track_incoming}</span>
              <br />
              <span id="heading">Suivre les lots sortant: </span>
              <span className="detail">{product?.track_outgoing}</span>
              <br />
              <span id="heading">Suivre les lots production: </span>
              <span className="detail">{product?.track_production}</span>
              <br />
            </div>
          </div>
        </div>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <div class="infos">
          <span id="heading">Garantie : </span>
          <span className="detail">{product?.warranty}</span>
          <br />
          <span id="heading">Délai de livraison au client : </span>
          <span className="detail">{product?.sale_delay} jours</span>
          <br />
          <span id="heading">Délai de fabrication : </span>
          <span className="detail">{product?.produce_delay} jours</span>
          <br />
        </div>
      </TabPanel>
    </div>
  );
};

export default ProductDetails;
