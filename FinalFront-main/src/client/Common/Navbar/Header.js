import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BoxArrowUpRight } from "react-bootstrap-icons";

const Header = () => {
  return (
    <div className="header">
      <Container>
        <Row>
          <Col xs={7} md={9} xl={9}>
            <a href="https://www.groupe-hasnaoui.com/" target="_blank">
              <BoxArrowUpRight /> Visiter le site Groupe des sociétes HASNAOUI
            </a>{" "}
          </Col>
          <Col xs={5} md={3} xl={3}>
            {" "}
            <img src={require("../../Assets/images/ar.png")} className="flag" />
            <a href="#">العربية </a>
            <img src={require("../../Assets/images/fr.png")} className="flag" />
            <a href="#"> Français</a>
            <img
              src={require("../../Assets/images/eng.png")}
              className="flag"
            />
            <a href="#"> English</a>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Header;
