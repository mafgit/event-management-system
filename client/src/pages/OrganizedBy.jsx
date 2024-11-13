import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import "../styles/SearchPage.css";
import EventCard from "../components/EventCard";

// todo: make get request and show real data

const eventList = [
  {
    id: 1,
    title: "Tech Conference 2024",
    attendees: 300,
    type: "Lecture",
    duration: "3 hours",
    venue: "Main Auditorium",
    organizerId: -1,
  },
  {
    id: 2,
    title: "Startup Workshop",
    attendees: 150,
    type: "Workshop",
    duration: "2 hours",
    venue: "Conference Room A",
    organizerId: -2,
  },
  {
    id: 3,
    title: "AI & ML Symposium",
    attendees: 200,
    type: "Seminar",
    duration: "4 hours",
    venue: "Hall B",
    organizerId: -1,
  },
  {
    id: 1,
    title: "Tech Conference 2024",
    attendees: 300,
    type: "Lecture",
    duration: "3 hours",
    venue: "Main Auditorium",
    organizerId: -1,
  },
  {
    id: 1,
    title: "Tech Conference 2024",
    attendees: 300,
    type: "Lecture",
    duration: "3 hours",
    venue: "Main Auditorium",
    organizerId: -1,
  },
  {
    id: 1,
    title: "Tech Conference 2024",
    attendees: 300,
    type: "Lecture",
    duration: "3 hours",
    venue: "Main Auditorium",
    organizerId: -1,
  },
  {
    id: 1,
    title: "Tech Conference 2024",
    attendees: 300,
    type: "Lecture",
    duration: "3 hours",
    venue: "Main Auditorium",
    organizerId: -1,
  },
];

const OrganizedBy = () => {
  const { id } = useParams();
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    const events = eventList.filter(
      (event) => event.organizerId === parseInt(id)
    );
    setFilteredEvents(events);
  }, [id]);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
  };

  const handleSort = (e) => {
    setSortOption(e.target.value);
  };

  const searchedAndSortedEvents = filteredEvents
    .filter((event) =>
      event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOption === "attendees") {
        return b.attendees - a.attendees;
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="searchPage">
      {" "}
      {}
      <div className="contentWrapper">
        <div className="searchContainer">
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
        </div>

        <div className="eventsGrid">
          {searchedAndSortedEvents.length > 0 ? (
            searchedAndSortedEvents.map((event) => (
              <EventCard
                key={event.id}
                id={event.id}
                name={event.name}
                capacity={event.capacity}
                // attendees={event.attendees}
                category={event.category}
                duration={event.duration}
                venue={event.venue}
                imageUrl="D:\Semester-5(ME)\DB\event-management-system\client\public\form-bg-1.jpg"
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
