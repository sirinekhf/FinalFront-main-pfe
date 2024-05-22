import React from "react";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import TopProducts from "./topProducts";
import TopClients from "./topClients";
import TopCategories from "./topCategories";
/**for the Tabs */
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
const BarresHorizontales = () => {
  /**for the Tabs */
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  /** */
  return (
    <>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          sx={{ padding: "0 8%" }}
          value={value}
          onChange={handleChange}
          // indicatorColor="#4cceac"
          // textColor={colors.greenAccent[500]}
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="Top Produits" {...a11yProps(0)} />
          <Tab label="Top Clients" {...a11yProps(1)} />
          <Tab label="Top Catégories" {...a11yProps(2)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <TopProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <TopClients />
      </TabPanel>
      <TabPanel value={value} index={2}>
        <TopCategories />
      </TabPanel>
    </>
  );
};
export default BarresHorizontales;
