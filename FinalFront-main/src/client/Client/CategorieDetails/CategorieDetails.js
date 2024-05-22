import React from "react";
import { useParams } from "react-router-dom";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import PriceFilter from "../Home/PriceFilter";
import axios from "axios";
import { useState } from "react";
import { useEffect } from "react";
import ShopCart from "../Home/ShopCart";
const CategorieDetails = () => {
  const { id, name } = useParams();
  const [products, setProducts] = useState([]);
  const [initial, setInitial] = useState([]);
  const [changeIntialState, setChange] = useState(false);
  useEffect(() => {
    axios
      .get(`http://localhost:8000/products/getproductsByCategory/${id}`)
      .then((response) => {
        setProducts(response.data);
        setInitial(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const handleClear = () => {
    setProducts(initial);
    setChange(true);
  };
  return (
    <section className="categ-details shop">
      <Container>
        <Row>
          <Col xs={12} md={3} xl={3}>
            <div className="category">
              <div className="chead">
                <h3>Filtrer Par</h3>
                <h1>Prix Unitaire </h1>
              </div>
              <PriceFilter
                changeToInitial={changeIntialState}
                setProducts={setProducts}
                setChange={setChange}
                categ={id}
              />
              <button
                className="btn-clear"
                onClick={() => {
                  handleClear();
                }}
              >
                Effacer les filtres
              </button>
            </div>
          </Col>

          <Col xs={12} md={9} xl={9}>
            <h2>{name}</h2>
            <div className="grid1">
              <ShopCart shopItems={products} className="shopCart" />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CategorieDetails;
