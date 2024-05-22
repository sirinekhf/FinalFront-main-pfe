import { useContext, useState } from "react";
import { ProSidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Box, IconButton, Typography, useTheme } from "@mui/material";
import { tokens } from "../../theme";
import "react-pro-sidebar/dist/css/styles.css";
import { Link } from "react-router-dom";
import HomeOutlinedIcon from "@mui/icons-material/HomeOutlined";
import PeopleOutlinedIcon from "@mui/icons-material/PeopleOutlined";
import ContactsOutlinedIcon from "@mui/icons-material/ContactsOutlined";
import ReceiptOutlinedIcon from "@mui/icons-material/ReceiptOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import CalendarTodayOutlinedIcon from "@mui/icons-material/CalendarTodayOutlined";
import HelpOutlineOutlinedIcon from "@mui/icons-material/HelpOutlineOutlined";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import PieChartOutlineOutlinedIcon from "@mui/icons-material/PieChartOutlineOutlined";
import TimelineOutlinedIcon from "@mui/icons-material/TimelineOutlined";
import MenuOutlinedIcon from "@mui/icons-material/MenuOutlined";
import MapOutlinedIcon from "@mui/icons-material/MapOutlined";
import { AuthContext } from "../../../Context/AuthContext";
import { Person } from "react-bootstrap-icons";

const Item = ({ title, to, icon, selected, setSelected }) => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);

  return (
    <MenuItem
      active={selected === title}
      style={{
        color: colors.grey[100],
      }}
      onClick={() => setSelected(title)}
      icon={icon}
    >
      <Typography>{title}</Typography>
      <Link to={to} />
    </MenuItem>
  );
};

const Sidebar = () => {
  const theme = useTheme();
  const colors = tokens(theme.palette.mode);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [selected, setSelected] = useState("Dashboard");
  const { user } = useContext(AuthContext);
  return (
    <Box
      size="100%"
      sx={{
        "& .pro-sidebar-inner": {
          background: `${colors.primary[400]} !important`,
        },
        "& .pro-icon-wrapper": {
          backgroundColor: "transparent !important",
        },
        "& .pro-inner-item": {
          padding: "5px 35px 5px 20px !important",
        },
        "& .pro-inner-item:hover": {
          color: "#868dfb !important",
        },
        "& .pro-menu-item.active": {
          color: "#6870fa !important",
        },
      }}
    >
      <ProSidebar collapsed={isCollapsed} style={{ zIndex: 0 }}>
        <Menu iconShape="square">
          {/* logo + menu icon */}
          <MenuItem
            onClick={() => setIsCollapsed(!isCollapsed)}
            icon={isCollapsed ? <MenuOutlinedIcon /> : undefined}
            style={{
              margin: "10px 0 20px 0",
              color: colors.grey[100],
            }}
          >
            {!isCollapsed && (
              <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
                ml="15px"
              >
                <Typography variant="h3" color={colors.grey[100]}>
                  GRUPOPUMA
                </Typography>
                {/* {" "}
                <img
                  alt="logo"
                  width="40%"
                  height="auto"
                  src={require(`../../assets/puma.png`)}
                  style={{ marginLeft: "25px" }}
                /> */}
                <IconButton onClick={() => setIsCollapsed(!isCollapsed)}>
                  <MenuOutlinedIcon />
                </IconButton>
              </Box>
            )}
          </MenuItem>
          {/* photo + user description */}
          {!isCollapsed && (
            <Box mb="25px">
              <Box display="flex" justifyContent="center" alignItems="center">
                <img
                  alt="profile-user"
                  width="100px"
                  height="100px"
                  src={require(`../../assets/profil.png`)}
                  style={{ cursor: "pointer", borderRadius: "50%" }}
                />
                {/* <Person
                  style={{
                    height: "100px",
                    width: "auto",
                    color: colors.greenAccent[600],
                  }}
                /> */}
              </Box>
              <Box textAlign="center">
                <Typography
                  variant="h4"
                  color={colors.greenAccent[600]}
                  fontWeight="bold"
                  sx={{ m: "10px 0 0 0" }}
                >
                  {user?.username}
                </Typography>
                <Typography variant="h5" color={colors.blueAccent[400]}>
                  {user?.type}
                </Typography>
              </Box>
            </Box>
          )}

          <Box paddingLeft={isCollapsed ? undefined : "10%"}>
            {user.type === "admin" ? (
              <>
                <Item
                  title="Gestion d'équipe"
                  to="/comercial/team"
                  icon={<PeopleOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion des clients"
                  to="/comercial/contacts"
                  icon={<ContactsOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : null}

            {user.type === "comercial" ? (
              <>
                <Item
                  title="Accueil"
                  to="/comercial"
                  icon={<HomeOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
                <Item
                  title="Gestion des commandes"
                  to="/comercial/invoices"
                  icon={<ReceiptOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                />
              </>
            ) : null}
            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Ventes
            </Typography> */}
            {/* <Item
                  title="Liste des produits"
                  to="/comercial/productList"
                  icon={<HelpOutlineOutlinedIcon />}
                  selected={selected}
                  setSelected={setSelected}
                /> */}

            {/* <>
              <Typography
                variant="h6"
                color={colors.grey[300]}
                sx={{ m: "15px 0 5px 20px" }}
              >
                {" "}
                Pages
              </Typography>
              <Item
                title="Profile Form"
                to="/comercial/form"
                icon={<PersonOutlinedIcon />}
                selected={selected}
                setSelected={setSelected}
              />
            </> */}

            {/* <Item
              title="Calendrier"
              to="/comercial/calendar"
              icon={<CalendarTodayOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="FAQ Page"
              to="/comercial/faq"
              icon={<HelpOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}

            {/* <Typography
              variant="h6"
              color={colors.grey[300]}
              sx={{ m: "15px 0 5px 20px" }}
            >
              Statistiques
            </Typography>
            <Item
              title="Graphique à barres"
              to="/comercial/productDetails"
              icon={<BarChartOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="graphique en secteurs"
              to="/comercial/pie"
              icon={<PieChartOutlineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Graphique linéaire"
              to="/comercial/line"
              icon={<TimelineOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            />
            <Item
              title="Carte géographique"
              to="/comercial/geography"
              icon={<MapOutlinedIcon />}
              selected={selected}
              setSelected={setSelected}
            /> */}
          </Box>
        </Menu>
      </ProSidebar>
    </Box>
  );
};
export default Sidebar;
