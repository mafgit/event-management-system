import { Link } from "react-router-dom";
import { FaGithub, FaEnvelope, FaInfoCircle } from "react-icons/fa"; 
const Footer = () => {
  return (
    <div className="bg-teal-800 text-white py-4 px-6 flex justify-between items-center">
      <div className="footer-links flex gap-5">
        <Link to="https://github.com/mafgit/event-management-system" target="_blank" className="flex items-center gap-2">
          <FaGithub /> Github
        </Link>
        <Link to="/contact-us" className="flex items-center gap-2">
          <FaEnvelope /> Contact Us
        </Link>
        <Link to="/about-us" className="flex items-center gap-2">
          <FaInfoCircle /> About Us
        </Link>
      </div>
      <div className="text-sm italic">&copy; 2024 Event Management System</div>
    </div>
  );
};

export default Footer;
