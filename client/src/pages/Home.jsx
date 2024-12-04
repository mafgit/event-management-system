import React, { useEffect, useState } from "react";
import Carousel from "../components/Carousel";
import EventCard from "../components/EventCard";
import { Link } from "react-router-dom";
import { IoTimeSharp } from "react-icons/io5";
import axios from "axios";

const Home = () => {
  const [featuredEvents, setFeaturedEvents] = useState([]);
  const [upcomingEvents, setUpcomingEvents] = useState([]);
  const [timeLeft, setTimeLeft] = useState("");

  useEffect(() => {
    async function fetchFeaturedEvents() {
      try {
        const response = await axios.get(
          "http://localhost:5000/events/get_featured"
        );
        if (response.data.success === false) {
          return;
        }
        setFeaturedEvents(response.data.events);
        // console.log(featuredEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }

    async function fetchUpcomingEvents() {
      try {
        const response = await axios.get(
          "http://localhost:5000/events/get_upcoming"
        );
        if (response.data.success === false) {
          return;
        }
        setUpcomingEvents(response.data.events);
        // console.log(upcomingEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    }
    fetchFeaturedEvents();
    fetchUpcomingEvents();
  }, []);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const now = new Date();
      const updatedTimeLeft = {};

      upcomingEvents.forEach((event) => {
        const startDateTime = new Date(
          `${event.event_date.split("T")[0]}T${event.start_time}`
        );
        const difference = startDateTime - now;
        console.log(startDateTime);

        if (difference <= 0) {
          updatedTimeLeft[event.event_id] = "00:00:00"; // Event started or passed
        } else {
          const hours = String(
            Math.floor(difference / (1000 * 60 * 60))
          ).padStart(2, "0");
          const minutes = String(
            Math.floor((difference / (1000 * 60)) % 60)
          ).padStart(2, "0");
          const seconds = String(Math.floor((difference / 1000) % 60)).padStart(
            2,
            "0"
          );

          updatedTimeLeft[event.event_id] = `${hours}:${minutes}:${seconds}`;
        }
      });
      console.log(timeLeft);

      setTimeLeft(updatedTimeLeft);
    };

    // Run every second
    const timer = setInterval(calculateTimeLeft, 1000);
    // calculateTimeLeft();
    // // Clean up the interval on component unmount
    return () => clearInterval(timer);
  }, [upcomingEvents]);

  return (
    <>
      <header
        className="relative bg-cover bg-[40%] h-screen"
        style={{
          backgroundImage:
            'url("https://images.pexels.com/photos/6344448/pexels-photo-6344448.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2")',
        }}
      >
        <div className="absolute inset-0 bg-black bg-opacity-30"></div>
        <div className="relative z-10 flex flex-col items-center justify-center text-center text-white h-full">
          <h1 className="text-5xl font-bold mb-4">
            Organize & Attend Events Effortlessly
          </h1>
          <p className="text-lg mb-8">
            Discover events near you or create your own.
          </p>
          <Link
            to={"/search"}
            className="bg-gradient-to-tr from-purple-800 to-purple-400 hover:from-purple-600 hover:to-cyan-400 text-white py-2 px-6 rounded-full transition duration-300"
          >
            Get Started
          </Link>
        </div>
      </header>

      <section className="bg-gray-50 pb-8">
        <div className="pt-4 px-16">
          <h2 className="pt-14 pb-10 text-zinc-900 text-center text-4xl mb-4 font-extrabold">
            Featured Events
          </h2>
          <div className="shadow-2xl rounded-3xl">
            <Carousel featured={featuredEvents} />
          </div>
        </div>
        <div className="mt-4 max-w-[80rem] mx-auto ">
          <h2 className="pt-10 text-zinc-900 text-center text-3xl mb-4 font-bold">
            Upcoming Events
          </h2>
          <section className="flex flex-wrap justify-center items-center gap-5">
            {upcomingEvents &&
              upcomingEvents.map((event, idx) => (
                <>
                  <div className="rounded-lg min-w-[400px]">
                    <span className="text-rose-600 rounded p-2 flex items-center justify-center gap-1 font-normal text-sm">
                      <IoTimeSharp className="text-md" /> Starts in:{" "}
                      <span className="text-sm ml-1 tracking-widest font-semibold">
                        {timeLeft[event.event_id]}
                      </span>
                    </span>
                    <EventCard
                      image_url={event.image_url}
                      name={event.name}
                      capacity={event.capacity}
                      venue={event.venue}
                      id={event.event_id}
                      category={event.category}
                      event_date={event.event_date}
                      status={event.status}
                    />
                  </div>
                </>
              ))}
          </section>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 bg-gradient-to-b from-white to-gray-100 text-center">
        <h2 className="text-4xl font-extrabold text-gray-800 mb-4">
          Why Choose Our Event Platform?
        </h2>
        <p className="text-lg text-gray-600 mb-8 max-w-xl mx-auto">
          From conferences to concerts, we help you create, manage, and attend
          events with ease and excitement.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10 max-w-6xl mx-auto">
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
            <img
              className="w-full h-48 object-cover object-top rounded-t-lg"
              src="https://images.unsplash.com/photo-1519336305162-4b6ed6b6fc83?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Simple to Use"
            />
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                Simple to Use
              </h3>
              <p className="text-gray-500 text-center text-sm">
                Create or attend events with just a few clicks.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
            <img
              className="w-full h-48 object-cover object-top rounded-t-lg"
              src="https://images.unsplash.com/photo-1603539947678-cd3954ed515d?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Seamless Organization"
            />
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                Seamless Organization
              </h3>
              <p className="text-gray-500 text-center text-sm">
                Manage your events and attendees effortlessly.
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center bg-gray-100 rounded-lg shadow-lg transform transition-transform hover:scale-105 duration-300">
            <img
              className="w-full h-48 object-cover object-top rounded-t-lg"
              src="https://images.unsplash.com/photo-1593870892572-50174ce8c0ae?q=80&w=1770&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              alt="Global Access"
            />
            <div className="px-6 py-4 flex flex-col gap-3">
              <h3 className="text-2xl font-semibold text-gray-900">
                Global Access
              </h3>
              <p className="text-gray-500 text-center text-sm">
                Join events from anywhere in the world.
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="pb-16 pt-3 bg-gray-100 text-center">
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
      <section className="py-16 bg-gradient-to-r from-teal-600 to-teal-400  backdrop-blur-lg text-white text-center relative">
        <h2 className="text-4xl font-bold mb-2">
          Ready to Create Your Own <span className="text-zinc-950">Event?</span>
        </h2>
        <p className="text-md mb-10">
          Host amazing events effortlessly and reach a global audience.
        </p>
        <img
          className="max-w-4xl mx-auto"
          src="https://www.bizzabo.com/wp-content/uploads/2024/09/CC.png"
          alt=""
        />
        <Link
          to="/create-event"
          className="bg-gradient-to-tr from-zinc-900 to-zinc-800 hover:from-teal-600 hover:to-teal-200 text-lg  text-white py-3 px-16 rounded-2xl transition duration-300"
        >
          Start Creating
        </Link>
        <div className="mx-auto max-w-4xl absolute inset-0 bg-white opacity-10 -z-10 rounded-full top-40 bottom-8"></div>
      </section>

      {/* Testimonials */}
      <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-extrabold text-gray-900 mb-12">
            Hear From Our Past Users
          </h2>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="bg-gradient-to-b from-purple-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-purple-200"
                src="https://randomuser.me/api/portraits/men/32.jpg"
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">
                "This platform made organizing my event a breeze. The tools are
                intuitive and the support team is fantastic!"
              </p>
              <h4 className="mt-4 font-semibold text-purple-600">John Doe</h4>
              <p className="text-sm text-gray-500">Event Organizer</p>
            </div>

            <div className="bg-gradient-to-b from-pink-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-pink-200"
                src="https://randomuser.me/api/portraits/women/44.jpg"
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">
                "Attending events has never been easier. I can find and register
                for events in seconds."
              </p>
              <h4 className="mt-4 font-semibold text-pink-600">Jane Smith</h4>
              <p className="text-sm text-gray-500">Attendee</p>
            </div>

            <div className="bg-gradient-to-b from-yellow-50 to-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-transform transform hover:scale-105">
              <img
                className="w-16 h-16 rounded-full mx-auto mb-4 shadow-sm border-4 border-yellow-200"
                src="https://randomuser.me/api/portraits/men/88.jpg"
                alt="Testimonial"
              />
              <p className="text-gray-600 text-sm italic">
                "Great platform for large-scale events. The customization
                options are top-notch."
              </p>
              <h4 className="mt-4 font-semibold text-yellow-600">
                Alex Johnson
              </h4>
              <p className="text-sm text-gray-500">Partner</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="bg-gradient-to-r from-teal-400 to-teal-600 text-white text-center py-8">
        <h3 className="text-3xl font-bold mb-4">Stay Updated</h3>
        <p className="text-lg mb-6">
          Get notified about upcoming events and exclusive offers!
        </p>
        <form className="flex justify-center gap-1">
          <input
            type="email"
            className="w-80 px-6 py-2 rounded-l-lg focus:outline-none focus:ring-2 focus:ring-teal-300 transition duration-300"
            placeholder="Enter your email"
          />
          <button className="bg-white text-teal-600 px-6 py-2 rounded-r-lg">
            Subscribe
          </button>
        </form>
        <p className="text-sm mt-4 opacity-75">
          We respect your privacy. Unsubscribe anytime.
        </p>
      </section>
    </>
  );
};
export default Home;
