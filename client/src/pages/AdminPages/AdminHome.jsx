import {
  FaCashRegister,
  FaStar,
  FaTicket,
  FaUser,
  FaUsers,
} from "react-icons/fa6";
import { Link } from "react-router-dom";

const AdminHome = () => {
  return (
    <div className="">
      <div className="flex flex-wrap gap-2 w-full items-center justify-center mt-10 max-w-[1000px] m-auto">
        <Link
          to="/admin/users"
          className="admin-tap text-xl gap-1 bg-blue-500 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">80</b>
          <div className="flex items-center justify-center gap-2">
            <FaUsers />
            <h1>Users</h1>
          </div>
        </Link>

        <Link
          to="/admin/events"
          className="admin-tap text-xl gap-1 bg-red-500 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">325</b>
          <div className="flex items-center justify-center gap-2">
            <FaStar />
            <h1>Events</h1>
          </div>
        </Link>

        <Link
          to="/admin/tickets"
          className="admin-tap text-xl gap-1 bg-green-600 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">73</b>
          <div className="flex items-center justify-center gap-2">
            <FaTicket />
            <h1>Tickets</h1>
          </div>
        </Link>

        <Link
          to="/admin/registrations"
          className="admin-tap text-xl gap-1 bg-orange-600 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">205</b>
          <div className="flex items-center justify-center gap-2">
            <FaCashRegister />
            <h1>Registrations</h1>
          </div>
        </Link>

        <Link
          to="/admin/reviews"
          className="admin-tap text-xl gap-1 bg-cyan-500 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">205</b>
          <div className="flex items-center justify-center gap-2">
            <FaCashRegister />
            <h1>Reviews</h1>
          </div>
        </Link>

        <Link
          to="/admin/categories"
          className="admin-tap text-xl gap-1 bg-yellow-500 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">205</b>
          <div className="flex items-center justify-center gap-2">
            <FaCashRegister />
            <h1>Categories</h1>
          </div>
        </Link>

        <Link
          to="/admin/tags"
          className="admin-tap text-xl gap-1 bg-purple-600 text-white w-[200px] h-[125px] rounded-md flex items-center justify-center flex-col"
        >
          <b className="text-2xl">205</b>
          <div className="flex items-center justify-center gap-2">
            <FaCashRegister />
            <h1>Tags</h1>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default AdminHome;
