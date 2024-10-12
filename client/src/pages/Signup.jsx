import { useContext, useState } from "react";
import { AuthContext } from "../App";
import { Link, useNavigate } from "react-router-dom";
import "../styles/Form.css";
import axios from "axios";
import { app } from "../firebase";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { toast, ToastContainer } from "react-toastify";
import { FcGoogle } from "react-icons/fc";

const Signup = ({ isLoginPage }) => {
  const { setAuth, setAdmin, setUserId, setEmail, setFirstName, setLastName } =
    useContext(AuthContext);
  const navigate = useNavigate();
  const [first_name, set_first_name] = useState("");
  const [last_name, set_last_name] = useState("");
  const [email, set_email] = useState("");
  const [password, set_password] = useState("");
  const [confirm_password, set_confirm_password] = useState("");

  const handleGoogleLogin = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
      const res = await fetch("http://localhost:5000/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: result.user.displayName,
          email: result.user.email,
        }),
      });
      const data = await res.json();
      if (data.success === false) return toast(data.message);
      toast("Logged in!");
      const { user_id, email, first_name, last_name, is_admin } = data.user;
      setAuth(true);
      setUserId(user_id);
      setEmail(email);
      setFirstName(first_name);
      setLastName(last_name);
      setAdmin(is_admin);
    } catch (error) {
      console.log("Could not sign in with google", error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!isLoginPage) {
      if (password !== confirm_password) {
        toast("Passwords don't match");
        return;
      }

      if (
        !first_name ||
        !last_name ||
        !email ||
        !password ||
        !confirm_password
      ) {
        toast("Fill all fields");
        return;
      }

      if (password.length < 8) {
        toast("Password must be at least 8 characters long");
        return;
      }

      axios
        .post("/auth/signup", { first_name, last_name, email, password })
        .then((res) => {
          if (res.data.success) {
            toast("Signed up!");
            navigate("/login");
          } else {
            toast(res.data.message);
          }
        })
        .catch((error) => {
          if (error.response) {
            toast(error.response.data.message);
          } else {
            toast("Request error: " + error.message);
          }
        });
    } else {
      if (!email || !password) {
        toast("Fill all fields");
        return;
      }

      axios
        .post("/auth/signin", { email, password })
        .then((res) => {
          if (res.data.success) {
            toast("Logged in!");
            const { user_id, email, first_name, last_name, is_admin } =
              res.data.user;
            setAuth(true);
            setUserId(user_id);
            setEmail(email);
            setFirstName(first_name);
            setLastName(last_name);
            setAdmin(is_admin);
          } else {
            toast(res.data.message);
          }
        })
        .catch((error) => {
          if (error.response) {
            toast(error.response.data.message);
          } else {
            toast("Request error: " + error.message);
          }
        });
    }
  };

  return (
    <>
      <div className="form-page">
        <div
          className="bg-slate-400 h-[100vh] w-[70%] relative text-white p-36 flex flex-col gap-3"
          style={{
            backgroundRepeat: "no-repeat",
            backgroundImage: "url(/form-bg-2.jpg)",
            backgroundSize: "cover",
            backgroundPositionX: "right",
          }}
        >
          {/* <img
          src="https://images.unsplash.com/photo-1540575467063-178a50c2df87?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="login-bg"
          className="object-cover w-full h-full bg-center"
        /> */}
          <div className="bg-white z-20 w-min p-3 rounded-sm">
            <h1 className="font-bold text-4xl w-max text-gradient z-20">
              Event Management System
            </h1>
          </div>
          <p className="text-xl w-[500px] italic z-20 mt-4">
            Transforming how events are managed and experienced.
          </p>
          <p className="text-xl w-[500px] italic z-20">
            Join us today and transform your event experience into something
            extraordinary.
          </p>
          <div className="w-full h-full bg-black opacity-70 absolute z-10 top-0 left-0"></div>
        </div>
        <div className="md:w-1/2 p-8">
          <h3 className="text-2xl font-semibold mb-4 text-center">
            {isLoginPage ? "Login to Your Account" : "Create Your Account"}
          </h3>
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLoginPage && (
              <>
                <div>
                  <label
                    htmlFor="first_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    First Name
                  </label>
                  <input
                    id="first_name"
                    type="text"
                    value={first_name}
                    onChange={(e) => set_first_name(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="John"
                  />
                </div>

                <div>
                  <label
                    htmlFor="last_name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Last Name
                  </label>
                  <input
                    id="last_name"
                    type="text"
                    value={last_name}
                    onChange={(e) => set_last_name(e.target.value)}
                    required
                    className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                    placeholder="Doe"
                  />
                </div>
              </>
            )}
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => set_email(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="you@example.com"
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => set_password(e.target.value)}
                required
                className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                placeholder="********"
              />
            </div>
            {!isLoginPage && (
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm Password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirm_password}
                  onChange={(e) => set_confirm_password(e.target.value)}
                  required
                  className="mt-1 block w-full px-3 py-2 bg-gray-100 border border-gray-300 rounded-md text-sm shadow-sm placeholder-gray-400
                    focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500"
                  placeholder="********"
                />
              </div>
            )}
            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                {isLoginPage ? "Sign In" : "Sign Up"}
              </button>
            </div>
          </form>
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-3 bg-white text-gray-500">Or</span>
              </div>
            </div>
            <div className="mt-6">
              <button
                onClick={handleGoogleLogin}
                className="w-full flex items-center gap-2 justify-center px-4 py-2 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500"
              >
                <FcGoogle className="text-lg" />
                Continue with Google
              </button>
            </div>
          </div>
          <p className="mt-4 text-center text-sm text-gray-600">
            {isLoginPage ? (
              <>
                Don't have an account?{" "}
                <Link
                  to="/signup"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Sign up
                </Link>
              </>
            ) : (
              <>
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-purple-600 hover:text-purple-500"
                >
                  Log in
                </Link>
              </>
            )}
          </p>
        </div>
      </div>
      <ToastContainer></ToastContainer>
    </>
  );
};

export default Signup;
