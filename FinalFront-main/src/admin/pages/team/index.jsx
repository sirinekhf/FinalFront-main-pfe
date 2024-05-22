import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { useEffect, useState } from "react";
import axios from "axios";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import "./style.css";
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
              console.log(response.data);
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
const Team = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [data, setData] = useState([]);
  const [active, setActive] = useState("");
  useEffect(() => {
    axios
      .get("http://localhost:8000/users/comerciaux")
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
  }, []);
  // const handleButtonClick = (id, active, name) => {
  //   let variable = active === "active" ? "désactiver" : "activer";
  //   alert(`Voulez-vous vraiment ${variable} le compte de ${name}`);
  //   axios
  //     .patch(`http://localhost:8000/users/changeaccess/${id}`)
  //     .then((response) => window.location.reload())
  //     .catch((error) => console.log(error));
  // };
  const updatedData = data.map((row) => ({
    ...row,
    type: row.is_comercial ? "comercial" : "admin",
    active: row.is_active ? "active" : "désactivé",
    btn: row.is_active ? "Désactiver " : "Activer",
  }));
  const columns = [
    { field: "id", headerName: "ID" },
    {
      field: "email",
      headerName: "Username",
      flex: 1,
    },
    {
      field: "date_joined",
      headerName: "Date de création ",
      flex: 1,
    },
    {
      field: "active",
      headerName: "Etat",
      flex: 1,
    },
    {
      field: "actions",
      headerName: "Actions",
      flex: 1,
      renderCell: (params) => (
        <button
          className="btn-access"
          style={{ backgroundColor: colors.greenAccent[700] }}
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

    {
      field: "accessLevel",
      headerName: "Accès",
      flex: 1,
      renderCell: ({ row: { type } }) => {
        return (
          <Box
            width="70%"
            m="0 auto"
            p="5px"
            display="flex"
            justifyContent="center"
            backgroundColor={
              type === "admin"
                ? colors.greenAccent[600]
                : type === "comercial"
                ? colors.greenAccent[700]
                : colors.greenAccent[700]
            }
            borderRadius="4px"
          >
            {type === "admin" && <AdminPanelSettingsOutlinedIcon />}
            {type === "comercial" && <SecurityOutlinedIcon />}
            {type === "another" && <LockOpenOutlinedIcon />}
            <Typography color={colors.grey[100]} sx={{ ml: "5px" }}>
              {type}
            </Typography>
          </Box>
        );
      },
    },
  ];

  return (
    <Box m="20px">
      <Header title="L'ÉQUIPE" subtitle="Gérer les membres de l'équipe" />
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
        }}
      >
        <DataGrid rows={updatedData} columns={columns} />
      </Box>
    </Box>
  );
};

export default Team;
