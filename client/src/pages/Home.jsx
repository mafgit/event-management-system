import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import EventCard from "../components/EventCard";

const Home = () => {

  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);

  useEffect(() => {
    async function fetchFeaturedEvents () {
      //event api (SELECT * FROM EVENTS WHERE ...)
    }

    async function fetchUpcomingEvents () {
      //event api (SELECT * FROM EVENTS WHERE ...)
    }
    fetchFeaturedEvents();
    fetchUpcomingEvents();
  }, [])

  return (<>
    <div className="mt-14 px-16">
      <h2 className="text-zinc-900 text-center text-2xl mb-4 font-light">Featured Events</h2>
      <Carousel featured={featuredEvents}/>
    </div>
    <div className="mt-4 max-w-5xl mx-auto">
      <h2 className="text-zinc-900 text-center text-2xl font-light">Upcoming Events</h2>
        <section className="grid grid-cols-3 justify-">
          {upcomingEvents && upcomingEvents.map((event) => (
            <EventCard event={event}/>
          ))
          }
          <EventCard/>
          <EventCard/>
          <EventCard/>
        </section>
    </div>
    </>
  ) 
};
export default Home;
