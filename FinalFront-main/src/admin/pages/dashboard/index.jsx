import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { tokens } from "../../theme";

import { CA_products, topClients } from "../../data/mockData";
import DownloadOutlinedIcon from "@mui/icons-material/DownloadOutlined";
import EmailIcon from "@mui/icons-material/Email";
import PointOfSaleIcon from "@mui/icons-material/PointOfSale";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import GroupIcon from "@mui/icons-material/Group";
import PersonIcon from "@mui/icons-material/Person";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import ViewListRoundedIcon from "@mui/icons-material/ViewListRounded";
import Header from "../../components/Header";
import LineChart from "../../components/LineChart";
import VerticalBarCategories from "../../components/VerticalBarCategories";
import StatBox from "../../components/StatBox";
import ProgressCircle from "../../components/ProgressCircle";
import HorizontalBarClients from "../../components/HorizontalBarClients";
import Pie from "../statistiques/pie";
import axios from "axios";
import { mockLineData } from "../../data/mockData";
import CmdRegion from "../statistiques/cmdRegion";
const Dashboard = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [total_revenue, setTotal_revenue] = useState({});
  const [nbr_cmd, setNbr_cmd] = useState({});
  const [nbr_new_clients, setnbr_new_clients] = useState({});
  const [CA_categories, setCA_Categories] = useState([]);
  const [topClient, setTopClients] = useState([]);

  const [topProducts, setTopProducts] = useState([]);
  const [dateDeb, setDateDeb] = useState("");
  const [dateFin, setDateFin] = useState("");
  const [firstRender, setFirstRender] = useState("");
  const [nbr_new_visitors, setnbr_new_visitors] = useState([]);
  const [pourcentage_groupes, setPourcentage_groupes] = useState("");

  const formatDate = (date) => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    return `${day}-${month}-${year}`;
  };

  useEffect(() => {
    axios
      .get(`http://localhost:8000/ML/statistiques/getNbrNewClientsWeek`)
      .then((response) => {
        setnbr_new_clients(response.data[0]);
      })
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8000/ML/statistiques/getTotalRevenueToday`)
      .then((response) => setTotal_revenue(response.data[0]))
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8000/ML/statistiques/getNbrCmdToday`)
      .then((response) => setNbr_cmd(response.data[0]))
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8000/ML/statistiques/getPourcentageClientsGroupes`)
      .then((response) => setPourcentage_groupes(response.data))
      .catch((error) => console.log(error));
    axios
      .get(`http://localhost:8000/ML/statistiques/getNbrNewVisitors`)
      .then((response) => {
        setnbr_new_visitors(response.data);
      })
      .catch((error) => console.log(error));
  }, []);

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
          `http://localhost:8000/ML/statistiques/CAbyCategory/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setCA_Categories(response.data);
        })
        .catch((error) => console.log(error));

      axios
        .get(
          `http://localhost:8000/ML/statistiques/getTopClients/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setTopClients(response.data);
        })
        .catch((error) => console.log(error.error));

      axios
        .get(
          `http://localhost:8000/ML/statistiques/getTopProducts/${dateDeb}/${dateFin}`
        )
        .then((response) => {
          setTopProducts(response.data);
        })
        .catch((error) => console.log(error.error));
    }
  }, [firstRender]);

  const DescriptionBox = ({ children, description, myX, myY }) => {
    const [descriptionPosition, setDescriptionPosition] = useState({
      x: 0,
      y: 0,
    });

    const handleMouseMove = (event) => {
      setDescriptionPosition({ x: event.clientX, y: event.clientY });
    };

    // background: hsla(165, 57%, 82%, 1);

    // background: linear-gradient(
    //   to right,
    //   hsla(165, 57%, 82%, 1) 0%,
    //   hsla(2, 67%, 92%, 1) 50%,
    //   hsla(237, 94%, 88%, 1) 100%
    // );

    // background: -moz-linear-gradient(
    //   to right,
    //   hsla(165, 57%, 82%, 1) 0%,
    //   hsla(2, 67%, 92%, 1) 50%,
    //   hsla(237, 94%, 88%, 1) 100%
    // );

    // background: -webkit-linear-gradient(
    //   to right,
    //   hsla(165, 57%, 82%, 1) 0%,
    //   hsla(2, 67%, 92%, 1) 50%,
    //   hsla(237, 94%, 88%, 1) 100%
    // );

    return (
      <Box
        gridColumn="span 3"
        backgroundColor={colors.primary[400]}
        display="flex"
        alignItems="center"
        justifyContent="center"
        sx={{
          position: "relative",
          "&:hover::after": {
            content: `'${description}'`,
            position: "absolute",
            bottom: "100%",
            left: "50%",
            transform: "translateX(-50%)",
            width: "200px",
            height: "fit-content",
            padding: "8px",
            backgroundColor: "white",
            color: colors.blueAccent[400],
            borderRadius: "3px",
            fontSize: "14px",
            textAlign: "center",
            top: descriptionPosition.y - myY, // Offset the box position from the mouse
            left: descriptionPosition.x - myX,
            zIndex: 99,
          },
        }}
        onMouseMove={handleMouseMove}
      >
        {children}
      </Box>
    );
  };

  return (
    <Box m="20px">
      {/* HEADER */}
      <Box display="flex" justifyContent="space-between" alignItems="center">
        <Header
          title="TABLEAU DE BORD"
          subtitle="Bienvenue sur votre tableau de bord"
        />
      </Box>

      {/* ************************************ Grid ************************************ */}
      <Box
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="140px"
        gap="20px"
      >
        {/* ************************************ ligne 1 *************************************/}

        <DescriptionBox
          description="Revenu total pour aujourd&rsquo;hui"
          myX={280}
          myY={250}
        >
          <StatBox
            title={total_revenue.total_revenue_today}
            subtitle="Revenu Total"
            progress={total_revenue.progress}
            //increase={"+" + total_revenue.progress * 100 + "%"}
            increase={
              total_revenue.progress < 0
                ? total_revenue.progress * 100 + "%"
                : "+" + total_revenue.progress * 100 + "%"
            }
            icon={
              <PointOfSaleIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </DescriptionBox>

        <DescriptionBox
          description="Nombre de nouvelles commandes aujourd&rsquo;hui"
          myX={570}
          myY={250}
        >
          <StatBox
            title={nbr_cmd.nbr_cmd_today}
            subtitle="Commandes Reçues"
            progress={nbr_cmd.progress}
            increase={
              nbr_cmd.progress < 0
                ? nbr_cmd.progress * 100 + "%"
                : "+" + nbr_cmd.progress * 100 + "%"
            }
            icon={
              <ViewListRoundedIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </DescriptionBox>
        <DescriptionBox
          description="Nombre de nouveaux clients cette semaine"
          myX={870}
          myY={250}
        >
          <StatBox
            title={nbr_new_clients.nbr_new_clients_this_week}
            subtitle="Nouveaux Clients"
            progress={nbr_new_clients.progress}
            increase={
              nbr_new_clients.progress < 0
                ? Number(nbr_new_clients.progress).toFixed(2) * 100 + "%"
                : "+" + Number(nbr_new_clients.progress).toFixed(2) * 100 + "%"
            }
            icon={
              <PersonAddIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </DescriptionBox>
        <DescriptionBox
          description="Nombre de visiteurs du site"
          myX={1160}
          myY={250}
        >
          <StatBox
            isVisit={true}
            title={nbr_new_visitors}
            subtitle="Visiteurs"
            icon={
              <TravelExploreIcon
                sx={{ color: colors.greenAccent[600], fontSize: "26px" }}
              />
            }
          />
        </DescriptionBox>

        {/* ************************************ ligne 2 ************************************ */}
        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Box
            mt="25px"
            p="0 30px"
            display="flex "
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Typography
                variant="h5"
                fontWeight="600"
                color={colors.grey[100]}
              >
                Nombre de commandes par jour
              </Typography>
            </Box>
            <Box></Box>
          </Box>
          <a href="comercial/cmdRegion">
            <Box height="250px" m="-20px 0 0 0">
              <CmdRegion isDashboard={true} />
            </Box>
          </a>
        </Box>

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            État de commandes
          </Typography>{" "}
          <a href="comercial/pieChart">
            <Box
              height="300px"
              mt="-20px"
              paddingRight="0px"
              mr="-20px"
              ml="-20px"
              mb="-10px"
            >
              <Pie isDashboard={true} />
            </Box>
          </a>
        </Box>
        {/* ******************************************** ligne 3 */}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
          p="30px"
        >
          <Typography variant="h5" fontWeight="600">
            Types de clients :
          </Typography>
          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            mt="25px"
          >
            <ProgressCircle size="125" progress={pourcentage_groupes / 100} />
            <br></br>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <GroupIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "30px",
                  mr: "20px",
                }}
              />
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600], mr: "7px" }}
              >
                {Number(pourcentage_groupes).toFixed(2)}%
              </Typography>
              <Typography variant="h5">groupes</Typography>
            </Typography>
            <Typography style={{ display: "flex", alignItems: "center" }}>
              <PersonIcon
                sx={{
                  color: colors.greenAccent[600],
                  fontSize: "30px",
                  mr: "10px",
                }}
              />
              <Typography
                variant="h5"
                fontStyle="italic"
                sx={{ color: colors.greenAccent[600], mr: "7px" }}
              >
                {100 - Number(pourcentage_groupes).toFixed(2)}%
              </Typography>

              <Typography variant="h5">particuliers</Typography>
            </Typography>
          </Box>
        </Box>
        {/*Graphique à barres verticales * *********************************************/}
        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Chiffre d'affaires par produit/catégorie
          </Typography>{" "}
          <a href="comercial/barresVerticales">
            <Box
              height="250px"
              mt="-20px"
              paddingRight="0px"
              mr="-80px"
              ml="-50px"
            >
              <VerticalBarCategories isDashboard={true} data={CA_categories} />
            </Box>
          </a>
        </Box>
        {/*Graphique à barres horizontales * *********************************************/}

        <Box
          gridColumn="span 4"
          gridRow="span 2"
          backgroundColor={colors.primary[400]}
        >
          <Typography
            variant="h5"
            fontWeight="600"
            sx={{ padding: "30px 30px 0 30px" }}
          >
            Top 10
          </Typography>{" "}
          <a href="comercial/barresHorizontales">
            <Box
              height="250px"
              mt="-20px"
              paddingRight="0px"
              mr="-80px"
              ml="-50px"
            >
              <HorizontalBarClients isDashboard={true} data={topClient} />
            </Box>
          </a>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
