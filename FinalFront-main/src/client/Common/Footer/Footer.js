import React from "react";
import "./Style.css";
import { Col, Container, Row } from "react-bootstrap";
import { Youtube, Instagram, Facebook, Linkedin } from "react-bootstrap-icons";
const Footer = () => {
  return (
    <footer>
      <Container>
        <Row>
          <Col xs={12} md={4} xl={4}>
            <img src={require("../../Assets/images/logoBlanc.PNG")} />
          </Col>
          <Col xs={12} md={4} xl={4}>
            <h2>Groupe des sociétés Hasnaoui</h2>
            <ul>
              <a href="#">
                <li>Centre d'assistance</li>
              </a>
              <a href="#">
                <li>Qui sommes nous</li>
              </a>
              <a href="#">
                <li>Conditions Générales d'Utilisation</li>
              </a>
              <a href="#">
                <li>Politique de retour et remboursement</li>
              </a>
            </ul>
          </Col>
          <Col xs={12} md={4} xl={4}>
            <h2>Nous sommes sociables !</h2>
            <div className="social-icons">
              <Facebook />
              <Instagram />
              <Linkedin />
              <Youtube />
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
