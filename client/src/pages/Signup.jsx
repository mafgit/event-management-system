import { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Form.css";
import axios from "axios";

const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    if (password != confirmPassword) {
      // toast
      return;
    }

    if (!name || (!email && !password) || !confirmPassword) {
      // toast
      return;
    }

    if (password.length < 8) {
      // toast
      return;
    }

    axios.post("/signup", { name, email, password }).then((res) => {
      if (res.data.success) {
        // toast and redirect
      } else {
        // toast
      }
    });
  };

  return (
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
          <h1
            style={
              {
                // filter: "drop-shadow(0 -6mm 4mm rgb(160, 0, 210));",
              }
            }
            className="font-bold text-4xl w-max text-gradient z-20"
          >
            Event Management System
          </h1>
        </div>
        <p className="text-xl w-[500px] italic z-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
          voluptate voluptas iure, eaque dicta aperi
        </p>
        <p className="text-xl w-[500px] italic z-20">
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda
        </p>
        <div className="w-full h-full bg-black opacity-70 absolute z-10 top-0 left-0"></div>
      </div>
      <form className="form" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-lg font-bold text-center">Signup on EMS</h1>
        </div>

        <div className="form-field">
          <label for="name">Enter Name</label>
          <input
            id="name"
            type="text"
            onChange={(e) => setName(e.target.value)}
            required
            placeholder="John Smith"
          />
        </div>

        <div className="form-field">
          <label for="email">Enter Email</label>
          <input
            id="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            required
            placeholder="johnsmith@gmail.com"
          />
        </div>

        <div className="form-field">
          <label for="password">Enter Password</label>
          <input
            id="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
            placeholder="**********"
          />
        </div>

        <div className="form-field">
          <label for="confirm-password">Confirm Password</label>
          <input
            id="confirm-password"
            type="password"
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            placeholder="**********"
          />
        </div>

        <div className="flex flex-col text-center gap-2">
          <button className="bg-blue-600 p-[5px] rounded-md">Signup</button>
          <div>
            <p className="inline">
              If you already have an account, then click{" "}
            </p>
            <Link to="/login" className="text-blue-300">
              Login
            </Link>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
