import { Routes, Route } from "react-router-dom";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Event from "./pages/Event";
import AdminHome from "./pages/AdminPages/AdminHome";
import AdminUsers from "./pages/AdminPages/AdminUsers";
import AdminCategories from "./pages/AdminPages/AdminCategories";
import AdminEvents from "./pages/AdminPages/AdminEvents";
import AdminPayments from "./pages/AdminPages/AdminPayments";
import AdminReviews from "./pages/AdminPages/AdminReviews";
import AdminTags from "./pages/AdminPages/AdminTags";
import AdminTickets from "./pages/AdminPages/AdminTickets";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />

        <Route path="/event/:id" element={<Event />} />

        {/* ADMIN ROUTES */}
        <Route path="/admin" element={<AdminHome />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route path="/admin/categories" element={<AdminCategories />} />
        <Route path="/admin/events" element={<AdminEvents />} />
        <Route path="/admin/payments" element={<AdminPayments />} />
        <Route path="/admin/reviews" element={<AdminReviews />} />
        <Route path="/admin/tags" element={<AdminTags />} />
        <Route path="/admin/tickets" element={<AdminTickets />} />
      </Routes>
    </div>
  );
}

export default App;
