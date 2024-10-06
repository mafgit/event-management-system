import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../App";
import Footer from "./Footer";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth ? (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
