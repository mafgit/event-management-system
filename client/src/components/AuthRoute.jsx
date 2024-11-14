import { useState, useContext } from "react";
import { Navigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import { AuthContext } from "../App";
import Footer from "./Footer";

const AuthRoute = ({ children, loading }) => {
  const { auth } = useContext(AuthContext);

  return !loading && auth ? (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  ) : !loading && !auth ? (
    <Navigate to="/" />
  ) : loading ? (
    <>Loading...</>
  ) : (
    <></>
  );
};

export default AuthRoute;
