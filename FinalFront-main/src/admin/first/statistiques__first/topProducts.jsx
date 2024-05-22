import Header from "../../components/Header";
import { Box, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import SendIcon from "@mui/icons-material/Send";
import { topProducts as data } from "../../data/mockData";
import HorizontalBarProducts from "../../components/HorizontalBarProducts";
import { useEffect, useState } from "react";
import axios from "axios";

const maxTotal = Math.max(...data.map((item) => item.total));

const TopProducts = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [products, setProducts] = useState([]);
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
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
          `http://localhost:8000/ML/statistiques/getTopProducts/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    }
  }, [firstRender]);
  const handleSend = (dateDeb, dateFin) => {
    if (dateDeb && dateFin) {
      axios
        .get(
          `http://localhost:8000/ML/statistiques/getTopProducts/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setProducts(response.data);
        })
        .catch((error) => console.log(error));
    }
  };
  return (
    <Box m="20px">
      <Header
        title="Les 10 produits les plus rentables"
        subtitle="Ce graphique illustre les dix produits les plus rentables en fonction de leurs chiffres d'affaires dans une période donnée."
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
        {/* <BarChart maxTotal={maxTotal} /> */}
        <HorizontalBarProducts data={products} />
      </Box>
    </Box>
  );
};

export default TopProducts;
