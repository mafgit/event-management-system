import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";

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

  //https://images.unsplash.com/photo-1642427749670-f20e2e76ed8c?q=80&w=1780&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  //https://images.unsplash.com/photo-1641579281152-e5d633aa3775?q=80&w=1932&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  //https://plus.unsplash.com/premium_photo-1681488484866-af8f282d59ce?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  //https://images.unsplash.com/photo-1574302833650-e91c6ec31969?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  //https://plus.unsplash.com/premium_photo-1681488484866-af8f282d59ce?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D
  return (
  <>
      <div  className="min-h-screen bg-gray-100">
        <header className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681488484866-af8f282d59ce?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
          <h1 className="text-5xl font-bold mb-4">Organize & Attend Events Effortlessly</h1>
          <p className="text-lg mb-8">Discover events near you or create your own.</p>
          <Link to={'/'} className="bg-gradient-to-tr from-purple-800 to-purple-400 hover:from-purple-600 hover:to-cyan-400 text-white py-2 px-6 rounded-full transition duration-300">Get Started</Link>
        </div>
      </header>

      {/* About Section */}
      <section className="py-16 bg-white text-center">
        <h2 className="text-4xl font-bold mb-4">Why Choose Our Event Platform?</h2>
        <p className="text-lg text-gray-600 mb-8">
          From conferences to concerts, we help you create, manage, and attend events with ease.
        </p>
        <div className="grid grid-cols-3 gap-x-8 max-w-6xl mx-auto">
          <div className="px-6 py-4  bg-gray-100 rounded-lg shadow-md flex flex-col gap-3 items-center">
            <h3 className="text-2xl font-semibold ">Simple to Use</h3>
            <p className="text-gray-500 text-center text-sm">Create or attend events with just a few clicks.</p>
            <img className="border w-80 h-60 object-cover object-top rounded-xl" src="https://images.unsplash.com/photo-1519336305162-4b6ed6b6fc83?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="px-6 py-4  bg-gray-100 rounded-lg shadow-md flex flex-col gap-3 items-center">
            <h3 className="text-2xl font-semibold ">Seamless Organization</h3>
            <p className="text-gray-500 text-center text-sm">Manage your events and attendees effortlessly.</p>
            <img className="border w-80 h-60 object-cover object-top rounded-xl" src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
          <div className="px-6 py-4  bg-gray-100 rounded-lg shadow-md flex flex-col gap-3 items-center">
            <h3 className="text-2xl font-semibold ">Global Access</h3>
            <p className="text-gray-500 text-center text-sm">Join events from anywhere in the world.</p>
            <img className="border w-80 h-60 object-cover object-top rounded-xl" src="https://images.unsplash.com/photo-1593870892572-50174ce8c0ae?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="" />
          </div>
        </div>
      </section>
      </div>

    <section className="bg-gray-50">
      <div className="flex flex-col gap-5 bg-gradient-to-tr from-indigo-600 via-purple-600 to-pink-500 p-3 py-8">
        <h3 className="text-center text-3xl text-zinc-100 font-semibold">Search Events</h3>
        <form className="flex justify-center items-stretch gap-2 w-1/3 mx-auto">
          <input className="w-full peer focus:scale-110 focus:outline-none focus:ring focus:ring-purple-500 bg-slate-200 rounded-full px-3 py-2 transition ease duration-200" type="text" placeholder="Search Events.." />
          <button className="px-3 peer-focus:scale-110 peer-focus:translate-x-6 transition ease duration-200 rounded-full bg-slate-200"><CiSearch /></button>
        </form>
        <div className="pt-3 grid grid-cols-5 gap-8 *:rounded-full *:text-gray-800 *:text-sm *:px-8 *:py-2 *:focus:ring *:focus:ring-purple-400 max-w-6xl mx-auto">
          <button className="bg-gray-200 focus:bg-amber-400 ">HEllo</button>
          <button className="bg-gray-200  focus:bg-pink-300">World</button>
          <button className="bg-gray-200 focus:bg-red-400">Party</button>
          <button className="bg-gray-200 focus:bg-cyan-400">Conference</button>
          <button className="bg-gray-200 focus:bg-emerald-400">WOrkshop</button>
        </div>
      </div>
      <div className="pt-4 px-16 rounded-t-xl ">
        <h2 className="text-zinc-900 text-center text-2xl mb-4 font-light">Featured Events</h2>
        <Carousel featured={featuredEvents}/>
      </div>
      <div className="mt-4 max-w-[66rem] mx-auto">
        <h2 className="text-zinc-900 text-center text-2xl mb-4 font-light">Upcoming Events</h2>
          <section className="grid grid-cols-3 gap-x-10">
            {upcomingEvents && upcomingEvents.map((event) => (
              <EventCard event={event}/>
            ))
            }
            <EventCard/>
            <EventCard/>
            <EventCard/>
          </section>

      </div>
    </section>
    </>
  ) 
};
export default Home;
