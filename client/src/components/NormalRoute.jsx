import Navbar from "../components/Navbar";

const NormalRoute = ({ children }) => {
  return (
    <div>
      <Navbar />
      {children}
    </div>
  );
};

export default NormalRoute;
