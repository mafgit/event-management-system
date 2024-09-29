import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { AuthContext } from "../App";

const AdminRoute = ({ children }) => {
  const { admin } = useContext(AuthContext);

  return admin ? (
    <div>
      <AdminNavbar />
      {children}
    </div>
  ) : (
    <Navigate to="/" />
  );
};

export default AdminRoute;
