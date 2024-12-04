import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/SearchPage.css";
import EventCard from "../components/EventCard";
import axios from "axios";

const OrganizedBy = ({ attended = false }) => {
  const { id } = useParams();
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    let req = "";
    if (attended) req = "/events/get_attended_by_me";
    else req = "/events/get_organized_by/" + id;
    axios.get(req).then((res) => {
      setEventList(res.data.events);
    });
  }, [id]);

  return (
    <div className="searchPage">
      <div className="contentWrapper">
        <h1 className="text-xl font-bold text-center my-5">
          Events {attended ? "Attended" : "Organized"} By You
        </h1>

        <div className="eventsGrid max-w-[1200px] m-auto">
          {eventList.length > 0 ? (
            eventList.map((event) => (
              <EventCard
                key={event.event_id}
                id={event.event_id}
                name={event.name}
                capacity={event.capacity}
                category={event.category}
                duration={event.duration}
                venue={event.venue}
                image_url={event.image_url}
                event_date={event.event_date}
                status={event.status}
              />
            ))
          ) : (
            <p>
              No events found {!attended ? "organized" : "attended"} by you.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizedBy;
