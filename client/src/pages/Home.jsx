import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { CiSearch } from "react-icons/ci";
import { IoTimeSharp } from "react-icons/io5";

const Home = () => {

  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [queryEvents, setQueryEvents] = useState([]);

  useEffect(() => {
    async function fetchFeaturedEvents () {
      try {
        const res = await fetch('https://localhost:5000/events/get_featured');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setFeaturedEvents(data);
      } catch (error) {
        console.log(error);
      }
    }

    async function fetchUpcomingEvents () {
      try {
        const res = await fetch('https://localhost:5000/events/get_upcoming');
        const data = await res.json();
        if(data.success === false){
          return;
        }
        setUpcomingEvents(data);
      } catch (error) {
        console.log(error);
      }
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
      <header className="relative bg-cover bg-center h-screen" style={{ backgroundImage: 'url("https://plus.unsplash.com/premium_photo-1681488484866-af8f282d59ce?q=80&w=1914&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D")' }}>
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
          <h1 className="text-5xl font-bold mb-4">Organize & Attend Events Effortlessly</h1>
          <p className="text-lg mb-8">Discover events near you or create your own.</p>
          <Link to={'/'} className="bg-gradient-to-tr from-purple-800 to-purple-400 hover:from-purple-600 hover:to-cyan-400 text-white py-2 px-6 rounded-full transition duration-300">Get Started</Link>
        </div>
      </header>


      <section className="bg-gray-50 pb-8">
        <div className="pt-4 px-16">
          <h2 className="text-zinc-900 text-center text-2xl mb-4 font-light">Featured Events</h2>
          <Carousel featured={featuredEvents}/>
        </div>
        <div className="mt-4 max-w-[66rem] mx-auto ">
          <h2 className="text-zinc-900 text-center text-2xl mb-4 font-light">Upcoming Events</h2>
            <section className="grid grid-cols-3 gap-x-10">
              {upcomingEvents && upcomingEvents.map((event) => (
                <>
                  <div className="bg-red-500 text-white p-2 rounded-lg">
                    Starts in: 3 Days, 12 Hours, 45 Mins
                  </div>
                  <EventCard event={event}/>
                </>
              ))
              }
              <div className="rounded-lg">
                <span className="text-rose-600 rounded p-2 flex items-center justify-center gap-2 font-bold"><IoTimeSharp className="text-lg"/> Starts in: <span className='italic tracking-widest text-xl ml-2 font-normal'>00:45:12</span></span>
                <EventCard/>
              </div>
              <div className="rounded-lg">
                <span className="text-rose-600 rounded p-2 flex items-center justify-center gap-2 font-bold"><IoTimeSharp className="text-lg"/> Starts in: <span className='italic tracking-widest text-xl ml-2 font-normal'>00:45:12</span></span>
                <EventCard/>
              </div>
              <div className="rounded-lg">
                <span className="text-rose-600 rounded p-2 flex items-center justify-center gap-2 font-bold"><IoTimeSharp className="text-lg"/> Starts in: <span className='italic tracking-widest text-xl ml-2 font-normal'>00:45:12</span></span>
                <EventCard/>
              </div>

            </section>
        </div>
      </section>
    
    {/* About Section */}
    <section className="py-16 bg-gradient-to-b from-white to-gray-100 text-center">
      <h2 className="text-4xl font-extrabold text-gray-800 mb-4">Why Choose Our Event Platform?</h2>
      <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
        From conferences to concerts, we help you create, manage, and attend events with ease and excitement.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
        <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
          <img className="w-full h-48 object-cover object-top rounded-t-lg" src="https://images.unsplash.com/photo-1519336305162-4b6ed6b6fc83?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Simple to Use" />
          <div className="px-6 py-4 flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">Simple to Use</h3>
            <p className="text-gray-500 text-center text-sm">Create or attend events with just a few clicks.</p>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
          <img className="w-full h-48 object-cover object-top rounded-t-lg" src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Seamless Organization" />
          <div className="px-6 py-4 flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">Seamless Organization</h3>
            <p className="text-gray-500 text-center text-sm">Manage your events and attendees effortlessly.</p>
          </div>
        </div>
        <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
          <img className="w-full h-48 object-cover object-top rounded-t-lg" src="https://images.unsplash.com/photo-1593870892572-50174ce8c0ae?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" alt="Global Access" />
          <div className="px-6 py-4 flex flex-col gap-3">
            <h3 className="text-2xl font-semibold text-gray-900">Global Access</h3>
            <p className="text-gray-500 text-center text-sm">Join events from anywhere in the world.</p>
          </div>
        </div>

      </div>
    </section>


    <section className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500">
      <div className="flex flex-col gap-6 p-5 py-10">
        <div className="text-center">
          <h3 className="text-5xl text-white font-extrabold mb-2">Search Events</h3>
          <p className="text-lg text-zinc-200">Don't miss out on the hottest events happening near you.</p>
        </div>

        {/* Search Bar */}
        <form className="flex justify-center items-stretch gap-3 w-full md:w-2/3 lg:w-1/2 mx-auto transition-transform transform focus-within:scale-105">
          <input 
            className="w-full focus:outline-none focus:ring-2 focus:ring-purple-500 bg-white text-gray-800 placeholder-gray-500 rounded-full px-6 py-3 shadow-lg transition ease-in-out duration-300" 
            type="text" 
            placeholder="Search Events..." 
          />
          <button className="px-5 py-3 rounded-full bg-white shadow-lg hover:bg-gray-200 transition ease-in-out duration-300">
            <CiSearch className="text-gray-600 text-xl" />
          </button>
        </form>

        {/* Category Buttons */}
        <div className="pt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4 max-w-4xl mx-auto">
          {["Music", "Tech", "Party", "Conference", "Workshop"].map((category, idx) => (
            <button
              key={idx}
              className="bg-gray-100 text-gray-700 hover:bg-indigo-400 hover:text-white focus:bg-yellow-600 focus:ring-2 focus:ring-purple-400 rounded-full py-2 px-8 font-medium shadow-md transition duration-200 transform hover:scale-105"
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Events Section */}
      <div className="bg-gray-50 rounded-t-[3rem]">
        <div className="p-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {queryEvents && queryEvents.map((event) => (
            <EventCard key={event.id} event={event} />
          ))}

          {/* Placeholder cards if no events are passed */}
          {[...Array(4)].map((_, index) => (
            <EventCard key={index} />
          ))}
        </div>
      </div>
    </section>

    <section className="py-16 bg-gray-100 text-center">
      <div className="grid grid-cols-3 gap-6 max-w-4xl mx-auto">
        <div>
          <h3 className="text-5xl font-bold">1,500+</h3>
          <p className="text-lg text-gray-500">Events Created</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold">10K+</h3>
          <p className="text-lg text-gray-500">Active Attendees</p>
        </div>
        <div>
          <h3 className="text-5xl font-bold">50+</h3>
          <p className="text-lg text-gray-500">Countries Reached</p>
        </div>
      </div>
    </section>

      {/* Create Event Call-to-Action Section */}
      <section className="py-16 bg-teal-600  backdrop-blur-lg text-white text-center relative">
          <h2 className="text-4xl font-bold mb-2">Ready to Create Your Own <span className="text-zinc-950">Event?</span></h2>
          <p className="text-md mb-10">Host amazing events effortlessly and reach a global audience.</p>
          <img className="max-w-4xl mx-auto" src="https://www.bizzabo.com/wp-content/uploads/2024/09/CC.png" alt="" />
          <Link to="/create-event" className="bg-gradient-to-tr from-zinc-900 to-zinc-800 hover:from-teal-600 hover:to-teal-200 text-lg  text-white py-3 px-16 rounded-lg transition duration-300 ">Start Creating</Link>
          <div className="absolute inset-0 bg-black opacity-20 -z-10 rounded-full top-40 bottom-8"></div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Join Thousands of Happy Event Organizers and Attendees
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-6xl font-bold text-purple-600 mb-4">
                <span className="counter" data-target="5000">0</span>+
              </h3>
              <p className="text-lg text-gray-600">Successful Events Organized</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-6xl font-bold text-pink-600 mb-4">
                <span className="counter" data-target="10000">0</span>+
              </h3>
              <p className="text-lg text-gray-600">Happy Attendees Worldwide</p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-xl transition transform hover:scale-105 hover:shadow-2xl">
              <h3 className="text-6xl font-bold text-yellow-600 mb-4">
                <span className="counter" data-target="200">0</span>+
              </h3>
              <p className="text-lg text-gray-600">Global Event Partners</p>
            </div>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-purple-200" 
                src="https://randomuser.me/api/portraits/men/32.jpg" 
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">"This platform made organizing my event a breeze. The tools are intuitive and the support team is fantastic!"</p>
              <h4 className="mt-4 font-semibold text-purple-600">John Doe</h4>
              <p className="text-sm text-gray-500">Event Organizer</p>
            </div>

            <div className="bg-gradient-to-b from-pink-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-pink-200" 
                src="https://randomuser.me/api/portraits/women/44.jpg" 
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">"Attending events has never been easier. I can find and register for events in seconds."</p>
              <h4 className="mt-4 font-semibold text-pink-600">Jane Smith</h4>
              <p className="text-sm text-gray-500">Attendee</p>
            </div>

            <div className="bg-gradient-to-b from-yellow-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img 
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-yellow-200" 
                src="https://randomuser.me/api/portraits/men/88.jpg" 
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">"Great platform for large-scale events. The customization options are top-notch."</p>
              <h4 className="mt-4 font-semibold text-yellow-600">Alex Johnson</h4>
              <p className="text-sm text-gray-500">Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-teal-400 to-teal-600 text-white text-center py-8">
        <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
        <p className="text-lg mb-6">Get notified about upcoming events and exclusive offers!</p>
        <form className="flex justify-center gap-1">
          <input type="email" className="w-80 px-6 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300" placeholder="Enter your email" />
          <button className="bg-white text-teal-600 px-6 py-2 rounded-r-lg">Subscribe</button>
        </form>
        <p className="text-sm mt-4 opacity-75">We respect your privacy. Unsubscribe anytime.</p>
      </section>
    </>
  ) 
};
export default Home;
