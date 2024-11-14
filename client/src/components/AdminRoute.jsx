import { useContext, useState } from "react";
import { Navigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import { AuthContext } from "../App";

const AdminRoute = ({ children, loading }) => {
  const { admin } = useContext(AuthContext);

  return !loading && admin ? (
    <div>
      <AdminNavbar />
      {children}
    </div>
  ) : !loading && !admin ? (
    <Navigate to="/" />
  ) : loading ? (
    <>Loading...</>
  ) : (
    <></>
  );
};

export default AdminRoute;
