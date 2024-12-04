import React, { useEffect, useState } from "react";
import EventCard from "../components/EventCard";
import axios from "axios";
import { FaMagnifyingGlass } from "react-icons/fa6";

export default function Component() {
  const [eventList, setEventList] = useState([]);
  const [search, setSearch] = useState("");
  const [categories, setCategories] = useState([]);
  const [tags, setTags] = useState([]);
  const [selectedTags, setSelectedTags] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedType, setSelectedType] = useState("All");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/events/get_events?q=&tags=all&category=all&type=all")
      .then((res) => {
        setEventList(res.data.events);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });

    // get categories
    axios.get("/events/get_categories").then((res) => {
      setCategories(res.data.map((i) => i.name));
    });
    // get tags
    axios.get("/events/get_tags").then((res) => {
      console.log(res.data);
      setTags(res.data.map((i) => i.name));
    });
  }, []);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 sm:px-0 mb-3">
          <div className="w-full flex items-center flex-col justify-center gap-2 my-3 mb-10">
            <h1 className="font-bold text-2xl mb-2">Search Events</h1>
            <div className="">
              <input
                type="text"
                onChange={(e) => setSearch(e.target.value)}
                value={search}
                className="px-3 py-2 rounded-full w-[300px]"
                placeholder="Enter event name here"
              />
              <button
                onClick={() => {
                  // console.log(
                  //   `/events/search?q=${search.trim()}&tags=${
                  //     selectedTags.length >= 1 ? selectedTags.join(",") : "all"
                  //   }&category=${
                  //     selectedCategory === "All" ? "all" : selectedCategory
                  //   }&type=${selectedType === "All" ? "all" : selectedType}`
                  // );
                  setLoading(true);
                  axios
                    .get(
                      `/events/get_events?q=${search.trim()}&tags=${
                        selectedTags.length >= 1
                          ? selectedTags.join(",")
                          : "all"
                      }&category=${
                        selectedCategory === "All" ? "all" : selectedCategory
                      }&type=${selectedType === "All" ? "all" : selectedType}`
                    )
                    .then((res) => {
                      setEventList(res.data.events);
                      setLoading(false);
                    })
                    .catch((err) => {
                      console.log(err);
                      setLoading(false);
                    });
                }}
                className="btn text-white bg-blue-500 p-2 rounded-full ml-2"
              >
                <FaMagnifyingGlass />
              </button>

              {/* status of event */}
              <select
                className="ml-5 p-2 rounded-full"
                onChange={(e) => setSelectedType(e.target.value)}
              >
                <option value="All">All Events</option>
                <option value="Scheduled">Scheduled</option>
                <option value="Completed">Completed</option>
              </select>

              {/* category */}
              <select
                className="ml-5 p-2 rounded-full"
                onChange={(e) => setSelectedCategory(e.target.value)}
              >
                <option value="All">All Categories</option>
                {categories.map((category) => (
                  <option value={category}>{category}</option>
                ))}
              </select>
            </div>
            {/* tags */}
            <div className="flex gap-1 m-auto">
              {tags.map((tag) => (
                <div
                  className={
                    "btn rounded-full py-1 px-2" +
                    (selectedTags.includes(tag)
                      ? " bg-blue-500 text-white"
                      : " bg-white text-black")
                  }
                  onClick={() => {
                    if (selectedTags.includes(tag)) {
                      setSelectedTags(selectedTags.filter((i) => i !== tag));
                    } else {
                      setSelectedTags([...selectedTags, tag]);
                    }
                  }}
                >
                  {tag}
                </div>
              ))}
            </div>
          </div>
          {loading ? (
            <h1 className="m-auto text-center w-full text-gray-600">
              Loading...
            </h1>
          ) : !loading && eventList.length ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {eventList.map((event) => (
                <EventCard
                  key={event.event_id}
                  id={event.event_id}
                  name={event.name}
                  // title={event.title}
                  // attendees={event.attendees}
                  capacity={event.capacity}
                  category={event.category}
                  duration={event.duration}
                  venue={event.venue}
                  image_url={event.image_url}
                  event_date={event.event_date}
                  status={event.status}
                />
              ))}
            </div>
          ) : (
            <p className="m-auto text-center w-full text-gray-600">
              No events found
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
