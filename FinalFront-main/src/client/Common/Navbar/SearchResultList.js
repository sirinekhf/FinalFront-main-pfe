import React from "react";
import "./search.css";
import { useNavigate } from "react-router-dom";

const SearchResultList = ({ results, setResults, setInput }) => {
  const navigate = useNavigate();

  return (
    <div className="results-list">
      {results.map((value, index) => {
        return (
          <div
            className="search-result"
            key={index}
            onClick={() => {
              setResults([]);
              navigate(`/detail/${value.id}`);
              setInput(value.name);
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

export default SearchResultList;
