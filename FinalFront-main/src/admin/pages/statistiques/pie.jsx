import { Box, Typography } from "@mui/material";
import Header from "../../components/Header";
import PieChart from "../../components/PieChart";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { useEffect } from "react";

import { FcDeleteDatabase } from "react-icons/fc";

const Pie = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [firstRender, setFirstRender] = useState("");
  const [data, setData] = useState([]);
  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };
  useEffect(() => {
    const today = new Date(); // Get current date
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1); // Set the first day of the current month
    const lastDayOfMonth = new Date(
      today.getFullYear(),
      today.getMonth() + 1,
      0
    );
    setDateDeb(formatDate(firstDayOfMonth));
    setDateFin(formatDate(lastDayOfMonth));
    setFirstRender(dateDeb ? true : false);
    if (firstRender) {
      axios
        .get(
          `http://localhost:8000/ML/statistiques/CmdbyState/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setData(response.data);
        })
        .catch((error) => console.log(error.error));
    }
  }, [firstRender]);
  const handleClick = (dateDeb, dateFin) => {
    axios
      .get(
        `http://localhost:8000/ML/statistiques/CmdbyState/${dateDeb}/${dateFin}`
      )
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error.error));
  };
  return (
    <>
      {!isDashboard ? (
        <Box m="20px">
          <Header title="Nombre de commandes pour chaque état" />
          <Box
            display="flex"
            backgroundColor={colors.primary[400]}
            borderRadius="3px"
          >
            <TextField
              sx={{
                flex: 1,
                borderRadius: "3px",
                border: "none",
              }}
              label="Date Début"
              type="date"
              InputLabelProps={{
                shrink: true,
              }}
              name="dateDeb"
              onChange={(e) => setDateDeb(e.target.value)}
            />
            <TextField
              sx={{
                ml: 2,
                flex: 1,
                borderRadius: "3px",
                border: "none",
              }}
              label="Date Fin"
              type="date"
              name="dateFin"
              onChange={(e) => setDateFin(e.target.value)}
              InputLabelProps={{
                shrink: true,
              }}
            />
            <Button
              type="submit"
              sx={{ p: 1 }}
              variant="contained"
              color="secondary"
              onClick={() => handleClick(dateDeb, dateFin)}
            >
              <SendIcon />
            </Button>
          </Box>

          <Box height="75vh">
            {data?.length > 0 ? (
              <PieChart data={data} />
            ) : (
              <Box
                sx={{
                  mt: "25%",
                  textAlign: "center",
                }}
              >
                <FcDeleteDatabase
                  style={{ color: colors.greenAccent[600], fontSize: "56px" }}
                />
                <Typography
                  variant="h6"
                  sx={{
                    color: "red",
                    fontWeight: "bold",
                    textAlign: "center",
                    textDecoration: "none",
                  }}
                >
                  Aucune donnée trouvée
                </Typography>
              </Box>
            )}
          </Box>
        </Box>
      ) : (
        <>
          {data?.length > 0 ? (
            <PieChart isDashboard={isDashboard} data={data} />
          ) : (
            <Box
              sx={{
                mt: "25%",
                textAlign: "center",
              }}
            >
              <FcDeleteDatabase
                style={{ color: colors.greenAccent[600], fontSize: "56px" }}
              />
              <Typography
                variant="h6"
                sx={{
                  color: "red",
                  fontWeight: "bold",
                  textAlign: "center",
                  textDecoration: "none",
                }}
              >
                Aucune donnée trouvée
              </Typography>
            </Box>
          )}
        </>
      )}
    </>
  );
};

export default Pie;
