import { Routes, Route, Navigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Event from "./pages/Event";
import SearchPage from "./pages/SearchPage";
import AdminHome from "./pages/AdminPages/AdminHome";
import AdminUsers from "./pages/AdminPages/AdminUsers";
import AdminCategories from "./pages/AdminPages/AdminCategories";
import AdminEvents from "./pages/AdminPages/AdminEvents";
import AdminRegistrations from "./pages/AdminPages/AdminRegistrations";
import AdminReviews from "./pages/AdminPages/AdminReviews";
import AdminTags from "./pages/AdminPages/AdminTags";
import AdminTickets from "./pages/AdminPages/AdminTickets";
import AdminRoute from "./components/AdminRoute";
import NormalRoute from "./components/NormalRoute";
import AuthRoute from "./components/AuthRoute";
import { createContext, useEffect, useState } from "react";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import CreateEvent from "./pages/CreateEvent";
import OrganizedBy from "./pages/OrganizedBy";
import AttendedByMe from "./pages/AttendedByMe";
import Account from "./pages/Account";
import EventAnalytics from "./pages/EventAnalytics";
import TicketTypes from "./pages/TicketTypes";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

export const AuthContext = createContext({
  auth: false,
  admin: true,
  userId: -1,
  email: "",
  firstName: "",
  lastName: "",
  setAuth: () => {},
  setAdmin: () => {},
  setUserId: () => {},
  setEmail: () => {},
  setFirstName: () => {},
  setLastName: () => {},
});

function App() {
  const [auth, setAuth] = useState(false);
  const [userId, setUserId] = useState(-1);
  const [admin, setAdmin] = useState(false);
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/auth/get_login_data")
      .then((res) => {
        // console.log(res);

        setAuth(true);
        setUserId(res.data.user_id);
        setEmail(res.data.email);
        setFirstName(res.data.first_name);
        setLastName(res.data.last_name);
        setAdmin(res.data.is_admin);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        console.log(err);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        auth,
        admin,
        email,
        firstName,
        lastName,
        userId,
        setAuth,
        setAdmin,
        setUserId,
        setEmail,
        setFirstName,
        setLastName,
      }}
    >
      <div className="App">
        <Routes>
          {/* Signup and Login */}
          <Route
            path="/signup"
            element={!auth ? <Signup /> : <Navigate to="/" />}
          />
          <Route
            path="/login"
            element={!auth ? <Login /> : <Navigate to="/" />}
          />

          {/* Normal Routes */}
          <Route
            path="/"
            element={
              <NormalRoute>
                <Home />
              </NormalRoute>
            }
          />

          <Route
            path="/event/:id"
            element={
              <NormalRoute>
                <Event />
              </NormalRoute>
            }
          />

          <Route
            path="/search"
            element={
              <NormalRoute>
                <SearchPage />
              </NormalRoute>
            }
          />

          <Route
            path="/organized-by/:id"
            element={
              <NormalRoute>
                <OrganizedBy />
              </NormalRoute>
            }
          />

          {/* Auth Routes */}
          <Route
            path="/create-event"
            element={
              <AuthRoute loading={loading}>
                <CreateEvent />
              </AuthRoute>
            }
          />

          <Route
            path="/event/:id/analytics"
            element={
              <AuthRoute loading={loading}>
                <EventAnalytics />
              </AuthRoute>
            }
          />

          <Route
            path="/event/:id/ticket-types"
            element={
              <AuthRoute loading={loading}>
                <TicketTypes />
              </AuthRoute>
            }
          />

          <Route
            path="/event/:id/edit"
            element={
              <AuthRoute loading={loading}>
                <CreateEvent edit={true} />
              </AuthRoute>
            }
          />

          <Route
            path="/attended-by-me"
            element={
              <AuthRoute loading={loading}>
                <AttendedByMe />
              </AuthRoute>
            }
          />

          <Route
            path="/account"
            element={
              <AuthRoute loading={loading}>
                <Account />
              </AuthRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute loading={loading}>
                <AdminHome />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute loading={loading}>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute loading={loading}>
                <AdminCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute loading={loading}>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <AdminRoute loading={loading}>
                <AdminRegistrations />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminRoute loading={loading}>
                <AdminReviews />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tags"
            element={
              <AdminRoute loading={loading}>
                <AdminTags />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <AdminRoute loading={loading}>
                <AdminTickets />
              </AdminRoute>
            }
          />
        </Routes>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
