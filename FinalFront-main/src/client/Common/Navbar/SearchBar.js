import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
const SearchBar = ({ setResults, input, setInput }) => {
  const fetchData = (value) => {
    const searchQuery = value ? `?q=${value}` : "";

    fetch(`http://localhost:8000/products/getproductsQuery${searchQuery}`)
      .then((response) => response.json())
      .then((json) => {
        setResults(json);
      });
  };

  const handleChange = (value) => {
    setInput(value);
    fetchData(value);
  };
  return (
    <div className="searchbar">
      <Form className="search-container">
        <Form.Control
          type="search"
          placeholder="Rechercher un produit"
          aria-label="Search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <span className="search-icon2">
          <Search />
        </span>
      </Form>
    </div>
  );
};

export default SearchBar;
