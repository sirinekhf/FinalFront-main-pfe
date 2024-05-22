import React, { useEffect, useState } from "react";
import Slider from "../../Components/Slider";
import LoadingSpinner from "../../Components/Loadingspinner";

const Sliders = ({ products, addToCart, title }) => {
  return (
    <div>
      <section className="slider-container">
        <div className="container">
          <div className="top-part">
            <h1>{title}</h1>
          </div>
          <Slider products={products} />
        </div>
      </section>
    </div>
  );
};

export default Sliders;
