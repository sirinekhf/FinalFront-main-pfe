import AdminInterface from "./AdminInterface";
import ClientInterface from "./ClientInterface";
import React from "react";
import { AuthProvider } from "./Context/AuthProvider";
import { Routes, Route } from "react-router-dom";

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/comercial/*" element={<AdminInterface />} />
        <Route path="/*" element={<ClientInterface />} />
      </Routes>
    </AuthProvider>
  );
}
export default App;
