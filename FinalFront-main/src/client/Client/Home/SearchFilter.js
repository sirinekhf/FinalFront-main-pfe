import React, { useState } from "react";
import { Form, Button } from "react-bootstrap";
import { Search } from "react-bootstrap-icons";
const SearchFilter = ({ setResults, input, setInput }) => {
  let fetchData = (value) => {
    const searchQuery = value ? `?q=${value}` : "";
    fetch(`http://localhost:8000/products/getCatgQuery${searchQuery}`)
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
    <div className="searchfilter">
      <Form className="search-container">
        <Form.Control
          type="search"
          placeholder="Chercher"
          aria-label="Search"
          value={input}
          onChange={(e) => handleChange(e.target.value)}
        />
        <span className="search-icon">
          <Search />
        </span>
      </Form>
    </div>
  );
};

export default SearchFilter;
