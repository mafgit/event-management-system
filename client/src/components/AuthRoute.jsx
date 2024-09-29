import { useState } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../App";

const AdminRoute = ({ children }) => {
  const { auth } = useContext(AuthContext);

  return auth ? (
    <div>
      <Navbar />
      {children}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
