import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { FaMagnifyingGlass, FaSackXmark } from "react-icons/fa6";
import axios from "axios";

const EventAnalytics = () => {
  const { id } = useParams();
  useEffect(() => {
    axios
      .get("/events/get_analytics/" + id)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div>
      <div className="">
        <div className="">
          {/* <h1>{event.name}</h1> */}
          <button>Open Event</button>
          <button>Edit Event</button>
        </div>
        <div className="">{/* <FaSackXmark /> Revenue: {event.revenue} */}</div>
      </div>

      <div className="">
        <h1>Users that have bought a ticket</h1>
        <div className="">
          <input type="text" name="" id="" />
          <button>
            <FaMagnifyingGlass />
          </button>
        </div>
        <div className="">
          {/* {users.map((user) => (
            <div className=""></div>
          ))} */}
        </div>
      </div>
    </div>
  );
};

export default EventAnalytics;
