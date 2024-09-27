import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <div className="bg-slate-900 text-white py-3 px-4 flex justify-between">
      <div className="">
        <h1>EMS</h1>
      </div>
      <div className="flex gap-4">
        <Link to="#">Home</Link>
        <Link to="#">Find Events</Link>
        <Link to="#">Account</Link>
      </div>
    </div>
  );
};

export default Navbar;
