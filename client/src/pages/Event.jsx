import {
  FaBuilding,
  FaChartSimple,
  FaLayerGroup,
  FaPen,
  FaPeopleGroup,
  FaTicketSimple,
} from "react-icons/fa6";
import Review from "../components/Review";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";

const Event = () => {
  const [event, setEvent] = useState({ tags: [] });
  const [tickets, setTickets] = useState([]);
  const { id } = useParams();
  const { userId } = useContext(AuthContext);
  useEffect(() => {
    axios.get("/events/get_event/" + id).then((res) => {
      setEvent(res.data.event);
      axios.get("/tickets/get_tickets/" + id).then((res) => {
        setTickets(res.data.tickets);
      });
    });
  }, [id]);

  return (
    <div className="mx-[50px] my-[25px]">
      <div className="w-full h-[350px] relative">
        <img
          src={event.image_url}
          className="w-full h-full object-cover rounded-md"
          alt="event"
        />
        <div className="absolute left-0 top-0 w-full h-full opacity-50 bg-black z-20 rounded-md"></div>
        <h1 className="absolute left-6 bottom-5 z-30 text-white text-3xl font-bold">
          {event.name}
        </h1>
        {event.organized_by == userId ? (
          <div className="absolute right-6 bottom-5 flex gap-2 z-50">
            <Link
              to={"/event/" + id + "/edit"}
              className="btn bg-blue-600 px-3 py-1 rounded-full text-white flex gap-2 items-center justify-center"
            >
              <FaPen /> Edit
            </Link>
            <Link
              to={"/event/" + id + "/analytics/"}
              className="btn bg-orange-600 px-3 py-1 rounded-full text-white flex gap-2 items-center justify-center"
            >
              <FaChartSimple /> Analytics
            </Link>
            <Link
              to={"/event/" + id + "/ticket-types"}
              className="btn bg-green-600 px-3 py-1 rounded-full text-white flex gap-2 items-center justify-center"
            >
              <FaTicketSimple /> Ticket Types
            </Link>
          </div>
        ) : (
          <></>
        )}
      </div>

      <div className="flex my-[10px] gap-2 items-stretch">
        <div className="bg-gray-300 p-5 rounded-md grow-[4] basis-0 flex flex-col gap-3">
          {/* details etc */}
          <div className="flex flex-wrap gap-3">
            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaPeopleGroup className="text-blue-600" /> {event.capacity}
            </div>

            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaBuilding className="text-blue-600" /> {event.venue}
            </div>

            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaLayerGroup className="text-blue-600" /> {event.category}
            </div>
            {/* 
            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaUser /> 250
            </div>

            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaUser /> 250
            </div> */}
          </div>

          <div className="flex gap-2">
            {event.tags.map((tag) => (
              <div className="px-3 py-[1px] text-center w-max bg-blue-700 text-white rounded-full">
                {tag.tag_id}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {/* desc etc */}
            <p>
              <b>Organized by: </b> {event.organizer_name}
            </p>
            <p className="italic">
              <b>Description:</b> {event.description}
            </p>
          </div>
        </div>
        <div className="grow-[1] w-full h-full bg-gray-300 rounded-md basis-0 p-5 flex flex-col gap-4">
          {/* tickets etc */}
          {tickets.map((ticket) => (
            <div className="flex flex-col gap-2">
              <button className="text-white bg-gradient-to-r from-pink-700 to-blue-700 p-2 w-full rounded-md font-bold uppercase">
                Register ({ticket.ticket_name})
              </button>

              <div className="flex">
                <h1 className="flex flex-col text-center basis-0 grow-[1] w-full items-center justify-center">
                  <b>{ticket.tickets_left}</b> Tickets left
                </h1>
                <div className="flex basis-0 grow-[1] w-full items-center justify-center bg-white rounded-full">
                  <h1 className="text-gradient text-xl font-bold">
                    PKR {ticket.price}
                  </h1>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* reviews */}
      <div className="">
        <h1 className="text-xl">Reviews</h1>
        <div className="">
          {[1, 2, 3, 4, 5].map((i) => (
            <Review />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Event;
