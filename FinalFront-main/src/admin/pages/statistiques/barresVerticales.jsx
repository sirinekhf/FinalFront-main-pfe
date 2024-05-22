import React from "react";

import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import CAProducts from "./CAproducts";
import CACategories from "./CAcategories";

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
const BarresVerticales = () => {
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
          textColor="secondary"
          indicatorColor="secondary"
        >
          <Tab label="CA par produits" {...a11yProps(0)} />
          <Tab label="CA par catégories" {...a11yProps(1)} />
        </Tabs>
      </Box>
      <TabPanel value={value} index={0}>
        <CAProducts />
      </TabPanel>
      <TabPanel value={value} index={1}>
        <CACategories />
      </TabPanel>
    </>
  );
};
export default BarresVerticales;
