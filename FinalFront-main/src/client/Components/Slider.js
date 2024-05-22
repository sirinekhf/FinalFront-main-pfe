import Slide from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./slider.css";
import { useNavigate } from "react-router-dom";
import { BagPlus, ChevronLeft, ChevronRight } from "react-bootstrap-icons";

import LoadingSpinner from "./Loadingspinner";

const SampleNextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="next">
        <ChevronRight />
      </button>
    </div>
  );
};
const SamplePrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="control-btn" onClick={onClick}>
      <button className="prev">
        <ChevronLeft />
      </button>
    </div>
  );
};

const Slider = ({ products, title, loading }) => {
  const productsToShow = products ? Math.min(products?.length, 6) : 6;
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: productsToShow,
    slidesToScroll: 1,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };
  const navigate = useNavigate();
  const handleCardClick = (productItemId) => {
    navigate(`/detail/${productItemId}`);
    window.scrollTo(0, 0);
  };

  return (
    <section className="slider-container">
      <div className="container">
        <div className="top-part">
          <h1>{title}</h1>
        </div>
        {loading ? (
          <LoadingSpinner />
        ) : (
          <Slide {...settings} className="slider">
            {products?.map((productItems) => {
              return (
                <div
                  key={productItems}
                  onClick={() => handleCardClick(productItems.id)}
                >
                  <div className="initial-slider">
                    <div className="img">
                      <img
                        src={require(`../Assets/images/products/${productItems.id}.png`)}
                        alt={productItems.name}
                      />
                    </div>
                    <div className="product-details">
                      <h3>{productItems.name}</h3>
                      <div className="price">
                        {/*<h4>{Number(productItems.list_price).toFixed(2)} DA</h4>
                         <button
                          onClick={(e) => {
                            e.stopPropagation();
                            //addToCart(productItems);
                          }}
                          className="add-btn"
                        >
                          Ajouter au panier
                          <BagPlus className="plus-bag-icon" />
                        </button> */}
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </Slide>
        )}
      </div>
    </section>
  );
};

export default Slider;
