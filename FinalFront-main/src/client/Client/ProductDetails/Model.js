import React, { useEffect } from "react";
import "./style.css";
import { X } from "react-bootstrap-icons";
import { useState } from "react";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
const Model = ({ variantes, model, setModel, addToCart }) => {
  // const [checked, setChecked] = useState("");

  // const handleOkClick = (val) => {
  //   axios
  //     .get(
  //       `http://localhost:8000/products/getfinalbyid/${val.tmpl_id}/?attribute=${val.attribute}&attribute_value=${val.attribute_value}`,
  //       val
  //     )
  //     .then((response) => {
  //       addToCart(response.data);
  //     })
  //     .catch((error) => {
  //       console.log("Erreur Axios:", error);
  //     });
  // };
  // return (
  //   <div className="modal-refus">
  //     <div className="overlay2"></div>
  //     <div className="modal-content2">
  //       <X onClick={() => setModel(!model)} className="btn-close" />
  //       <div className="variantes">
  //         <p>Veuillez choisir :</p>
  //         {variantes.map((item, key) => {
  //           return (
  //             <div className="radios" key={key}>
  //               <Container>
  //                 <Row>
  //                   <Col xs={6} md={6} xl={6}>
  //                     <input
  //                       type="radio"
  //                       name="check"
  //                       value={checked}
  //                       onChange={() => setChecked(item)}
  //                     />
  //                     {item.attribute_value}
  //                   </Col>
  //                   <Col xs={6} md={6} xl={6}>
  //                     {" "}
  //                     <span>{Number(item.prod_price).toFixed(2)} DZ</span>
  //                   </Col>
  //                 </Row>
  //               </Container>

  //               <br />
  //             </div>
  //           );
  //         })}
  //       </div>
  //       <button
  //         className="add-btn"
  //         onClick={() => {
  //           handleOkClick(checked);
  //           setModel(!model);
  //         }}
  //       >
  //         VALIDER
  //       </button>
  //     </div>
  //   </div>
  // );

  const [checkedItems, setCheckedItems] = useState({});
  const [selectedItem, setSelectedItem] = useState([]);
  const [bool, setBool] = useState(false);
  const handleCheckboxChange = (event, item) => {
    const { name, checked } = event.target;
    setCheckedItems((prevState) => ({
      ...prevState,
      [name]: checked ? item : null,
    }));
  };

  const handleOkClick = () => {
    const selectedItems = Object.values(checkedItems).filter(Boolean);
    // console.log(selectedItems);
    // axios
    //   .get(
    //     `http://localhost:8000/products/getfinalbyid/${selectedItems[0][0].tmpl_id}/${selectedItems[0][0].prod_id}`
    //   )
    //   .then((response) => addToCart(response.data));
    const requests = selectedItems.map((item) =>
      axios.get(
        `http://localhost:8000/products/getfinalbyid/${selectedItems[0][0].tmpl_id}/${selectedItems[0][0].prod_id}`
      )
    );

    Promise.all(requests)
      .then((responses) => {
        const newItems = responses.map((response) => response.data);
        setSelectedItem((prevSelectedItems) => [
          ...prevSelectedItems,
          ...newItems,
        ]);
        newItems.forEach((item) => {
          addToCart(item);
          console.log("second");
        });
      })
      .catch((error) => {
        console.log("Erreur Axios:", error);
      });

    setModel(!model);
  };

  return (
    <div className="modal-refus">
      <div className="overlay2"></div>
      <div className="modal-content2">
        <X onClick={() => setModel(!model)} className="btn-close" />
        <div className="variantes">
          <p>Veuillez choisir :</p>
          {variantes.map((item, key) => {
            return item.length === 1 ? (
              <div className="radios" key={key}>
                <Container>
                  <Row>
                    <Col xs={6} md={6} xl={6}>
                      <input
                        type="checkbox"
                        name={`check${key}`}
                        checked={checkedItems[`check${key}`]}
                        onChange={(event) => handleCheckboxChange(event, item)}
                      />
                      {item[0].attribute_value}
                    </Col>
                    <Col xs={6} md={6} xl={6}>
                      {" "}
                      <span>{Number(item[0].prod_price).toFixed(2)} DZ</span>
                    </Col>
                  </Row>
                </Container>
                <br />
              </div>
            ) : (
              <div className="radios" key={key}>
                <Container>
                  <Row>
                    <Col xs={9} md={9} xl={9}>
                      <input
                        type="checkbox"
                        name={`check${key}`}
                        checked={checkedItems[`check${key}`]}
                        onChange={(event) => handleCheckboxChange(event, item)}
                      />
                      {item.map((variant, subIndex) => (
                        <span key={subIndex}>
                          {variant.attribute}: {variant.attribute_value},{" "}
                        </span>
                      ))}
                    </Col>
                    <Col xs={3} md={3} xl={3}>
                      {" "}
                      <span>{Number(item[0].prod_price).toFixed(2)} DZ</span>
                    </Col>
                  </Row>
                </Container>
                <br />
              </div>
            );
          })}
        </div>
        <button className="add-btn" onClick={handleOkClick}>
          VALIDER
        </button>
      </div>
    </div>
  );
};

export default Model;
