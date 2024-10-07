import { useContext } from "react";
import { AuthContext } from "../App";
import { Link } from "react-router-dom";

const Account = () => {
  const { firstName, lastName, email, userId } = useContext(AuthContext);
  return (
    <div className="page">
      <br />
      <h1 className="text-2xl text-center">Your Account</h1>
      <br />
      <div className="flex flex-col bg-gray-300 p-5 max-w-[300px] rounded-md m-auto">
        <div className="">
          <h3>
            <b>User ID: </b> {userId}
          </h3>

          <br />
          <h3>
            <b>Name: </b> {firstName + " " + lastName}
          </h3>
          <br />

          <h3>
            <b>Email: </b> {email}
          </h3>
        </div>
        <br />
        <div className="flex flex-col gap-2">
          <Link
            to={"/organized-by/" + userId}
            className="btn m-auto bg-gray-100 p-2 w-full text-center rounded-md"
          >
            View Events Organized by You
          </Link>

          <Link
            to="/visited-by-me"
            className="btn m-auto bg-gray-100 p-2 w-full text-center rounded-md"
          >
            View Events Attended by You
          </Link>

          <Link
            to="/visited-by-me"
            className="btn m-auto  bg-red-500 text-white p-2 w-full text-center rounded-md"
          >
            <b>Logout</b>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Account;
