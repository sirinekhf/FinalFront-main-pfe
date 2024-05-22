import { useState } from "react";
//import { ColorModeContext, useMode } from "./admin/theme";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { ColorModeContext, useMode } from "./admin/theme";

import Topbar from "./admin/pages/global/Topbar";
import Sidebar from "./admin/pages/global/Sidebar";
import Dashboard from "./admin/pages/dashboard";
import Team from "./admin/pages/team";
import Contacts from "./admin/pages/contacts";
import Invoices from "./admin/pages/invoices";
import Form from "./admin/pages/form";
import Calendar from "./admin/pages/calendar";
import FAQ from "./admin/pages/faq";
import ItemDetails from "./admin/pages/productDetails";
import CommandeDetails from "./admin/pages/commandeDetails";
import ProductList from "./admin/pages/try/index2";
import { products } from "./admin/data/mockData";
import CAProducts from "./admin/pages/statistiques/CAproducts";
import CACategories from "./admin/pages/statistiques/CAcategories";
import Pie from "./admin/pages/statistiques/pie";
import TopClients from "./admin/pages/statistiques/topClients";
import TopProducts from "./admin/pages/statistiques/topProducts";
import BarresHorizontales from "./admin/pages/statistiques/barresHorizontales";
import BarresVerticales from "./admin/pages/statistiques/barresVerticales";
import CmdRegion from "./admin/pages/statistiques/cmdRegion";

import "bootstrap/dist/css/bootstrap.min.css";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";
import Forbid from "./Forbid";
import UserDetails from "./admin/pages/UserDetails/UserDetails";
import Settings from "./admin/pages/Parametres/Settings";

// AdminInterface.js
function AdminInterface() {
  const [theme, colorMode] = useMode();
  const [isSidebar, setIsSidebar] = useState(true);
  const { user } = useContext(AuthContext);
  if (!user || (user.type != "comercial" && user.type !== "admin")) {
    return <Forbid />;
  }
  return (
    <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <div className="app">
          <Sidebar isSidebar={isSidebar} />
          <main className="content">
            <Topbar setIsSidebar={setIsSidebar} />
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/team" element={<Team />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/contacts" element={<Contacts />} />
              <Route path="/invoices" element={<Invoices />} />
              <Route path="/form" element={<Form />} />
              <Route path="/calendar" element={<Calendar />} />
              <Route path="/faq" element={<FAQ />} />
              <Route path="/productDetails/:id" element={<ItemDetails />} />
              <Route
                path="/productList"
                element={<ProductList products={products} />}
              />
              <Route path="/CAproducts" element={<CAProducts />} />
              <Route path="/CAcategories" element={<CACategories />} />
              <Route path="/pieChart" element={<Pie />} />
              <Route path="/topClients" element={<TopClients />} />
              <Route path="/topProducts" element={<TopProducts />} />
              <Route
                path="/barresHorizontales"
                element={<BarresHorizontales />}
              />
              <Route path="/barresVerticales" element={<BarresVerticales />} />
              <Route path="/cmdRegion" element={<CmdRegion />} />
              {/* <Route path="/productDetails" element={<ProductDetails />} /> */}
              {/* <Route path="/commandeDetails" element={<CommandeDetails />} /> */}
              <Route
                path="/commandeDetails/:id"
                element={<CommandeDetails />}
              />
              <Route path="/userDetails/:id" element={<UserDetails />} />
            </Routes>
          </main>
        </div>
      </ThemeProvider>
    </ColorModeContext.Provider>
  );
}
export default AdminInterface;
