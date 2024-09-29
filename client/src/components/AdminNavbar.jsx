import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-white py-3 px-4 flex justify-between">
      <Link to="/">
        <h1>EMS Admin</h1>
      </Link>
      <div className="flex gap-4">
        <Link to="#">Home</Link>
        <Link to="#">Website</Link>
        <Link to="#">Users</Link>
        <Link to="#">Events</Link>
        <Link to="#">Reviews</Link>
        <Link to="#">Categories</Link>
        <Link to="#">Tags</Link>
        <Link to="#">Payments</Link>
        <Link to="#">Tickets</Link>
      </div>
    </div>
  );
};

export default Navbar;
