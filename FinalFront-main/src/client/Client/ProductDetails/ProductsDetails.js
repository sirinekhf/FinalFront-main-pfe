import React, { useEffect, useState } from "react";
import axios from "axios";
import "./style.css";
import { useParams } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { CartPlus } from "react-bootstrap-icons";
import Slider from "../../Components/Slider";
import { useContext } from "react";
import { AuthContext } from "../../../Context/AuthContext";
import Model from "./Model";
import LoadingSpinner from "../../Components/Loadingspinner";

const ProductsDetails = ({ addToCart }) => {
  const { productId } = useParams();
  const { user } = useContext(AuthContext);
  const [model, setModel] = useState(false);
  const [product, setProduct] = useState([]);
  const [present, setPresent] = useState(true);
  const [image, setImage] = useState("slider1");
  const [variantes, setVariantes] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [combinedVariants, setCombinedVariants] = useState([]);
  const [products, setProducts] = useState([]);
  const [frequent, setFrequent] = useState([]);
  const [bool, setBool] = useState(false);
  if (model) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:8000/products/getproduct/${productId}`)
      .then((response) => {
        setProduct(response.data);
        setImage(response.data.id);
        response.data.accept_variant
          ? setVariantes(response.data.variants)
          : setVariantes([]);
        setIsLoading(false);

        if (user) {
          if (user.type === "comercial" || user.type === "admin")
            setPresent(false);
        }
      })
      .catch((error) => {
        console.log("Erreur Axios:", error);
      });
  }, [productId]);

  useEffect(() => {
    product?.categ_id &&
      axios
        .get(
          `http://localhost:8000/products/getproductsByCategory/${product?.categ_id}`
        )
        .then((response) => {
          const filteredProducts = response.data.filter(
            (product) => !product.list_price.startsWith("0")
          );
          setProducts(filteredProducts);
        })
        .catch((error) => {
          console.log(error);
        });
  }, [productId, product?.categ_id]);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/ML/frequent-itemsets/${productId}`)
      .then((response) => {
        setFrequent(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [productId]);
  useEffect(() => {
    setBool(false);
    for (let val of variantes) {
      if (val.attribute === "Poids") {
        setBool(true);
      }
    }
  }, [variantes]);

  const handleAddtoPanier = () => {
    setModel(!model);
  };

  /*-------- Grouping variantes by prod_id ------------- */
  const variantsByProdId = {};
  variantes.forEach((variant) => {
    const { prod_id } = variant;
    if (variantsByProdId.hasOwnProperty(prod_id)) {
      variantsByProdId[prod_id].push(variant);
    } else {
      variantsByProdId[prod_id] = [variant];
    }
  });
  const groupedVariants = Object.values(variantsByProdId);

  return (
    <section className="page-details">
      <Container>
        <Row>
          <Col xs={12} md={12} xl={12}>
            {isLoading ? (
              <LoadingSpinner />
            ) : (
              <>
                <div className="productDetails">
                  <div className="product-cover">
                    <img
                      src={require(`../../Assets/images/products/${image}.png`)}
                      alt={product.name}
                    />
                  </div>
                  <div className="second-part">
                    <div className="details">
                      <div className="">
                        <p>GRUPO PUMA</p>
                        <h3>{product.name}</h3>
                        {!bool && (
                          <span> Conditionnement : {product.ul_name}</span>
                        )}
                        <br />

                        {groupedVariants?.length > 0
                          ? groupedVariants.map((item, index) => {
                              return item.length === 1 ? (
                                <div key={index}>
                                  {item[0].attribute ? (
                                    <>
                                      <span>
                                        {" "}
                                        {item[0].attribute} :{" "}
                                        {item[0].attribute_value}
                                      </span>
                                      <br />
                                    </>
                                  ) : null}
                                </div>
                              ) : (
                                <div key={index}>
                                  {item.map((variant, subIndex) => (
                                    <span key={subIndex}>
                                      {variant.attribute}:{" "}
                                      {variant.attribute_value},{" "}
                                    </span>
                                  ))}
                                  <br />
                                </div>
                              );
                            })
                          : null}

                        <br />
                        <span>{product.description}</span>
                      </div>
                    </div>
                    <div className="price">
                      {!product.accept_variant ? (
                        <p>
                          {Number(product.prod_price * product.qty_cond)} DA
                        </p>
                      ) : (
                        <>
                          {variantes &&
                          variantes.length == 1 &&
                          variantes.some(
                            (variante) => variante.attribute !== null
                          ) ? (
                            <p>
                              <p>
                                {Number(
                                  product.variants[0].prod_price *
                                    product.qty_cond
                                )}{" "}
                                DA{" "}
                              </p>
                            </p>
                          ) : (
                            <p>le prix varie selon les variantes</p>
                          )}
                        </>
                      )}
                      {present ? (
                        <>
                          {variantes &&
                          variantes.length > 1 &&
                          variantes.some(
                            (variante) => variante.attribute !== null
                          ) ? (
                            <button
                              onClick={() => handleAddtoPanier()}
                              className="add-btn"
                            >
                              <CartPlus />
                              AJOUTER AU PANIER
                            </button>
                          ) : (
                            <button
                              onClick={() => addToCart(product)}
                              className="add-btn"
                            >
                              <CartPlus />
                              AJOUTER AU PANIER
                            </button>
                          )}
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
                <div className="ficheTech">
                  <h4>Détails</h4>
                  <div className="container row ">
                    <Col xs={12} md={6} xl={6}>
                      <div className="details-tab">
                        <h3>Principales caractéristiques</h3>
                        <div className="d-flex align-items-center justify-content-start ">
                          <span>Categorie interne:</span>
                          <p>{product.category}</p>
                        </div>
                        {/* <div className="d-flex align-items-center justify-content-start ">
                      <span>Unité de mesure : </span> <p> {product.unite}</p>
                    </div>*/}
                        {/* <div className="d-flex align-items-center justify-content-start ">
                          <span>Prix de vente : </span>
                          <p>{Number(product.list_price).toFixed(2)} DZ</p>
                        </div> */}
                        <div className="d-flex align-items-center justify-content-start ">
                          <span>Taxes à la vente : </span>
                          <p>TVA sur vente à 9%</p>
                        </div>
                      </div>
                    </Col>
                    <Col xs={12} md={6} xl={6}>
                      <div className="details-tab">
                        <h3>Descriptif thechnique</h3>
                        <div className="d-flex align-items-center justify-content-start ">
                          <span>Réference interne: </span>
                          <p>{product.template_code}</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start ">
                          <span>Code bar EAN13:</span>
                          {/* <p>{product.ean13}</p> */}
                          <p>/</p>
                        </div>
                        <div className="d-flex align-items-center justify-content-start ">
                          {/* <span>Code wavesoft: </span> */}
                          {/* <p>{product.code_wavesoft}</p>  */}
                          {/* <p>/</p> */}
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </>
            )}
          </Col>
        </Row>
        <Row>
          {frequent?.length > 0 ? (
            <Slider
              title={
                "Les clients ayant acheté cet article ont également acheté"
              }
              products={frequent}
              loading={isLoading}
            />
          ) : null}

          <Slider
            title={"De la même catégorie"}
            products={products}
            loading={isLoading}
          />
        </Row>
      </Container>
      {model && (
        <Model
          variantes={groupedVariants}
          model={model}
          setModel={setModel}
          addToCart={addToCart}
        />
      )}
    </section>
  );
};
export default ProductsDetails;
