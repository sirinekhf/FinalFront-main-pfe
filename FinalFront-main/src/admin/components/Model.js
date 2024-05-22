import React from "react";
import "./Model.css";
import { X } from "react-bootstrap-icons";
const Model = ({ msg, model, setModel }) => {
  if (model) {
    document.body.classList.add("active-modal");
  } else {
    document.body.classList.remove("active-modal");
  }
  return (
    <div className="modal-refus">
      <div className="overlay"></div>
      <div className="modal-content">
        <X onClick={() => setModel(!model)} className="btn-close" />
        <h4>{msg}</h4>
        {/* <button
          type="submit"
          className="btn-ok"
          onClick={() => setModel(!model)}
        > 
        OK
        </button>*/}
      </div>
    </div>
  );
};

export default Model;
