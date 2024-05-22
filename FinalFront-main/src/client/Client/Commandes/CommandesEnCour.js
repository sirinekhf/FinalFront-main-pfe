import React, { useContext, useEffect, useState } from "react";
import { BagX, CreditCard, Receipt, ThreeDots } from "react-bootstrap-icons";
import "./commandes.css";
import CommandeDetail from "./CommandeDetail";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthContext";
import axios from "axios";
import LoadingSpinner from "../../Components/Loadingspinner";
const CommandesEnCour = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [cmd, setCmd] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const [cmde, setCmde] = useState();
  const [cmdDetails, setCmdDetails] = useState([]);

  const handleDetails = (id) => {
    axios
      .get(`http://localhost:8000/orders/getCmdById/${id}`)
      .then((response) => {
        let c = cmd.find((commande) => commande.id === id);
        setCmde(c);
        setCmdDetails(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  useEffect(() => {
    setLoading(true);
    axios
      .get(`http://localhost:8000/orders/getCmdByUser/${user.email}`)
      .then((response) => {
        setCmd(response.data);
        setLoading(false);
        response.data.length < 0 ? setEmpty(true) : setEmpty(false);
      })
      .catch((error) => console.log(error));
  }, []);

  // const requestData = {
  //   object: {
  //     client: "John Doe", // Replace with the actual client name
  //     client_email = "rania@gmail.com",
  //     amount: 100, // Replace with the actual amount
  //   },
  // };
  const handlePaiement = (prix) => {
    const client = user.name;
    const clientEmail = user.email;
    const amount = prix;
    const queryParams = `${client}&${clientEmail}&${amount}`;
    window.location.href = `http://localhost:8000/pay/create/${queryParams}/`;
  };
  return (
    <section className="commandes">
      {loading ? (
        <LoadingSpinner />
      ) : (
        <>
          {empty ? (
            <div className="empty">
              <BagX />
              <h1>Vous n'avez placé aucune commande !</h1>
              <p>
                Toutes vos commandes seront sauvegardées ici pour que vous
                puissiez consulter leur statut à tout moment.
              </p>
              <Link to="/">
                <button className="btn-start"> Poursuivez vos achats</button>
              </Link>
            </div>
          ) : (
            <div className=" cmd container mt-5">
              <div className="d-flex justify-content-center row">
                <div className="col-md-10">
                  <div className="rounded">
                    <div className="table-responsive table-borderless">
                      <table className="table">
                        <thead>
                          <tr>
                            <th>Commande</th>
                            <th>Etat</th>
                            <th>Prix Total</th>
                            <th>Date de création</th>
                            <th>
                              <ThreeDots />
                            </th>
                          </tr>
                        </thead>
                        <tbody className="table-body">
                          {cmd.map((item, index) => {
                            const date = new Date(item.create_date);
                            const options = {
                              day: "numeric",
                              month: "long",
                              year: "numeric",
                            };
                            const formattedDate = date.toLocaleDateString(
                              undefined,
                              options
                            );
                            return (
                              <tr className="cell-1" key={index}>
                                <td>{item.name}</td>
                                <td>
                                  <span className="badge badge-success">
                                    {item.state}
                                  </span>
                                </td>
                                <td>{item.amount_total} DA</td>
                                <td>{formattedDate}</td>
                                <td>
                                  <button
                                    className="pay-btn"
                                    disabled={
                                      item.state != "confirm" ? true : false
                                    }
                                    onClick={() => {
                                      navigate(
                                        `/livdetails/${item.id}/${item.amount_total}`
                                      );
                                      //handlePaiement(item.amount_total);
                                    }}
                                  >
                                    <CreditCard />
                                    Paiement
                                  </button>
                                  <button
                                    className="detail-btn"
                                    onClick={() => {
                                      handleDetails(item.id);
                                      setModalOpen(true);
                                    }}
                                  >
                                    <Receipt />
                                    Details
                                  </button>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                      {modalOpen && (
                        <CommandeDetail
                          setOpenModal={setModalOpen}
                          cmd={cmde}
                          details={cmdDetails}
                        />
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </section>
  );
};

export default CommandesEnCour;
