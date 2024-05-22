import React from "react";
import { Check, XCircleFill } from "react-bootstrap-icons";

function ResponseMsg({ openResponse, setOpenResponse }) {
  setTimeout(() => {
    setOpenResponse({
      isOpen: false,
      msg: "",
    });
  }, "3500");
  return (
    <div className="response">
      <p>
        <Check />
        {openResponse?.msg}
      </p>
      <XCircleFill
        className="close-icon"
        onClick={() => setOpenResponse(false)}
      />
    </div>
  );
}

export default ResponseMsg;
