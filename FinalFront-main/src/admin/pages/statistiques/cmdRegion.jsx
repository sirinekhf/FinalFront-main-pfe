import { Box, Typography } from "@mui/material";
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
import { FcDeleteDatabase } from "react-icons/fc";

const CmdRegion = ({ isDashboard = false }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [dateDeb2, setDateDeb2] = useState("");
  const [dateFin2, setDateFin2] = useState("");
  const [cmdRegion, setCmdRegion] = useState([]);
  const [bool, setBool] = useState(true);
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
    if (bool) {
      setDateDeb(formatDate(firstDayOfMonth));
      setDateFin(formatDate(lastDayOfMonth));
      dateDeb &&
        axios
          .get(
            `http://localhost:8000/ML/statistiques/getCmdByRegion/${dateDeb}/${dateFin}`
          )
          .then((response) => {
            setCmdRegion(response.data);
          })
          .catch((error) => console.log(error));
    }
  }, [dateDeb]);
  const handleSend = (dateDeb2, dateFin2) => {
    axios
      .get(
        `http://localhost:8000/ML/statistiques/getCmdByRegion/${dateDeb2}/${dateFin2}`
      )
      .then((response) => {
        setCmdRegion(response.data);
        console.log(dateDeb2, dateFin2);
      })
      .catch((error) => console.log(error));
  };
  return (
    <>
      {!isDashboard ? (
        <Box m="20px">
          <Header
            title="Nombre de commandes par jour"
            subtitle="Ce graphique présente l'évolution de nombre de commandes par région au fil des jours."
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
              onChange={(e) => {
                setBool(false);
                const rawDate = e.target.value;
                const dateObj = new Date(rawDate);
                const formattedDate = dateObj
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, "-");

                setDateDeb2(formattedDate);
              }}
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
              onChange={(e) => {
                setBool(false);
                const rawDate = e.target.value;
                const dateObj = new Date(rawDate);
                const formattedDate = dateObj
                  .toLocaleDateString("en-GB", {
                    day: "2-digit",
                    month: "2-digit",
                    year: "numeric",
                  })
                  .replace(/\//g, "-");
                setDateFin2(formattedDate);
                console.log(formattedDate);
              }}
            />
            <Button
              type="submit"
              sx={{ p: 1 }}
              variant="contained"
              color="secondary"
              onClick={() => handleSend(dateDeb2, dateFin2)}
            >
              <SendIcon />
            </Button>
          </Box>

          <Box height="75vh">
            {cmdRegion?.length > 0 ? (
              <LineChart data={cmdRegion} />
            ) : (
              <Box
                sx={{
                  mt: "25%",
                  textAlign: "center",
                }}
              >
                {/* <FcDeleteDatabase
                  style={{ color: colors.greenAccent[600], fontSize: "56px" }}
                /> */}
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
          {cmdRegion?.length > 0 ? (
            <LineChart isDashboard={isDashboard} data={cmdRegion} />
          ) : (
            <Box
              sx={{
                mt: "14%",
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

export default CmdRegion;
