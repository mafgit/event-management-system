import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { auth, admin } = useContext(AuthContext);

  return (
    <div className="bg-gray-300 text-black py-2 px-6 flex justify-between">
      <Link className="flex items-center font-bold italic" to="/">
        <h1 className="text-lg">EventHorizon</h1>
      </Link>
      <div className="navbar-links flex gap-5 relative">
        <Link to="/">Home</Link>
        <Link to="/search">Search Events</Link>
        {auth ? (
          <>
            <Link to="/create-event">Create Event</Link>
            <Link to="/account">Account</Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
        )}
        {admin && (
          <Link to="/admin" className="bg-white px-2 rounded-md btn">
            Admin
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
