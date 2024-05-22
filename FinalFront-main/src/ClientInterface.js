/** client ********************************************************* */
import React, { useState } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import HeaderWrapper from "./client/Common/Navbar/HeaderWrapper";
import Cart from "./client/Client/Cart/Cart";
import Home from "./client/Client/Home/Home";
import { AuthProvider } from "./Context/AuthProvider";
import Login from "./client/Common/Connexion/Login ";
import Register from "./client/Common/Connexion/Register";
import FooterWrapper from "./client/Common/Footer/FooterWrapper";
import ProductsDetails from "./client/Client/ProductDetails/ProductsDetails";
import { ToastContainer } from "react-toastify";
import ResponseMsg from "./client/Components/ResponseMsg";
import CommandesEnCour from "./client/Client/Commandes/CommandesEnCour";
import LivraisonPage from "./client/Client/Commandes/LivraisonPage";
import HeaderWrap from "./client/Common/Navbar/HeaderWrap";
import EditProfile from "./client/Client/editProfile/EditProfile";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./client/style.css";
import CategorieDetails from "./client/Client/CategorieDetails/CategorieDetails";
import NotFound from "./NotFound";
import Form from "./client/Common/Connexion/Forms";
import Regist from "./client/Common/Connexion/Regist";
const ClientInterface = () => {
  // const notify = () => {
  //   toast.success("Produit ajoutÃ© au panier", {
  //     position: "top-center",
  //     autoClose: 3000,
  //     hideProgressBar: true,
  //     closeOnClick: false,
  //     pauseOnHover: true,
  //     draggable: true,
  //     progress: undefined,
  //     theme: "colored",
  //   });
  // };

  const [CartItem, setCartItem] = useState([]);
  const removeItem = (product) => {
    const productExit = CartItem.find((item) => item[0].id === product.id);
    if (productExit) {
      setCartItem(CartItem.filter((item) => item[0].id !== product.id));
    }
    setOpenResponse({
      isOpen: true,
      msg: "La produit est retiré du panier",
    });
  };

  const addToCart = (product) => {
    const productExit = CartItem.find((item) => item[0].id === product.id);

    if (productExit) {
      setCartItem(
        CartItem.map((item) =>
          item[0].id === product.id
            ? [item[0], item[1] + 1] // Increment the quantity
            : item
        )
      );
    } else {
      setCartItem([...CartItem, [product, 1]]); // Add new item with quantity 1
    }
    // notify();
    setOpenResponse({
      isOpen: true,
      msg: " Le produit est ajouté au panier",
    });
  };

  const decreaseQty = (product, newQuantity) => {
    if (newQuantity === 0) {
      setCartItem(CartItem.filter((item) => item[0].id !== product.id));
    } else {
      setCartItem(
        CartItem.map((item) =>
          item[0].id === product.id ? [item[0], newQuantity] : item
        )
      );
    }
  };

  // const decreaseQty = (product) => {
  //   const productExit = CartItem.find((item) => item[0].id === product.id);
  //   if (productExit[1] === 1) {
  //     setCartItem(CartItem.filter((item) => item[0].id !== product.id));
  //   } else {
  //     setCartItem(
  //       CartItem.map((item) =>
  //         item[0].id === product.id
  //           ? [item[0], item[1] - 1] // Increment the quantity
  //           : item
  //       )
  //     );
  //   }
  //   setOpenResponse({
  //     isOpen: true,
  //     msg: "La quantitÃ© du produit a Ã©tÃ© mise Ã  jour",
  //   });
  // };
  const [openResponse, setOpenResponse] = useState({
    isOpen: false,
    msg: "",
  });

  return (
    <>
      {openResponse?.isOpen ? (
        <ResponseMsg
          openResponse={openResponse}
          setOpenResponse={setOpenResponse}
        />
      ) : (
        <HeaderWrap />
      )}

      <HeaderWrapper CartItem={CartItem} />
      <div className="client-app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route
            path="/cart"
            element={
              <Cart
                CartItem={CartItem}
                setCartItem={setCartItem}
                addToCart={addToCart}
                decreaseQty={decreaseQty}
                removeItem={removeItem}
              />
            }
          />
          <Route path="/connexion" element={<Login />} />
          <Route exact path="/register" element={<Regist />} />
          <Route exact path="/commandes" element={<CommandesEnCour />} />
          <Route
            path="/detail/:productId"
            element={<ProductsDetails addToCart={addToCart} />}
          />
          <Route path="/categorie/:id/:name" element={<CategorieDetails />} />
          <Route path="/livdetails/:id/:amount" element={<LivraisonPage />} />
          <Route path="/editProfile" element={<EditProfile />} />

          <Route path="/*" element={<NotFound />} />
        </Routes>
      </div>
      <FooterWrapper />
      <ToastContainer
        position="top-left"
        limit={1}
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
    </>
  );
};
export default ClientInterface;
