import { Box, Typography, useTheme } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataInvoices } from "../../data/mockData";
import AdminPanelSettingsOutlinedIcon from "@mui/icons-material/AdminPanelSettingsOutlined";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenOutlined";
import SecurityOutlinedIcon from "@mui/icons-material/SecurityOutlined";
import Header from "../../components/Header";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { CallMadeRounded } from "@mui/icons-material";

const Invoices = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  const [cmd, setCmd] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/orders/getallcmd")
      .then((response) => setCmd(response.data))
      .catch((error) => console.log(error));
  }, []);

  const navigate = useNavigate();
  const handleRowClick = (id) => {
    // const commande = cmd.find((item) => item.id === id);
    navigate(`/comercial/commandeDetails/${id}`);
  };
  const columns = [
    { field: "name", headerName: "N° de devis" },
    {
      field: "user_partner",
      headerName: "Client",
      flex: 1,
      cellClassName: "name-column--cell",
      valueGetter: (params) => params.row.user_partner.name,
    },

    {
      field: "phone",
      headerName: "Numero du téléphone",
      flex: 1,
      valueGetter: (params) => params.row.user_partner.phone,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
      valueGetter: (params) => params.row.user_partner.email,
    },
    {
      field: "amount_total",
      headerName: "Total",
      flex: 1,
      // renderCell: (params) => {
      //   return (
      //     <Typography color={colors.greenAccent[500]} sx={{ ml: "5px" }}>
      //       $
      //     </Typography>
      //   );
      // },
    },
    {
      field: "create_date",
      headerName: "Date",
      flex: 1,
    },
    {
      field: "state",
      headerName: "État",
      flex: 1,
    },
  ];

  return (
    <Box m="20px">
      <Header title="COMMANDES" subtitle="liste des commandes" />

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
          rows={cmd}
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

export default Invoices;
