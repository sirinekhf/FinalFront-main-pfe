import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { ArrowDownCircle } from "react-bootstrap-icons";
import "animate.css";
import TrackVisibility from "react-on-screen";
import "./style.css";
import { motion } from "framer-motion";
import axios from "axios";
import CategoriePage from "./CategoriePage";
import SectionCateg from "./SectionCateg";
import Slider from "../../Components/Slider";
import SliderDispo from "../../Components/SliderDispo";

const Home = () => {
  const [loopNum, setLoopNum] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [text, setText] = useState("");
  const [delta, setDelta] = useState(300 - Math.random() * 100);
  const [produits, setProduits] = useState();
  const [isloading, setIsLoading] = useState(false);
  const [isloading2, setIsLoading2] = useState(false);
  const fullText = "Groupe Hasnaoui";
  const period = 2000;

  const variants = {
    animate: {
      rotate: [0, 5], // Specify the keyframe values for the rotation
      transition: {
        duration: 3,
        repeat: Infinity, // Repeat the animation infinitely
        repeatType: "reverse", // Reverse the animation after each repeat
      },
    },
  };

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let updatedText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updatedText);
    if (isDeleting) {
      setDelta((prev) => prev / 2);
    }
    if (!isDeleting && updatedText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updatedText === "") {
      setIsDeleting(false);
      setLoopNum(loopNum + 1);
      setDelta(500);
    }
  };

  const [products, setProducts] = useState([]);
  const [disponible, setDisponible] = useState([]);
  useEffect(() => {
    setIsLoading(true);
    axios
      .get("http://localhost:8000/products/getproducts")
      .then((response) => {
        const filteredProducts = response.data.filter(
          (product) => !product.list_price.startsWith("0")
        );
        setProducts(filteredProducts);
        if (filteredProducts.length > 0) setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get("http://localhost:8000/products/getdisponible")
      .then((response) => {
        setDisponible(response.data);
        if (disponible?.length > 0) setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  useEffect(() => {
    setIsLoading2(true);
    axios
      .get("http://localhost:8000/orders/getbestseller/")
      .then((response) => {
        setProduits(response.data);
        if (response.data.length > 0) setIsLoading2(false);
      })
      .catch((error) => {
        console.log(error);
      });
    axios
      .get(`http://localhost:8000/ML/ipAddress`)
      .catch((error) => console.log(error));
  }, []);

  return (
    <>
      <section className="homePage">
        <Container>
          <Row className="align-items-center">
            <Col xs={12} md={6} xl={7}>
              <TrackVisibility>
                {({ isVisible }) => (
                  <div
                    className={
                      isVisible ? "animate__animated animate__fadeIn" : ""
                    }
                  >
                    {/* <span className="tagline">Welcome to my portfolio</span> */}
                    <h1>
                      <span className="wrap">{text}</span>
                      <br />
                      {`Nous Construisons le bien-être`}
                    </h1>
                    <p>
                      Découvrez notre vaste sélection d'offres et appréciez la
                      qualité et l'expertise qui font de nous un acteur de
                      confiance sur le marché algérien. Bienvenue dans le monde
                      où la satisfaction de la clientèle est notre priorité.
                    </p>
                    <button>
                      <a href="#main">Consulter</a>
                      <ArrowDownCircle style={{ marginLeft: "15px" }} />
                    </button>
                  </div>
                )}
              </TrackVisibility>
            </Col>
            <Col xs={12} md={6} xl={5}>
              <div className="w-right">
                <motion.div
                  initial={{ rotate: 45 }}
                  animate="animate" // Use the custom animation variant
                  variants={variants}
                  className="w-mainCircle"
                >
                  <div className="w-secCircle"></div>
                  <div className="w-secCircle"></div>
                  <div className="w-secCircle">
                    <img src={require("../../Assets/images/puma.png")} alt="" />
                  </div>{" "}
                  <div className="w-secCircle"></div>
                  <div className="w-secCircle"></div>
                </motion.div>
                {/* background Circles */}
                <div className="w-backCircle blueCircle"></div>
                <div className="w-backCircle yellowCircle"></div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
      <div id="main">
        <SectionCateg min={0} max={3} />
        <Slider
          title={"Les plus vendus"}
          products={produits}
          loading={isloading2}
        />
        <CategoriePage shopItems={products.slice(0, 19)} />
        <SectionCateg min={3} max={6} />
        <SliderDispo
          title={"Stock limité "}
          products={disponible}
          loading={isloading}
        />
      </div>
    </>
  );
};

export default Home;
