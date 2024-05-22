import { Box, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import Header from "../../components/Header";
import { useEffect } from "react";
import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const handleButtonClick = (id, active, name) => {
  let variable = active === "active" ? "désactiver" : "activer";

  confirmAlert({
    title: `Confirmation`,
    message: `Voulez-vous vraiment ${variable} le compte de ${name}`,
    buttons: [
      {
        label: "Accepter",
        onClick: () => {
          axios
            .patch(`http://localhost:8000/users/changeaccess/${id}`)
            .then((response) => {
              window.location.reload(); // Refresh the page
            })
            .catch((error) => console.log(error));
        },
      },
      {
        label: "Annuler",
        onClick: () => {
          // Handle cancel action here
          console.log("Cancelled");
        },
      },
    ],
  });
};
const Contacts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/clients")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  const handleRowClick = (id) => {
    navigate(`/comercial/userDetails/${id}`);
  };

  const updatedData = data.map((row) => ({
    ...row,
    type: row.is_client_groupe ? "groupe" : "particulier",
    active: row.is_active ? "active" : "désactivé",
    btn: row.is_active ? "Désactiver " : "Activer",
  }));
  const columns = [
    { field: "id", headerName: "ID", flex: 0.5 },
    { field: "name", headerName: "Nom", flex: 0.5 },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      cellClassName: "name-column--cell",
    },
    {
      field: "type",
      headerName: "Type Client",
      headerAlign: "left",
      align: "left",
    },
    {
      field: "phone",
      headerName: "Numero de téléphone",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Compte active?",
      flex: 1,
    },
    {
      field: "is_new",
      headerName: "Nouveau compte?",
      flex: 1,
      valueGetter: (params) => {
        return params.row.is_new ? "NOUVEAUX" : "";
      },
      cellClassName: (params) =>
        params.field === "is_new" && params.row.is_new ? "red-cell" : "",
    },

    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          className="btn-access"
          style={{
            backgroundColor: colors.greenAccent[700],
            // color: params.row.is_new ? "#e2726e" : "inherit",
          }}
          onClick={() =>
            handleButtonClick(
              params.row.id,
              params.row.active,
              params.row.email
            )
          }
        >
          {params.row.btn}
        </button>
      ),
    },
  ];

  return (
    <Box m="20px">
      <Header title="CLIENTS" subtitle="Liste des clients" />
      <Box
        m="40px 0 0 0"
        height="65vh"
        sx={{
          "& .MuiDataGrid-root": {
            border: "none",
          },
          "& .MuiDataGrid-cell": {
            borderBottom: "none",
          },
          "& .name-column--cell": {
            color: colors.greenAccent[300],
          },
          "& .MuiDataGrid-columnHeaders": {
            backgroundColor: colors.blueAccent[700],
            borderBottom: "none",
          },
          "& .MuiDataGrid-virtualScroller": {
            backgroundColor: colors.primary[400],
          },
          "& .MuiDataGrid-footerContainer": {
            borderTop: "none",
            backgroundColor: colors.blueAccent[700],
          },
          "& .MuiCheckbox-root": {
            color: `${colors.greenAccent[200]} !important`,
          },
          "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
            color: `${colors.grey[100]} !important`,
          },
        }}
      >
        <DataGrid
          rows={updatedData}
          columns={columns}
          components={{ Toolbar: GridToolbar }}
          getRowId={(row) => row.id}
          getRowClassName={(params) => "clickable-row"}
          onRowClick={(row) => handleRowClick(row.id)}
        />
      </Box>
    </Box>
  );
};

export default Contacts;
