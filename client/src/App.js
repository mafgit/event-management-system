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
import VisitedByMe from "./pages/VisitedByMe";
import Account from "./pages/Account";

axios.defaults.baseURL = "http://localhost:5000/";
axios.defaults.withCredentials = true;

export const AuthContext = createContext({
  auth: true, // todo: set to false
  admin: true,
  email: "",
  first_name: "",
  last_name: "",
}); // todo: add default value

function App() {
  const [auth, setAuth] = useState(true); // todo: set to false
  const [userId, setUserId] = useState(-1); // todo: set to false
  const [admin, setAdmin] = useState(true);
  const [email, setEmail] = useState("a@a.com");
  const [firstName, setFirstName] = useState("abc");
  const [lastName, setLastName] = useState("def");
  // todo: add loading use state

  useEffect(() => {
    // todo: axios.get() with credentials
  }, []);

  return (
    <AuthContext.Provider
      value={{ auth, admin, email, firstName, lastName, userId }}
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
              <AuthRoute>
                <CreateEvent />
              </AuthRoute>
            }
          />

          <Route
            path="/visited-by-me"
            element={
              <AuthRoute>
                <VisitedByMe />
              </AuthRoute>
            }
          />

          <Route
            path="/account"
            element={
              <AuthRoute>
                <Account />
              </AuthRoute>
            }
          />

          {/* Admin Routes */}
          <Route
            path="/admin"
            element={
              <AdminRoute>
                <AdminHome />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/users"
            element={
              <AdminRoute>
                <AdminUsers />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRoute>
                <AdminCategories />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/events"
            element={
              <AdminRoute>
                <AdminEvents />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/registrations"
            element={
              <AdminRoute>
                <AdminRegistrations />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/reviews"
            element={
              <AdminRoute>
                <AdminReviews />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tags"
            element={
              <AdminRoute>
                <AdminTags />
              </AdminRoute>
            }
          />
          <Route
            path="/admin/tickets"
            element={
              <AdminRoute>
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
