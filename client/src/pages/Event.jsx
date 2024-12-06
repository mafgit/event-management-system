import {
  FaBuilding,
  FaChartSimple,
  FaClock,
  FaLayerGroup,
  FaPen,
  FaPeopleGroup,
  FaRegStar,
  FaStar,
  FaTicketSimple,
} from "react-icons/fa6";
import Review from "../components/Review";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../App";
import { toast, ToastContainer } from "react-toastify";
import moment from "moment";

const Event = () => {
  const [event, setEvent] = useState({ tags: [] });
  const [tickets, setTickets] = useState([]);
  const [ticketsWithStatus, setTicketsWithStatus] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [canReview, setCanReview] = useState(false);
  const { id } = useParams();
  const { userId, admin } = useContext(AuthContext);
  const [rating, setRating] = useState(5);
  const [text, setText] = useState("");
  const { auth } = useContext(AuthContext);
  useEffect(() => {
    axios.get("/events/get_event/" + id).then((res) => {
      console.log(res.data);

      setEvent(res.data.event);

      axios.get("/tickets/get_tickets/" + id).then((res) => {
        setTickets(res.data.tickets);
      });

      axios.get("/reviews/get_reviews/" + id).then((res) => {
        setReviews(res.data);
      });

      if (auth)
        axios.get("/events/get_can_review/" + id).then((res) => {
          setCanReview(res.data.attended && !res.data.reviewed);
        });

      if (auth)
        axios.get("/tickets/get_tickets_with_status/" + id).then((res) => {
          setTicketsWithStatus(res.data.tickets);
        });
    });
  }, [id, auth]);

  // useEffect(() => {
  //   console.log("tickets: ", tickets);
  //   console.log("ticketsWithStatus: ", ticketsWithStatus);
  // }, [tickets, ticketsWithStatus]);

  const has_paid_this = (ticket_name) => {
    for (let i = 0; i < ticketsWithStatus.length; i++) {
      if (ticketsWithStatus[i].ticket_name == ticket_name) {
        if (ticketsWithStatus[i].has_paid == true) {
          return true;
        }
      }
    }
    return false;
  };

  const has_registered = (ticket_name) => {
    for (let i = 0; i < ticketsWithStatus.length; i++) {
      if (ticketsWithStatus[i].ticket_name == ticket_name) {
        if (ticketsWithStatus[i].has_registered == true) {
          return true;
        }
      }
    }
    return false;
  };

  const has_paid_any = () => {
    for (let i = 0; i < ticketsWithStatus.length; i++) {
      if (ticketsWithStatus[i].has_registered == true) {
        return true;
      }
    }

    return false;
  };

  return (
    <div className="mx-[50px] my-[25px]">
      <ToastContainer />
      <div className="w-full h-[350px] relative">
        <img
          src={event.image_url || "/form-bg-1.jpg"}
          className="w-full h-full object-cover rounded-md"
          alt="event"
        />
        <div className="absolute left-0 top-0 w-full h-full opacity-50 bg-black z-20 rounded-md"></div>
        <div className="absolute left-6 bottom-5 z-30 flex">
          <h1 className="text-white text-3xl font-bold">{event.name} </h1>
          <span className="text-gray-300 text-lg flex items-end ml-2">
            #{event.event_id}
          </span>
          {!event.verified && (
            <h1 className="ml-3 bg-red-500 px-2 rounded-md font-bold text-xl text-white flex items-center justify-center">
              Unverified Event
            </h1>
          )}
        </div>

        {event.organized_by == userId || admin ? (
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

            <div className="flex gap-2 px-2 py-[1px] items-center justify-center w-max bg-white rounded-full">
              <FaClock className="text-blue-600" />{" "}
              {moment(event.event_date).format("DD-MMM-YYYY")},{" "}
              {event.start_time} - {event.end_time}
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
              <div
                key={tag.tag_name}
                className="px-3 py-[1px] text-center w-max bg-blue-700 text-white rounded-full"
              >
                {tag.tag_name}
              </div>
            ))}
          </div>

          <div className="flex flex-col gap-2">
            {/* desc etc */}
            <p>
              <b>Organized by: </b> {event.organizer_name}
            </p>
            <p>
              <b>Description:</b>{" "}
              <p className="italic inline">"{event.description}"</p>
            </p>
          </div>
        </div>
        {event.status === "Scheduled" && (
          <div className="grow-[1] w-full h-full bg-gray-300 basis-0 p-5 flex flex-col gap-4 rounded-md">
            {/* tickets etc */}
            {tickets.length ? (
              tickets.map((ticket) => (
                <div className="flex flex-col" key={ticket.ticket_id}>
                  {!has_paid_this(ticket.ticket_name) &&
                  has_registered(ticket.ticket_name) ? (
                    <button
                      onClick={() => {
                        axios({
                          method: "delete",
                          url: "/tickets/unregister_ticket",
                          data: JSON.stringify({
                            id,
                            ticket_name: ticket.ticket_name,
                            ticket_id: ticket.ticket_id,
                          }),
                          headers: {
                            "Content-Type": "application/json",
                          },
                        })
                          .then((res) => {
                            window.location.reload();
                            toast.success("You have unregistered");
                          })
                          .catch((err) => {
                            toast.error(err.response.data.message);
                          });
                        // using this format of axios to send data in body in delete request
                      }}
                      className="register-btn pending-btn"
                    >
                      Pending - {ticket.ticket_name}
                    </button>
                  ) : has_paid_this(ticket.ticket_name) ? (
                    <button className="paid-btn">
                      Paid - {ticket.ticket_name}
                    </button>
                  ) : (
                    <button
                      className="disabled:bg-slate-400 register-btn disabled:cursor-not-allowed"
                      disabled={has_paid_any()}
                      onClick={() => {
                        axios
                          .post("/tickets/register_ticket", {
                            id,
                            ticket_id: ticket.ticket_id,
                          })
                          .then((res) => {
                            window.location.reload();
                            toast.success(
                              "You have registered, but payment is pending"
                            );
                          })
                          .catch((err) => {
                            toast.error(err.response.data.message);
                          });
                      }}
                    >
                      Register - {ticket.ticket_name}
                    </button>
                  )}
                  <div
                    className={
                      "flex bg-white rounded-bl-md rounded-br-md p-[5px]" +
                      (has_paid_this(ticket.ticket_name)
                        ? " register-btn-down-paid"
                        : "")
                    }
                  >
                    <h1 className="flex text-center basis-0 gap-1 grow-[1] w-full items-center justify-center">
                      <b>{ticket.tickets_left} </b> LEFT
                    </h1>
                    <div className="flex basis-0 grow-[1] w-full items-center justify-center">
                      <h1 className="text-gradient text-xl font-bold">
                        PKR {ticket.price}
                      </h1>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="h-full flex items-center justify-center rounded-md">
                <h1 className="italic">No tickets yet</h1>
              </div>
            )}
          </div>
        )}
      </div>

      {/* reviews */}
      {event.status == "Completed" && (
        <div className="">
          <h1 className="text-xl mb-2 mt-4">Reviews</h1>
          {canReview && (
            <>
              <div className="bg-gray-200 max-w-min mb-4 p-2 rounded-md">
                <textarea
                  onChange={(e) => setText(e.target.value)}
                  type="text"
                  placeholder="Write a review"
                  className="bg-gray-300 p-2 min-w-[300px] max-w-[300px] min-h-[100px] max-h-[100px]"
                ></textarea>

                <div className="flex justify-between items-center">
                  <div className="cursor-pointer flex gap-1">
                    {Array(rating)
                      .fill(1)
                      .map((_, i) => (
                        <FaStar
                          className="text-yellow-500"
                          onClick={() => {
                            setRating(i + 1);
                          }}
                        />
                      ))}
                    {rating < 5 &&
                      Array(5 - rating)
                        .fill(1)
                        .map((_, i) => (
                          <FaRegStar
                            className="text-yellow-500"
                            onClick={() => {
                              setRating(i + 1 + rating);
                            }}
                          />
                        ))}
                  </div>

                  <button
                    className="btn rounded-md bg-blue-600 text-white py-1 px-2"
                    onClick={() => {
                      if (text.trim().length < 4) {
                        toast.error(
                          "Review must be at least 4 characters long"
                        );
                        return;
                      }
                      axios
                        .post("/reviews/create_review", {
                          text,
                          rating: rating,
                          eventId: id,
                          userId,
                        })
                        .then((res) => {
                          window.location.reload();
                        });
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </>
          )}
          <div className="flex gap-2 flex-wrap">
            {reviews.length ? (
              reviews.map((r) => {
                return (
                  <Review
                    key={r.review_id}
                    user_id={r.user_id}
                    name={r.name}
                    text={r.text}
                    rating={r.rating}
                    review_id={r.review_id}
                  />
                );
              })
            ) : (
              <div className="text-gray-500">No reviews yet</div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Event;
