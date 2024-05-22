import React, { useState, useEffect } from "react";
import ShopCart from "./ShopCart";
import "./style.css";
import { Col, Container, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import axios from "axios";
import SearchFilter from "./SearchFilter";
import SearchResults from "./SearchResults";
import PriceFilter from "./PriceFilter";

const CategoriePage = ({ addToCart, shopItems }) => {
  const [products, setProducts] = useState(shopItems);
  const [isFilterSearch, setIsFilterSearch] = useState(false);
  const [isFilterPrice, setIsFilterPrice] = useState(false);
  const [Empty, setEmpty] = useState(false);
  const [results, setResults] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage, setPostsPerPage] = useState(8);
  const indexOfLastItem = currentPage * postsPerPage;
  const indexOfFirstItem = indexOfLastItem - postsPerPage;
  const currentPosts = isFilterPrice || isFilterSearch ? products : shopItems;
  const paginatedPosts = currentPosts.slice(indexOfFirstItem, indexOfLastItem);
  const [changeIntialState, setChange] = useState(false);
  const [itemsVide, setNoItems] = useState(false);
  const [initialResults, setInitialResults] = useState("");
  const [categ, setCateg] = useState();
  const [input, setInput] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/getCategory")
      .then((response) => {
        setResults(response.data);
        setInitialResults(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const handleClear = () => {
    setIsFilterPrice(false);
    setIsFilterSearch(false);
    setProducts(shopItems);
    setChange(true);
    setInput("");
    setResults(initialResults);
    setCateg();
    setCurrentPage(1);
  };
  return (
    <section className="shop">
      <Container>
        <Row>
          <Col xs={12} md={3} xl={3}>
            <div className="category">
              <div className="chead">
                <h3>Filtrer Par</h3>
                <h1>Categories </h1>
              </div>
              <div className="filtre-recherche">
                <SearchFilter
                  setResults={setResults}
                  input={input}
                  setInput={setInput}
                />
                <SearchResults
                  results={results}
                  setProducts={setProducts}
                  setIsFilterSearch={setIsFilterSearch}
                  setCateg={setCateg}
                  setChange={setChange}
                  setInput={setInput}
                  setCurrentPage={setCurrentPage}
                />
              </div>
              <div className="chead">
                <h1>Prix Unitaire </h1>
              </div>
              <PriceFilter
                changeToInitial={changeIntialState}
                setProducts={setProducts}
                setChange={setChange}
                categ={categ}
                setIsFilterPrice={setIsFilterPrice}
                setEmpty={setEmpty}
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
            <h2>Nos Produits</h2>
            <div className="grid1">
              <ShopCart
                shopItems={paginatedPosts}
                Empty={Empty}
                className="shopCart"
              />
              <Pagination
                totalPosts={
                  isFilterPrice || isFilterSearch
                    ? products.length
                    : shopItems.length
                }
                postsPerPage={postsPerPage}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
              />
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};
export default CategoriePage;
