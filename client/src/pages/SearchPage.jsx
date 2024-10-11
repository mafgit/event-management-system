import React, { useState } from "react";
import { Search, ChevronDown } from "lucide-react";
import Footer from "../components/Footer";
import EventCard from "../components/EventCard";

const eventList = [
  {
        id: 1,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "aaa",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 50,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 25,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 2500,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
      {
        id: 2,
        title: "My Conference",
        attendees: 250,
        type: "Lecture",
        duration: "1 hour",
        venue: "bbbb",
      },
];

export default function Component() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");

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
      if (sortOption === "attendees") {
        return b.attendees - a.attendees;
      } else if (sortOption === "title") {
        return a.title.localeCompare(b.title);
      }
      return 0;
    });

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-grow">
                <input
                  type="text"
                  placeholder="Search events here..."
                  value={searchTerm}
                  onChange={handleSearch}
                  className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Search className="h-5 w-5 text-gray-400" />
                </div>
              </div>
              <div className="relative">
                <select
                  onChange={handleSort}
                  className="appearance-none w-full bg-white border border-gray-300 rounded-lg py-2 pl-4 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                >
                  <option value="">Sort By</option>
                  <option value="title">Title</option>
                  <option value="attendees">Attendees</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <EventCard
                key={event.id}
                title={event.title}
                attendees={event.attendees}
                type={event.type}
                duration={event.duration}
                venue={event.venue}
                imageUrl="https://media.istockphoto.com/id/499517325/photo/a-man-speaking-at-a-business-conference.jpg?s=612x612&w=0&k=20&c=gWTTDs_Hl6AEGOunoQ2LsjrcTJkknf9G8BGqsywyEtE="
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}