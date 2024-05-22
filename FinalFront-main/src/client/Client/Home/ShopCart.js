import React from "react";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useState } from "react";
import LoadingSpinner from "../../Components/Loadingspinner";
import NoItems from "../../Components/NoItems";
const ShopCart = ({ shopItems, Empty }) => {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    shopItems.length > 0 ? setIsLoading(false) : setIsLoading(true);
  }, [shopItems]);

  return (
    <>
      {Empty ? (
        <NoItems />
      ) : (
        <>
          {isLoading ? (
            <LoadingSpinner />
          ) : (
            <>
              {shopItems?.map((shopItems, index) => {
                return (
                  <div
                    className="product mtop"
                    onClick={() => {
                      navigate(`/detail/${shopItems.id}`);
                      window.scrollTo(0, 0);
                    }}
                    key={index}
                  >
                    <img
                      src={require(`../../Assets/images/products/${shopItems.id}.png`)}
                      alt={shopItems.name}
                    />

                    <div className="product-detail">
                      <h3>{shopItems.name}</h3>
                      {/*<div className="price-catg">
                    <h4>{Number(shopItems.list_price).toFixed(2)}DA</h4>
                     {present ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      addToCart(shopItems);
                    }}
                  >
                    <CartPlus />
                  </button>
                ) : null} 
                  </div>*/}
                    </div>
                  </div>
                );
              })}
            </>
          )}
        </>
      )}
    </>
  );
};

export default ShopCart;
