import { Box } from "@mui/material";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import { useTheme } from "@mui/material";
import { tokens } from "../../theme";
import axios from "axios";
import { useEffect } from "react";

const CmdRegion = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [cmdRegion, setCmdRegion] = useState([]);
  const [firstRender, setFirstRender] = useState("");
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
          `http://localhost:8000/ML/statistiques/getCmdByRegion/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setCmdRegion(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [firstRender]);
  const handleSend = (dateDeb, dateFin) => {
    if (dateDeb && dateFin) {
      axios
        .get(
          `http://localhost:8000/ML/statistiques/CAbyProduct/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setCmdRegion(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <>
      {!isDashboard ? (
        <Box m="20px">
          <Header
            title="Nombre de commandes en fonction des catégories"
            subtitle="Pour chaque regions"
          />
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
              InputLabelProps={{
                shrink: true,
              }}
              onChange={(e) => setDateFin(e.target.value)}
            />
            <Button
              type="submit"
              sx={{ p: 1 }}
              variant="contained"
              onClick={() => handleSend(dateDeb, dateFin)}
            >
              <SendIcon />
            </Button>
          </Box>

          <Box height="75vh">
            {cmdRegion?.length > 0 ? (
              <LineChart data={cmdRegion} />
            ) : (
              <p>No Data</p>
            )}
          </Box>
        </Box>
      ) : (
        <>
          {cmdRegion?.length > 0 ? (
            <LineChart isDashboard={isDashboard} data={cmdRegion} />
          ) : (
            <p>No Data</p>
          )}
        </>
      )}
    </>
  );
};

export default CmdRegion;
