import React, { useContext, useEffect, useState } from "react";
import "./style.css";
import { Link, useNavigate } from "react-router-dom";
import { CartXFill, Dash, Plus, X } from "react-bootstrap-icons";
import { Container, Row, Col } from "react-bootstrap";
import PopUp from "../../Components/PopUp";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthContext";

const Cart = ({
  CartItem,
  setCartItem,
  addToCart,
  decreaseQty,
  removeItem,
}) => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [value, setValue] = useState(1);
  const [settings, setSettings] = useState();
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/getsettings/")
      .then((response) => {
        setSettings(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // const handleIncrement = (item) => {
  //   setValue(value + 1);
  //   addToCart(item);
  // };
  // const handleDecrement = (item) => {
  //   setValue(value - 1);
  //   decreaseQty(item);
  // };
  const handleInputChange = (product, event) => {
    let newQuantity = event.target.value;
    // if (isNaN(newQuantity) || newQuantity < 1) {
    //   newQuantity = 1;
    // }
    setValue(newQuantity);
    decreaseQty(product, newQuantity);
  };

  useEffect(() => {
    window.scroll(0, 0);
  }, []);
  const [modalOpen, setModalOpen] = useState(false);
  let totalPrice = 0;
  let productQty = 0;
  const handleRemove = (item) => {
    const confirmed = window.confirm(
      "Voulez-vous vraiment supprimer cet article du panier?"
    );
    if (confirmed) {
      removeItem(item);
    }
  };

  const handleDeleteAll = (item) => {
    const confirmed = window.confirm("Voulez-vous vraiment vider le panier?");
    if (confirmed) {
      setCartItem([]);
    }
  };
  const [model, setModel] = useState(false);
  useEffect(() => {
    if (model) {
      document.body.classList.add("active-modal");
    } else {
      document.body.classList.remove("active-modal");
    }
  }, [model]);
  return (
    <>
      <section
        className="cart-items"
        style={{ paddingTop: CartItem.length === 0 ? "5%" : "12%" }}
      >
        <div className="cart">
          {CartItem.length === 0 ? (
            <div className="no-items">
              <CartXFill />
              <h1>Votre Panier est vide !</h1>
              <p>Parcourez nos produits et services et commencer vos achats</p>
              <Link to="/">
                <button className="btn-start">Commencez vos achats</button>
              </Link>
            </div>
          ) : (
            <>
              <Container>
                <Row>
                  <Col xs={12} md={9} xl={9}>
                    {CartItem.map((item) => {
                      let prix_unit = item[0].prod_price;
                      let prix_cond = item[0].qty_cond;

                      if (item[0].accept_variant) {
                        if (
                          item[0].variants &&
                          item[0].variants.length == 1 &&
                          item[0].variants.some(
                            (variante) => variante.attribute !== null
                          )
                        ) {
                          prix_unit = item[0].variants[0].prod_price;
                        }
                      }

                      {
                        /* totalPrice =
                            totalPrice +
                            item[0].variants[0].prod_price * item[1];
                        } else {
                          totalPrice =
                            totalPrice + prix_unit * item[1] * prix_cond;
                        }
                      } else {
                        totalPrice =
                          totalPrice + prix_unit * item[1] * prix_cond;
                      } */
                      }

                      totalPrice = totalPrice + prix_unit * item[1] * prix_cond;

                      productQty = prix_unit * item[1] * prix_cond;

                      return (
                        <div className="cart-list" key={item[0].id}>
                          {/* <div className="img">
                            <img
                              src={require(`../../Assets/images/products/${item[0].id}.png`)}
                              alt=""
                            />
                          </div> */}
                          <div className="cart-details">
                            <h3>{item[0].name}</h3>
                            <h5>
                              <span>Conditionnement:</span>{" "}
                              {item[0].ul_name
                                ? item[0].ul_name
                                : item[0].variantes_choice
                                ? item[0].variantes_choice.map((item) => {
                                    return <>{item.value} </>;
                                  })
                                : item[0].attribute_value}
                            </h5>
                            <h4>
                              {prix_unit} DZ *{prix_cond} * {item[1]}
                              <span>{productQty} DZ</span>
                            </h4>
                          </div>
                          <div>
                            <div className="removeCart">
                              <button
                                className="removeCart"
                                onClick={() => handleRemove(item[0])}
                              >
                                <X />
                              </button>
                            </div>

                            <div className="cartControl">
                              Quantité:
                              <input
                                type="number"
                                className="Qte"
                                value={item[1]}
                                min={1}
                                onChange={(event) =>
                                  handleInputChange(item[0], event)
                                }
                              />
                              {/* <button
                                className="incCart"
                                onClick={() => addToCart(item[0])}
                                // onClick={handleIncrement}
                              >
                                <Plus />
                              </button>

                              <button
                                className="desCart"
                                onClick={() => decreaseQty(item[0])}
                                // onClick={handleDecrement}
                              >
                                <Dash />
                              </button> */}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Col>
                  <Col xs={12} md={9} xl={3}>
                    <div className="column-content">
                      <div className="fixed-div">
                        <div className="cart-total">
                          <h2>RÉSUMÉ DU PANIER</h2>
                          <div className="total-price">
                            <h4>Hors taxes: </h4>
                            <h5>{totalPrice} DZ</h5>
                          </div>
                          <div className="total-price">
                            <h4>Taxes: </h4>
                            <h5>{settings?.tva} %</h5>
                          </div>
                          <div className="total-price">
                            <h4>Prix Total: </h4>
                            <h3>
                              {totalPrice + totalPrice * 0.09}
                              DZ
                            </h3>
                          </div>
                          <button
                            className="add-btn"
                            onClick={() => {
                              setModel(true);
                            }}
                          >
                            Valider le panier
                          </button>
                        </div>
                        <button
                          className="remove-btn"
                          onClick={handleDeleteAll}
                        >
                          Vider le panier
                        </button>
                      </div>
                    </div>
                  </Col>
                  {/* {modalOpen && (
                    <PopUp setOpenModal={setModalOpen} total={totalPrice} />
                  )} */}
                </Row>
              </Container>
            </>
          )}
        </div>
      </section>
      {model && (
        <PopUp
          model={model}
          setModel={setModel}
          CartItem={CartItem}
          setCartItem={setCartItem}
        />
      )}
    </>
  );
};

export default Cart;
