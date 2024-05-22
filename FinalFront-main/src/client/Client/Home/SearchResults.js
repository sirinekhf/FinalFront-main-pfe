import axios from "axios";
import React from "react";

const SearchResults = ({
  results,
  setProducts,
  setIsFilterSearch,
  setCateg,
  setChange,
  setInput,
  setCurrentPage,
}) => {
  const handleClick = (id, name) => {
    setIsFilterSearch(true);
    setInput(name);
    axios
      .get(`http://localhost:8000/products/getproductsByCategory/${id}`)
      .then((response) => {
        setProducts(response.data);
        setCateg(id);
        setChange(true);
        setCurrentPage(1);
      })
      .catch((error) => console.log(error));
  };
  return (
    <div className="results-list2">
      {results.map((value, index) => {
        return (
          <div
            className="search-result2"
            key={index}
            onClick={() => {
              handleClick(value.id, value.name);
            }}
          >
            {" "}
            {value.name}{" "}
          </div>
        );
      })}
    </div>
  );
};

export default SearchResults;
