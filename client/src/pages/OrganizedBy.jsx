import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/SearchPage.css";
import EventCard from "../components/EventCard";
import axios from "axios";
// todo: make get request and show real data

const OrganizedBy = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [eventList, setEventList] = useState([]);

  useEffect(() => {
    axios.get("/events/get_organized_by/" + id).then((res) => {
      setEventList(res.data.events);
    });
    // const events = eventList.filter(
    //   (event) => event.organizerId === parseInt(id)
    // );
    // setFilteredEvents(events);
    setFilteredEvents(eventList);
  }, [id]);

  // const handleSearch = (e) => {
  //   setSearchTerm(e.target.value.trim());
  // };

  // const handleSort = (e) => {
  //   setSortOption(e.target.value);
  // };

  // const searchedAndSortedEvents = filteredEvents
  //   .filter((event) =>
  //     event.title.toLowerCase().includes(searchTerm.toLowerCase())
  //   )
  //   .sort((a, b) => {
  //     if (sortOption === "attendees") {
  //       return b.attendees - a.attendees;
  //     } else if (sortOption === "title") {
  //       return a.title.localeCompare(b.title);
  //     }
  //     return 0;
  //   });

  return (
    <div className="searchPage">
      {" "}
      {}
      <div className="contentWrapper">
        {/* <div className="searchContainer">
          <input
            type="text"
            placeholder="Search events organized by you..."
            value={searchTerm}
            onChange={handleSearch}
            className="searchInput"
          />
          <div className="filterContainer">
            <select onChange={handleSort} className="sortDropdown">
              <option value="">Sort By</option>
              <option value="title">Title</option>
              <option value="attendees">Attendees</option>
            </select>
          </div>
        </div> */}

        <div className="eventsGrid">
          {eventList.length > 0 ? (
            eventList.map((event) => (
              <EventCard
                key={event.event_id}
                id={event.event_id}
                name={event.name}
                capacity={event.capacity}
                // attendees={event.attendees}
                category={event.category}
                duration={event.duration}
                venue={event.venue}
                image_url={event.image_url}
              />
            ))
          ) : (
            <p>No events found organized by you.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrganizedBy;
