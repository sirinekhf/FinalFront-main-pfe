import { Box, IconButton, useTheme } from "@mui/material";
import { useContext } from "react";
import { ColorModeContext, tokens } from "../../theme";
import InputBase from "@mui/material/InputBase";
import LightModeOutlinedIcon from "@mui/icons-material/LightModeOutlined";
import DarkModeOutlinedIcon from "@mui/icons-material/DarkModeOutlined";
import NotificationsOutlinedIcon from "@mui/icons-material/NotificationsOutlined";
import SettingsOutlinedIcon from "@mui/icons-material/SettingsOutlined";
import PersonOutlinedIcon from "@mui/icons-material/PersonOutlined";
import SearchIcon from "@mui/icons-material/Search";
import { Logout } from "@mui/icons-material";
import { AuthContext } from "../../../Context/AuthContext";
import { useNavigate } from "react-router-dom";

const Topbar = () => {
  const theme = useTheme();
  const { user } = useContext(AuthContext);
  const colorMode = useContext(ColorModeContext);
  const { logoutUser } = useContext(AuthContext);
  const navigate = useNavigate();
  return (
    <Box display="flex" justifyContent="flex-end" p={2}>
      {/* SEARCH BAR */}
      {/* <Box
        display="flex"
        backgroundColor={colors.primary[400]}
        borderRadius="3px"
      >
        <InputBase sx={{ ml: 2, flex: 1 }} placeholder="Rechercher..." />
        <IconButton type="button" sx={{ p: 1 }}>
          <SearchIcon />
        </IconButton>
      </Box> */}

      {/* ICONS */}
      <Box display="flex">
        <IconButton onClick={colorMode.toggleColorMode}>
          {theme.palette.mode === "dark" ? (
            <DarkModeOutlinedIcon />
          ) : (
            <LightModeOutlinedIcon />
          )}
        </IconButton>
        {user.type === " admin" ? (
          <IconButton>
            <SettingsOutlinedIcon onClick={() => navigate("settings")} />
          </IconButton>
        ) : null}

        <IconButton onClick={logoutUser}>
          <Logout />
        </IconButton>
      </Box>
    </Box>
  );
};

export default Topbar;
