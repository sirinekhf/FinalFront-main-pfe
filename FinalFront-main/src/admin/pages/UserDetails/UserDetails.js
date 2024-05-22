import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";

const UserDetails = () => {
  const { id } = useParams();
  const [user, setUser] = useState("");
  const [partner, setPartner] = useState("");
  useEffect(() => {
    axios
      .get(`http://localhost:8000/users/getuser/${id}`)
      .then((response) => {
        setUser(response.data.user);
        setPartner(response.data.partner);
      })
      .catch((error) => console.log(error));
  }, []);

  return (
    <div className="card">
      <Container>
        <Row>
          <div className="title"> Client {user?.name}</div>
          <Col xs={12} md={6} xl={6}>
            <div className="cmd-data">
              <div>
                <span>
                  Nom: <p>{user?.name}</p>
                </span>
              </div>
              <div>
                <span>
                  Adresse email:<p>{user?.email}</p>
                </span>
              </div>
              <div>
                <span>
                  Numéro de téléphone:<p>{user?.phone}</p>
                </span>
              </div>
              <div>
                <span>
                  Type du client:
                  <p>{user?.is_client_group ? "groupe" : "particulier"}</p>
                </span>
              </div>
            </div>
          </Col>

          <Col xs={12} md={6} xl={6}>
            <div className="cmd-data">
              <div>
                <span>
                  Adresse:{" "}
                  {partner?.street ? <p>{partner?.street}</p> : <p> / </p>}
                </span>
              </div>
              <div>
                <span>
                  Adresse supplémentaire:
                  {partner?.street2 ? <p>{partner?.street2}</p> : <p> / </p>}
                </span>
              </div>
              <div>
                <span>
                  Wilaya:{partner?.wilaya ? <p>{partner.wilaya}</p> : <p>/</p>}
                </span>
              </div>
              <div>
                <span>
                  Commune:
                  {partner?.commune ? <p>{partner.commune}</p> : <p>/</p>}
                </span>
              </div>
            </div>
          </Col>
        </Row>
        {user?.is_client_groupe ? (
          <Row>
            <div className="title" style={{ margin: "20px 10px" }}>
              {" "}
              Données supplémentaire
            </div>
            <Col xs={12} md={6} xl={6}>
              <div className="cmd-data">
                <div>
                  <span>
                    Secteur:{" "}
                    {partner?.sector_id ? <p>{partner.sector_id}</p> : <p>/</p>}
                  </span>
                </div>
                <div>
                  <span>
                    Activite:
                    {partner?.activity_id ? (
                      <p>{partner.activity_id}</p>
                    ) : (
                      <p>/</p>
                    )}
                  </span>
                </div>
                <div>
                  <span>
                    Branche:
                    {partner?.branche_id ? (
                      <p>{partner.branche_id}</p>
                    ) : (
                      <p>/</p>
                    )}
                  </span>
                </div>
                <div>
                  <span>
                    Societé mère:
                    {partner?.parent_partner_id ? (
                      <p>{partner.parent_partner_id}</p>
                    ) : (
                      <p>/</p>
                    )}
                  </span>
                </div>
                <div>
                  <span>
                    Code comptable:
                    {partner?.old_account_code ? (
                      <p>{partner.old_account_code}</p>
                    ) : (
                      <p>/</p>
                    )}
                  </span>
                </div>
              </div>
            </Col>
            <Col xs={12} md={6} xl={6}>
              <div className="cmd-data">
                <div>
                  <span>
                    Numéro du registre de commerce RC:
                    {partner?.x_rc ? <p>{partner.x_rc}</p> : <p>/</p>}
                  </span>
                </div>
                <div>
                  <span>
                    Date d'enregistrement RC:
                    {partner?.x_date_rc ? <p>{partner.x_date_rc}</p> : <p>/</p>}
                  </span>
                </div>
                <div>
                  <span>
                    NIS:
                    {partner?.x_nis ? <p>{partner.x_nis}</p> : <p>/</p>}
                  </span>
                </div>
                <div>
                  <span>
                    NIF:
                    {partner?.x_nif ? <p>{partner.x_nif}</p> : <p>/</p>}
                  </span>
                </div>
                <div>
                  <span>
                    ART:
                    {partner?.x_art ? <p>{partner.x_art}</p> : <p>/</p>}
                  </span>
                </div>
              </div>
            </Col>
          </Row>
        ) : null}
      </Container>
    </div>
  );
};

export default UserDetails;
