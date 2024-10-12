import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-gray-300 text-black py-2 px-6 flex justify-between">
      <Link className="flex items-center font-bold italic" to="/admin">
        <h1 className="text-lg">EventHorizon Admin</h1>
      </Link>
      <div className="navbar-links flex gap-5 relative">
        <Link to="/admin">Home</Link>
        <Link to="/admin/users">Users</Link>
        <Link to="/admin/events">Events</Link>
        <Link to="/admin/tickets">Tickets</Link>
        <Link to="/admin/registrations">Registrations</Link>
        <Link to="/admin/reviews">Reviews</Link>
        <Link to="/admin/categories">Categories</Link>
        <Link to="/admin/tags">Tags</Link>
        <Link to="/" className="bg-white px-2 rounded-md btn">
          Website
        </Link>
      </div>
    </div>
  );
};

export default Navbar;
