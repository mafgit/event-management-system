import Navbar from "../components/Navbar";
import Footer from "./Footer";

const NormalRoute = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
      <Footer />
    </div>
  );
};

export default NormalRoute;
