// // import React, { useEffect } from "react";
// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import "./style.css";
// // const Register = () => {
// //   const [name, setName] = useState("");
// //   const [email, setemail] = useState("");
// //   const [password, setpassword] = useState("");
// //   const [phone, setphone] = useState("");
// //   const [is_client_particulier, setclientParticulier] = useState(false);
// //   const [is_client_groupe, setclientGroupe] = useState(false);
// //   const [redirect, setredirect] = useState(false);
// //   const navigate = useNavigate();
// //   const submit = async (e) => {
// //     e.preventDefault();
// //     await fetch("http://localhost:8000/users/register", {
// //       method: "POST",
// //       headers: { "Content-Type": "application/json" },
// //       body: JSON.stringify({
// //         name,
// //         email,
// //         password,
// //         phone,
// //         is_client_groupe,
// //         is_client_particulier,
// //       }),
// //     });
// //     setredirect(true);
// //   };
// //   if (redirect) navigate("/connexion");

// //   return (
// //     <div className="form">
// //       <h1 className="h3 mb-3 fw-normal">Creer votre compte</h1>
// //       <form className="form-signin" onSubmit={submit}>
// //         <input
// //           type="text"
// //           placeholder="Saisir votre nom"
// //           className="form-control"
// //           required
// //           onChange={(e) => setName(e.target.value)}
// //         />
// //         <br />
// //         <input
// //           type="email"
// //           name="email"
// //           className="form-control"
// //           placeholder="Saisir votre email"
// //           required
// //           onChange={(e) => setemail(e.target.value)}
// //         />
// //         <br />
// //         <input
// //           type="password"
// //           name="password"
// //           className="form-control"
// //           placeholder="Password"
// //           required
// //           onChange={(e) => setpassword(e.target.value)}
// //         />{" "}
// //         <br />
// //         <input
// //           type="text"
// //           className="form-control"
// //           placeholder="Phone number"
// //           name="phone"
// //           onChange={(e) => setphone(e.target.value)}
// //         />{" "}
// //         <br />
// //         <input
// //           type="radio"
// //           id="client"
// //           name="client"
// //           value="is_client_particulier"
// //           onChange={(e) => setclientParticulier(true)}
// //           required
// //         />
// //         <label htmlFor="is_client_particulier">Particulier</label>
// //         <input
// //           type="radio"
// //           id="client1s"
// //           name="client"
// //           value="is_client_groupe"
// //           required
// //           onChange={(e) => setclientGroupe(true)}
// //         />
// //         <label htmlFor="is_client_groupe">Groupe</label>
// //         <br />
// //         <button className="w-100 btn btn-lg btn-primary" type="submit">
// //           Valider
// //         </button>
// //       </form>
// //     </div>
// //   );
// // };
// // {
// //   /* <input
// //           type="radio"
// //           id="admin"
// //           name="is_admin"
// //           value="is_admin"
// //           onChange={(e) => setadmin(true)}
// //         />
// //           <label for="is_admin">admin</label>
// //         <br /> {" "}
// //         <input
// //           type="radio"
// //           id="comercial"
// //           name="is_comercial"
// //           value="is_comercial"
// //           onChange={(e) => {
// //             setcomercial(true);
// //           }}
// //         />
// //          <label for="is_comercial">comercial</label>
// //         <br /> {" "} */
// // }
// // export default Register;

// import React, { useContext, useState, useEffect } from "react";
// import { Link, useNavigate } from "react-router-dom";
// import "./style.css";
// import { AuthContext } from "../../Context/AuthContext";
// import axios from "axios";

// const Register = () => {
//   let { loginUser } = useContext(AuthContext);
//   const [next, setnext] = useState(false);
//   const [first, setFirst] = useState(true);
//   const [last, setLast] = useState(false);
//   const [name, setName] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [phone, setphone] = useState("");
//   const [is_client_particulier, setclientParticulier] = useState(false);
//   const [is_client_groupe, setclientGroupe] = useState(false);
//   const [redirect, setredirect] = useState(false);
//   const [isValidated, setValidated] = useState(false);

