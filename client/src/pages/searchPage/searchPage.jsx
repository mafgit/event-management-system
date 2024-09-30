import React, { useState } from 'react';
import './searchPage.css';

const eventList = [
  {
    id: 1,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'aaa',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 50,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 25,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 2500,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  },
  {
    id: 2,
    title: 'My Conference',
    attendees: 250,
    type: 'Lecture',
    duration: '1 hour',
    venue: 'bbbb',
  }
];

const SearchPage = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [sortOption, setSortOption] = useState('');

  const handleSearch = (e) => {
    setSearchTerm(e.target.value.trim());
};

const handleSort = (e) => {
    setSortOption(e.target.value);
};

const filteredEvents = eventList
    .filter((event) =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
        if (sortOption === 'attendees') 
        {
            return b.attendees - a.attendees; 
        } 
        else if 
        (sortOption === 'title') 
        {
            return a.title.localeCompare(b.title); 
        }
        return 0; 
    });

  return (
    <div className="searchPage">
      <div className="searchContainer">
        <input
          type="text"
          placeholder="Search events here..."
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
        {filteredEvents.map((event) => (
          <div key={event.id} className="eventCard">
            <img
              src="https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE="
              alt={event.title}
              className="event-image"
            />
            <div className="eventDetails">
              <h2>{event.title}</h2>
              <p>
                <span role="img" aria-label="attendees">
                  👥
                </span>{' '}
                {event.attendees} | {event.type} | {event.duration}
              </p>
              <p>{event.venue}</p>
              <button className="openEventBtn">Open Event</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchPage;
