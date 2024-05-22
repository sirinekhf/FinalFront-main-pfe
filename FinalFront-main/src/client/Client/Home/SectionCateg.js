import React from "react";
import { Row, Container, Col } from "react-bootstrap";
import "./SectionCateg.css";
import { categories } from "./data";
import { useNavigate } from "react-router-dom";
const SectionCateg = ({ min, max }) => {
  const navigate = useNavigate();
  return (
    <Container>
      <div className="categ-section">
        <Row>
          {categories.slice(min, max).map((item, index) => {
            return (
              <Col
                xs={4}
                md={4}
                xl={4}
                className="image-categ"
                id="div1"
                key={index}
              >
                <div
                  className="image-overlay"
                  onClick={() => navigate(`/categorie/${item.id}/${item.name}`)}
                >
                  <h1>{item.name}</h1>
                  <img src={item.image} alt="Image"></img>
                </div>
              </Col>
            );
          })}

          {/*          
          <Col xs={4} md={4} xl={4} className="image-categ" id="div1">
            <div className="image-overlay">
              <h1>PEINTURE</h1>
              <img
                src={require("../../Assets/images/peintures.jpg")}
                alt="Image"
              ></img>
            </div>
          </Col>
          <Col xs={4} md={4} xl={4} className="image-categ" id="div1">
            <div className="image-overlay">
              <h1>MORTIERS</h1>
              <img
                src={require("../../Assets/images/mortier.jpg")}
                alt="Image"
              ></img>
            </div>
          </Col> */}
        </Row>
      </div>
    </Container>
  );
};

export default SectionCateg;
