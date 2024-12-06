import { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../App";

const Navbar = () => {
  const { auth, admin } = useContext(AuthContext);

  return (
    <div className="bg-gradient-to-r from-purple-300 via-emerald-100 to-indigo-300 text-black py-2 px-6 flex justify-between">
      <Link className="flex items-center font-bold italic" to="/">
        <h1 className="text-lg">EventHorizon</h1>
      </Link>
      <div className="navbar-links flex gap-5 relative">
        <Link to="/">Home</Link>
        <Link to="/search">Search Events</Link>
        {auth ? (
          <>
            <Link to="/create-event">Create Event</Link>
            <Link to="/account"><img src="image.png" className="w-6 h-6 ml-2 mr-2"/></Link>
          </>
        ) : (
          <Link to="/login">Login</Link>
          
        )}
        {admin ? (
          <Link to="/admin" className="bg-white px-2 rounded-md btn">
            Admin
          </Link>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default Navbar;
