import React, { useState } from "react";
import { InputReducer } from "./InputReducer";
import { ACTIONS } from "./actions";
import axios from "axios";
import { useReducer } from "react";
import { useEffect } from "react";
const PriceFilter = ({
  setProducts,
  changeToInitial,
  setChange,
  categ,
  setIsFilterPrice,
  setEmpty,
}) => {
  const options = {
    tableCss: "ui fixed red table",
    sortable: true,
    pageable: true,
    cellCss: "cellCss",
    pageSize: 5,
    pagerCss: "pager",
    hiddenCols: ["id", "ProductCode", "DateScanned"],
    searchable: true,
    searchInputCss: "searchInputCss",
    dateCols: [{ DateScanned: "en-GB" }],
    dateOptions: {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    },
  };

  const [min, SetMin] = useState("");
  const [max, SetMax] = useState("");
  const onMinSliderChange = (e) => {
    dispatch({
      type: ACTIONS.UPDATEA,
      payload: { value: e.currentTarget.value },
    });
  };
  const onMaxSliderChange = (e) => {
    dispatch({
      type: ACTIONS.UPDATEB,
      payload: { value: e.currentTarget.value },
    });
  };
  const handleOkClick = (categ, min, max) => {
    setIsFilterPrice(true);
    axios
      .get(
        `http://localhost:8000/products/filtercombine/${categ}/${min}/${max}/`
      )
      .then((response) => {
        setProducts(response.data);
        if (response.data.length == 0) setEmpty(true);
      })
      .catch((error) => console.log(error));
  };
  useEffect(() => {
    axios
      .get("http://localhost:8000/products/getminmaxprice/")
      .then((response) => {
        SetMin(response.data.min_price);
        SetMax(response.data.max_price);
      })
      .catch((error) => console.log(error));
  }, [min, max]);
  const initialState = {
    options: options,
    minVal: min ? min : 1,
    maxVal: max ? max : 800000,
    currentMinVal: min ? min : 1,
    currentMaxVal: max ? max : 800000,
  };

  const [state, dispatch] = useReducer(InputReducer, initialState);
  useEffect(() => {
    if (changeToInitial) {
      dispatch({
        type: ACTIONS.UPDATE_INITIAL,
      });
      setChange(false);
    }
  }, [changeToInitial]);
  return (
    <div className="price-filter">
      <div className="slidervDiv">
        <label htmlFor="a">{state.currentMinVal}</label>

        <input
          name="a"
          min={state.minVal}
          max={state.maxVal}
          onChange={onMinSliderChange}
          type="range"
          value={state.currentMinVal}
        />

        <input
          name="b"
          min={state.minVal}
          max={state.maxVal}
          className="b"
          onChange={onMaxSliderChange}
          type="range"
          value={state.currentMaxVal}
        />
        <label className="labelb" htmlFor="b">
          {state.currentMaxVal}
        </label>
      </div>
      <button
        onClick={() =>
          handleOkClick(categ, state.currentMinVal, state.currentMaxVal)
        }
      >
        FILTRER
      </button>
    </div>
  );
};

export default PriceFilter;
