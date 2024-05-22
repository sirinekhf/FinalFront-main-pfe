// import React, { useContext } from "react";
// import "./PopUp.css";
// import { X } from "react-bootstrap-icons";
// import { Link } from "react-router-dom";
// import { AuthContext } from "../../Context/AuthContext";
import React from "react";
import "./PopUp.css";
import { X } from "react-bootstrap-icons";
import { useContext } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Navigate, useNavigate } from "react-router-dom";
import axios from "axios";

const PopUp = ({ model, setModel, CartItem, setCartItem }) => {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleValidate = () => {
    const cartItemsData = CartItem.map((item) => ({
      product: item[0],
      qty_cond: item[1],
    }));
    const dataApi = {
      cartItems: cartItemsData,
      user: user,
    };

    axios
      .post("http://localhost:8000/orders/createorder", dataApi)
      .then((response) => {
        setCartItem([]);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div className="modal-panier">
      <div className="overlay"></div>
      <div className="modal-content-panier">
        {!user ? (
          <>
            <h4>Authentification requise</h4>
            <p>
              Cher client vous dever être connecter pour pouvoir valider votre
              panier
            </p>
            <button
              type="submit"
              className="btn-ok"
              onClick={() => {
                setModel(!model);
                navigate("/connexion");
              }}
            >
              Connecter
            </button>
            <button
              type="submit"
              className="btn-ok"
              onClick={() => setModel(!model)}
            >
              Annuler
            </button>
          </>
        ) : (
          <>
            <h4>Merci !</h4>
            <p>
              Cher client, votre commande sera prise en charge. Vous serez
              informé par e-mail une fois notre équipe valide votre commande
              pour effectuer le paiement en ligne.
            </p>

            <button
              type="submit"
              className="btn-ok"
              onClick={() => {
                handleValidate();
                setModel(!model);
              }}
            >
              Confirmer
            </button>
            <button
              type="submit"
              className="btn-ok"
              onClick={() => setModel(!model)}
            >
              Annuler
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PopUp;

// const PopUp = ({ setOpenModal, total }) => {
//   const { user } = useContext(AuthContext);
//   return (
//     <div className="pop">
//       <div className="modalBackground">
//         {user ? (
//           total > 0 ? (
//             <div className="modalContainer">
//               <div className="titleCloseBtn">
//                 <button
//                   onClick={() => {
//                     setOpenModal(false);
//                   }}
//                 >
//                   <X />
//                 </button>
//               </div>
//               <div className="title">
//                 <h1>Merci !</h1>
//               </div>
//               <div className="body">
//                 <p>
//                   Cher client, votre commande sera prise en charge. Vous serez
//                   informé par e-mail une fois notre équipe valide votre
//                   commande pour effectuer le paiement en ligne.
//                 </p>
//                 <p>
//                   Consuter l'etat de vos commande sur la page{" "}
//                   <span>
//                     <Link to="/commandes" className="popup-link">
//                       Mes commandes
//                     </Link>
//                   </span>{" "}
//                 </p>
//               </div>
//               <div className="footer">
//                 <button
//                   onClick={() => {
//                     setOpenModal(false);
//                   }}
//                   id="cancelBtn"
//                 >
//                   Annuler
//                 </button>
//                 <button>Confirmer</button>
//               </div>
//             </div>
//           ) : (
//             <div className="not-connected">
//               <div className="titleCloseBtn">
//                 <button
//                   onClick={() => {
//                     setOpenModal(false);
//                   }}
//                 >
//                   <X />
//                 </button>
//               </div>
//               <div className="body">
//                 <p>Votre panier est vide !</p>
//               </div>
//               <div className="footer">
//                 <button
//                   onClick={() => {
//                     setOpenModal(false);
//                   }}
//                   id="cancelBtn"
//                 >
//                   Ok
//                 </button>
//               </div>
//             </div>
//           )
//         ) : (
//           <div className="not-connected">
//             <div className="titleCloseBtn">
//               <button
//                 onClick={() => {
//                   setOpenModal(false);
//                 }}
//               >
//                 <X />
//               </button>
//             </div>
//             <div className="body">
//               <p>Vous devez être connecter pour pouvoir valider la commande</p>
//             </div>
//             <div className="footer">
//               <button
//                 onClick={() => {
//                   setOpenModal(false);
//                 }}
//                 id="cancelBtn"
//               >
//                 Annuler
//               </button>
//               <button>
//                 <Link
//                   to="/connexion"
//                   className="popup-link"
//                   style={{ color: "#fff" }}
//                 >
//                   Connecter
//                 </Link>
//               </button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default PopUp;
