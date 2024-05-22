import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import "./commandes.css";
import { X } from "react-bootstrap-icons";
import { useNavigate } from "react-router-dom";
import { PDFDownloadLink } from "@react-pdf/renderer";
import PDFReceipt from "./PDFReceipt";
const CommandeDetail = ({ setOpenModal, details, cmd }) => {
  const navigate = useNavigate();
  let date = new Date(cmd?.create_date);
  const options = {
    day: "numeric",
    month: "long",
    year: "numeric",
  };
  const formattedDate = date.toLocaleDateString(undefined, options);
  const receiptData = {
    date: formattedDate,
    orderNumber: cmd?.name,
    subTotal: cmd?.amount_untaxed,
    tax: cmd?.amount_tax,
    total: cmd?.amount_total,
    products: details,
  };
  console.log(receiptData);
  return (
    <div className="modal-panier">
      <div className="overlay"></div>
      <div className="receipt">
        <div className="titleCloseBtn">
          <h1>Reçu de la commande</h1>
          <button
            onClick={() => {
              setOpenModal(false);
            }}
          >
            <X />
          </button>
        </div>

        <div className="top-details">
          <div>
            <p>Date</p>
            <p>{formattedDate}</p>
          </div>
          <div>
            <p>N° de commande</p>
            <p>{cmd?.name}</p>
          </div>
        </div>
        <div className="products">
          {details.map((item) => {
            let total = Number(item.price_unit) * Number(item.product_uos_qty);

            return (
              <div className="products-items">
                <p>{item.name}</p>
                <p>
                  {" "}
                  {Number(item.price_unit).toFixed(2)} *{" "}
                  {Number(item.order_uom_qty) / Number(item.qty_conditionnee)} *{" "}
                  {Number(item.qty_conditionnee)}
                </p>
                <p>{total.toFixed(2)} DZ</p>
              </div>
            );
          })}
        </div>

        <div className="total">
          <div className="top-area">
            <p>
              Montant hors taxes: <p>{cmd?.amount_untaxed} DZ</p>
            </p>
            {/* <p>
              Remise: <p>0.00 DZ</p>
            </p> */}
            <p>
              Taxes: <p>{cmd?.amount_tax} DZ </p>
            </p>
            {/* <p>
              Montant du timbre: <p> {cmd?.fiscal_stamp_amount} DZ</p>
            </p> */}
          </div>
          <div className="end">
            Total:
            <p> {cmd?.amount_total} DZ</p>
          </div>
          {/* <div className="print">
            <button className="add-btn" onClick={() => handlePrintReceipt()}>
              {" "}
              Imprimer le reçu
            </button>
          </div> */}
          <div className="print">
            <PDFDownloadLink
              document={<PDFReceipt data={receiptData} />}
              fileName="receipt.pdf"
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  "Generating PDF..."
                ) : (
                  <button className="add-btn">Imprimer le reçu</button>
                )
              }
            </PDFDownloadLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommandeDetail;
