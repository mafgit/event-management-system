import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { FaMagnifyingGlass, FaSackXmark } from "react-icons/fa6";
import axios from "axios";
import moment from "moment";

const EventAnalytics = () => {
  const { id } = useParams();
  const [data, setData] = useState({ results: [] });
  const [revenue, setRevenue] = useState(0);
  useEffect(() => {
    axios
      .get("/events/get_analytics/" + id)
      .then((res) => {
        console.log(res.data);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  useEffect(() => {
    let sum = 0;
    for (let i = 0; i < data.results.length; i++) {
      sum += data.results[i].amount;
    }

    setRevenue(sum);
  }, [data]);

  const markPresent = (user_id) => {
    axios
      .get("/events/mark_present/" + id + "/" + user_id)
      .then((res) => {
        let arr = data.results.map((user) => {
          if (user.user_id == user_id) {
            return { ...user, attendance_created_at: "now" };
          } else {
            return user;
          }
        });

        setData({ ...data, results: arr });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const markAbsent = (user_id) => {
    axios
      .get("/events/mark_absent/" + id + "/" + user_id)
      .then((res) => {
        let arr = data.results.map((user) => {
          if (user.user_id == user_id) {
            return { ...user, attendance_created_at: "" };
          } else {
            return user;
          }
        });

        setData({ ...data, results: arr });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="p-[25px]">
      <div className="flex justify-between">
        <div className="flex gap-2 justify-center items-center">
          <h1 className="text-xl font-bold">
            {id} - {data.name}
          </h1>
          <Link
            to={"/event/" + id}
            className="ml-5 btn px-3 py-1 bg-blue-600 text-white rounded-full"
          >
            Open Event
          </Link>
          <Link
            to={"/event/" + id + "/edit"}
            className="btn px-3 py-1 bg-blue-600 text-white rounded-full"
          >
            Edit Event
          </Link>
        </div>
        <div className="btn px-3 py-1 text-white rounded-full flex items-center justify-center gap-2 bg-green-600 max-w-max">
          <FaSackXmark /> Revenue: PKR {revenue}
        </div>
      </div>

      <div className="flex flex-col text-center items-center justify-center w-full mt-5">
        <h1 className="text-xl font-bold">Users that have bought a ticket</h1>
        <div className="w-[500px] flex gap-2 justify-center items-center h-[35px] mt-5">
          <input
            className="w-full bg-gray-300 h-full rounded-full px-4"
            type="text"
            name=""
            id=""
            placeholder="Search by id or email"
          />
          <button className="bg-blue-600 text-white min-w-[35px] h-full rounded-full flex items-center justify-center">
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="mt-5">
          <table>
            <tr>
              <th className="p-3">User ID</th>
              <th className="p-3">User Email</th>
              <th className="p-3">User Name</th>
              <th className="p-3">Ticket Type</th>
              <th className="p-3">Mark Attendance</th>
              <th className="p-3">Attended at</th>
            </tr>
            {data.results.map((user) => (
              <tr>
                <td className="p-3">{user.user_id}</td>
                <td className="p-3">{user.email}</td>
                <td className="p-3">
                  {" "}
                  {user.first_name} {user.last_name}
                </td>
                <td>
                  <p className="p-3 px-3 py-[3px] bg-purple-500 rounded-full text-white">
                    {user.ticket_name}
                  </p>
                </td>
                <td className="p-3">
                  {user.attendance_created_at ? (
                    <button
                      onClick={() => markAbsent(user.user_id)}
                      className="btn bg-red-600 px-3 py-[3px] rounded-full text-white"
                    >
                      Mark absent
                    </button>
                  ) : (
                    <button
                      className="btn bg-green-600 px-3 py-[3px] rounded-full text-white"
                      onClick={() => markPresent(user.user_id)}
                    >
                      Mark present
                    </button>
                  )}
                </td>
                <td className="p-3">
                  {["", "now", null].includes(user.attendance_created_at) ==
                  false
                    ? moment(user.attendance_created_at).format(
                        "DD MMM, YYYY HH:MM"
                      )
                    : user.attendance_created_at}
                </td>
              </tr>
            ))}
          </table>
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
