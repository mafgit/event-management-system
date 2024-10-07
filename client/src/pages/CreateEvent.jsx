import { useState } from 'react'
import { RxUpload } from "react-icons/rx";
import { BsCalendarDate } from "react-icons/bs";
import { LuAlarmClock } from "react-icons/lu";
import { IoImage } from "react-icons/io5";
import { HiChevronDoubleDown } from "react-icons/hi2";

function CreateEvent() {
  const [eventDate, setEventDate] = useState('')
  const [startTime, setStartTime] = useState('')
  const [endTime, setEndTime] = useState('')
  const [headerImage, setHeaderImage] = useState('')

  const handleSubmit = () => {

  }

  const handleHeaderImageUpload = () => {

  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-48 sm:h-64 md:h-80">
            {headerImage ? (
              <img src={headerImage} alt="Event header" className="w-full h-full object-cover" />
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
                <label htmlFor="header-image-upload" className="cursor-pointer flex flex-col items-center">
                  <RxUpload className="w-12 h-12 text-white mb-2" />
                  <span className="text-white text-lg font-semibold">Upload Header Image</span>
                </label>
                <input
                  id="header-image-upload"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleHeaderImageUpload}
                />
              </div>
            )}
          </div>
          
          <div className="px-4 py-8 sm:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Create Your Epic Event</h1>
              <p className="text-xl text-gray-600">Let's make something unforgettable</p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="col-span-2">
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Give your event a catchy name"
                  />
                </div>

                <div className="col-span-2">
                  <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    rows={3}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your amazing event"
                  ></textarea>
                </div>

                <div>
                  <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="How many can attend?"
                  />
                </div>

                <div>
                  <label htmlFor="venue" className="block text-sm font-medium text-gray-700">
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Where's it happening?"
                  />
                </div>

                <div>
                  <label htmlFor="organized_by" className="block text-sm font-medium text-gray-700">
                    Organized By
                  </label>
                  <input
                    type="text"
                    name="organized_by"
                    id="organized_by"
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Who's behind this awesome event?"
                  />
                </div>

                <div>
                  <label htmlFor="event_date" className="block text-sm font-medium text-gray-700">
                    Event Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="date"
                      name="event_date"
                      id="event_date"
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={eventDate}
                      onChange={(e) => setEventDate(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <BsCalendarDate className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="start_time" className="block text-sm font-medium text-gray-700">
                    Start Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="time"
                      name="start_time"
                      id="start_time"
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={startTime}
                      onChange={(e) => setStartTime(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <LuAlarmClock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="end_time" className="block text-sm font-medium text-gray-700">
                    End Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="time"
                      name="end_time"
                      id="end_time"
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                      value={endTime}
                      onChange={(e) => setEndTime(e.target.value)}
                    />
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <LuAlarmClock className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-gray-700">
                    Category
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      id="category"
                      name="category"
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select a category</option>
                      <option value="conference">Conference</option>
                      <option value="seminar">Seminar</option>
                      <option value="workshop">Workshop</option>
                      <option value="party">Party</option>
                      <option value="other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <HiChevronDoubleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div>
                  <label htmlFor="status" className="block text-sm font-medium text-gray-700">
                    Status
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      id="status"
                      name="status"
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select a status</option>
                      <option value="draft">Draft</option>
                      <option value="published">Published</option>
                      <option value="cancelled">Cancelled</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <HiChevronDoubleDown className="h-5 w-5 text-gray-400" aria-hidden="true" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    id="verified"
                    name="verified"
                    type="checkbox"
                    className="h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  <label htmlFor="verified" className="ml-2 block text-sm text-gray-700">
                    Verified Event
                  </label>
                </div>

                <div className="col-span-2">
                  <label htmlFor="image_url" className="block text-sm font-medium text-gray-700">
                    Event Image
                  </label>
                  <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                    <div className="space-y-1 text-center">
                      <IoImage className="mx-auto h-12 w-12 text-gray-400" aria-hidden="true" />
                      <div className="flex text-sm text-gray-600">
                        <label
                          htmlFor="image_url"
                          className="relative cursor-pointer bg-white rounded-md font-medium text-purple-600 hover:text-purple-500 focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-purple-500"
                        >
                          <span>Upload a file</span>
                          <input id="image_url" name="image_url" type="file" className="sr-only" />
                        </label>
                        <p className="pl-1">or drag and drop</p>
                      </div>
                      <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-300 ease-in-out transform hover:-translate-y-1 hover:scale-105"
                >
                  Create Epic Event
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}

export default CreateEvent;