//   const handleChangeEmail = (event) => {
//     if (!isValidated) {
//       setValidated(true);
//     }
//   };
//   const navigate = useNavigate();

//   const submit = () => {
//     console.log("clicked");
//     // const datareg = {
//     //   name: name,
//     //   email: email,
//     //   password: password,
//     //   phone: phone,
//     //   is_client_groupe: is_client_groupe,
//     //   is_client_particulier: is_client_particulier,
//     // };
//     axios
//       .post(
//         "http://localhost:8000/users/register",
//         {
//           name,
//           email,
//           password,
//           phone,
//           is_client_groupe,
//           is_client_particulier,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setredirect(true);
//       })
//       .catch((error) => {
//         console.error("erreur dans register", error);
//       });
//     setredirect(true);
//   };
//   if (redirect) navigate("/connexion");
//   return (
//     <div className={"wrapperr align-items-center justify-content-center w-100"}>
//       {first ? (
//         <div className="login">
//           <h2 className="mb-3">Creer un compte</h2>
//           <form className="needs-validation">
//             <div
//               className={`form-group ${
//                 isValidated ? "was-validated" : ""
//               } mb-2`}
//             >
//               <input
//                 type="email"
//                 className="form-control"
//                 placeholder="Email Adress"
//                 required
//                 onChange={handleChangeEmail}
//               />
//               <div className="invalid-feedback">Please enter a valid email</div>
//             </div>
//           </form>
//           <button
//             className="btn btn-success w-40 mt-2"
//             onClick={() => {
//               setnext(true);
//               setFirst(false);
//             }}
//           >
//             CONTINUER
//           </button>
//           <button
//             className="btn btn-delete"
//             onClick={() => {
//               navigate("/connexion");
//             }}
//           >
//             Retour
//           </button>
//           <br></br>
//         </div>
//       ) : null}
//       {next ? (
//         <>
//           <div className="login">
//             <h2 className="mb-3">Confirmation</h2>
//             <form className="needs-validation">
//               <div
//                 className={`form-group ${
//                   isValidated ? "was-validated" : ""
//                 } mb-2`}
//               >
//                 <input
//                   type="email"
//                   className="form-control"
//                   placeholder="Code de confirmation"
//                   required
//                   onChange={handleChangeEmail}
//                 />
//                 <div className="invalid-feedback">
//                   Please enter a valid code
//                 </div>
//               </div>
//             </form>

//             <button
//               className="btn btn-success"
//               onClick={() => {
//                 setnext(false);
//                 setLast(true);
//               }}
//             >
//               CONTINUER
//             </button>
//             <button
//               className="btn btn-delete"
//               onClick={() => {
//                 setnext(false);
//                 setFirst(true);
//               }}
//             >
//               Retour
//             </button>
//           </div>
//         </>
//       ) : null}
//       {last ? (
//         <>
//           <div className="login">
//             <h2 className="mb-3">Données Personnelles</h2>
//             <form className="needs-validation">
//               <div
//                 className={`form-group ${
//                   isValidated ? "was-validated" : ""
//                 } mb-2`}
//               >
//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Nom"
//                   required
//                   onChange={(e) => setName(e.target.value)}
//                 />

//                 <input
//                   type="text"
//                   className="form-control"
//                   placeholder="Téléphone mobile"
//                   required
//                   onChange={(e) => setphone(e.target.value)}
//                 />
//                 <div className="form-group mb-2">
//                   <input
//                     name="password"
//                     type="password"
//                     className="form-control"
//                     placeholder="Mot de passe"
//                     aria-label="password"
//                     aria-describedby="password"
//                     id="password-input"
//                     onChange={(e) => setpassword(e.target.value)}
//                   />
//                 </div>
//                 <div className="radio">
//                   <div>
//                     <input
//                       type="radio"
//                       id="client"
//                       name="client"
//                       value="is_client_particulier"
//                       onChange={(e) => setclientParticulier(true)}
//                       required
//                     />
//                     <label htmlFor="is_client_particulier">Particulier</label>
//                   </div>
//                   <div>
//                     <input
//                       type="radio"
//                       id="client1s"
//                       name="client"
//                       value="is_client_groupe"
//                       required
//                       onChange={(e) => setclientGroupe(true)}
//                     />
//                     <label htmlFor="is_client_groupe">Groupe</label>
//                   </div>
//                 </div>
//                 <br />
//               </div>
//             </form>
//             <button
//               type="submit"
//               className="btn btn-success"
//               onClick={() => {
//                 setnext(false);
//                 setLast(true);
//                 submit();
//               }}
//             >
//               CONTINUER
//             </button>
//             <button
//               className="btn btn-delete"
//               onClick={() => {
//                 setnext(true);
//                 setLast(false);
//               }}
//             >
//               Retour
//             </button>
//           </div>
//         </>
//       ) : null}
//     </div>
//   );
// };
// export default Register;

// import React, { useEffect, useState } from "react";
// import { Redirect, useNavigate } from "react-router-dom";
// import axios from "axios";

// const Register = () => {
//   const [name, setName] = useState("");
//   const [email, setemail] = useState("");
//   const [password, setpassword] = useState("");
//   const [phone, setphone] = useState("");
//   const [is_client_particulier, setclientParticulier] = useState(false);
//   const [is_client_groupe, setclientGroupe] = useState(false);
//   const [redirect, setredirect] = useState(false);
//   const navigate = useNavigate();

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios
//       .post(
//         "http://localhost:8000/users/register",
//         {
//           name,
//           email,
//           password,
//           phone,
//           is_client_groupe,
//           is_client_particulier,
//         },
//         {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         }
//       )
//       .then((response) => {
//         console.log(response.data);
//         setredirect(true);
//       })
//       .catch((error) => {
//         console.error("erreur dans register", error);
//       });
//   };
//   redirect && navigate("/");

//   return (
//     <div className="form">
//       <form className="form-signin" onSubmit={handleSubmit}>
//         <h1 className="h3 mb-3 fw-normal">Creer votre compte</h1>
//         <input
//           type="text"
//           placeholder="Saisir votre nom"
//           required
//           onChange={(e) => setName(e.target.value)}
//         />
//         <br />
//         <input
//           type="email"
//           name="email"
//           className="form-control"
//           placeholder="Saisir votre email"
//           required
//           onChange={(e) => setemail(e.target.value)}
//         />
//         <br />
//         <input
//           type="password"
//           name="password"
//           className="form-control"
//           placeholder="Password"
//           required
//           onChange={(e) => setpassword(e.target.value)}
//         />{" "}
//         <br />
//         <input
//           type="text"
//           className="form-control"
//           placeholder="Phone number"
//           name="phone"
//           onChange={(e) => setphone(e.target.value)}
//         />{" "}
//         <br />
//         <input
//           type="radio"
//           id="client"
//           name="client"
//           value="is_client_particulier"
//           onChange={(e) => setclientParticulier(true)}
//           required
//         />
//         <label htmlFor="is_client_particulier">Particulier</label>
//         <input
//           type="radio"
//           id="client1s"
//           name="client"
//           value="is_client_groupe"
//           required
//           onChange={(e) => setclientGroupe(true)}
//         />
//         <label htmlFor="is_client_groupe">Groupe</label>
//         <br />
//         <button className="w-100 btn btn-lg btn-primary" type="submit">
//           Valider
//         </button>
//       </form>
//     </div>
//   );
// };
// export default Register;

import { useState } from "react";
import "./style.css";
const Register = (props) => {
  const [focused, setFocused] = useState(false);
  const { label, errorMessage, onChange, id, ...inputProps } = props;

  const handleFocus = (e) => {
    setFocused(true);
  };

  return (
    <div className="formInput">
      <label>{label}</label>

      <input
        {...inputProps}
        onChange={onChange}
        onBlur={handleFocus}
        onFocus={() =>
          inputProps.name === "confirmPassword" && setFocused(true)
        }
        focused={focused.toString()}
      />
      <span>{errorMessage}</span>
    </div>
  );
};

export default Register;
