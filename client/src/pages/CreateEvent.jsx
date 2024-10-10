import { useContext, useEffect, useRef, useState } from "react";
import { app } from "../firebase";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { RxUpload } from "react-icons/rx";
import { MdError } from "react-icons/md";
import { HiChevronDown } from "react-icons/hi2";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

import { AuthContext } from "../App";

function CreateEvent() {
  const navigate = useNavigate();
  const { userId } = useContext(AuthContext);
  const imageRef = useRef(null);
  const [isUploading, setIsUploading] = useState(false);
  const [imageUploadError, setImageUploadError] = useState(false);
  const [dateError, setDateError] = useState(false);
  const [startTimeError, setStartTimeError] = useState(false);
  const [endTimeError, setEndTimeError] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    capacity: "",
    venue: "",
    organized_by: "",
    event_date: "",
    start_time: "",
    end_time: "",
    category: "",
    image_url: null,
  });

  async function handleSubmit(e) {
    e.preventDefault();

    if(!validateDateTime()) return;
    if (!formData.image_url){
          window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
      return setImageUploadError('Cover Image must be uploaded!');
    } 
    try {
      const res = await axios.post('/events/create_event', {...formData, organized_by: userId}, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
      return setImageUploadError("Cover Image must be uploaded!");
    }
    try {
      const res = await axios.post(
        "http://localhost:5000/events/create_event",
        { ...formData, organized_by: userId },
        {
          withCredentials: true,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await res.data;
      if (data.success === false) {
        console.log("Event creation failed!");
        return;
      }
      navigate(`/event/${data.event_id}`);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));

    if (id === "event_date") {
      validateDate(value);
    } else if (id === "start_time" || id === "end_time") {
      validateTime();
    }
  };

  const validateDate = (date) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const selectedDate = new Date(date);

    if (selectedDate < today) {
      setDateError("Event date cannot be in the past");
    } else {
      setDateError("");
    }
  };

  const validateTime = () => {
    const { event_date, start_time, end_time } = formData;
    if (!event_date) return;
    const now = new Date();
    const eventDate = new Date(event_date);

    if (start_time) {
      const startDateTime = new Date(`${event_date}T${start_time}`);
      if (
        eventDate.toDateString() === now.toDateString() &&
        startDateTime < now
      ) {
        setStartTimeError("Start time cannot be in the past");
      } else {
        setStartTimeError("");
      }
    }

    if (start_time && end_time) {
      const endDateTime = new Date(`${event_date}T${end_time}`);
      if (endDateTime <= new Date(`${event_date}T${start_time}`)) {
        setEndTimeError("End time must be after start time");
      } else {
        setEndTimeError("");
      }
    }
  };

  const validateDateTime = () => {
    validateDate(formData.event_date);
    validateTime();
    return !dateError && !startTimeError && !endTimeError;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    setImageUploadError(false);
    if (file) {
      setIsUploading(true);
      storeImage(file)
        .then((downloadURL) => {
          setFormData((prev) => {
            return { ...prev, image_url: downloadURL };
          });
          setIsUploading(false);
          console.log("File available at", downloadURL);
        })
        .catch((error) => {
          setIsUploading(false);
          setImageUploadError("Upload failed! More than 10 MB exceeded");
          console.error("Error uploading file:", error);
        });
    }
  };

  async function storeImage(image) {
    return new Promise((resolve, reject) => {
      const storage = getStorage(app);
      const fileName = new Date().getTime + image.name;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, image);
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log(progress);
        },
        (error) => {
          reject(error);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            resolve(downloadURL);
          });
        }
      );
    });
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-100 via-white to-purple-100">
      <div className="max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="bg-white bg-opacity-80 backdrop-blur-lg rounded-3xl shadow-2xl overflow-hidden">
          <div className="relative h-48 sm:h-64 md:h-80 overflow-hidden">
            {imageUploadError && (
              <span className="text-xs text-red-600 flex justify-center items-center gap-1">
                <MdError />
                {imageUploadError}
              </span>
            )}
            {isUploading ? (
              <div className="absolute inset-0 flex items-center justify-center bg-gray-200 bg-opacity-75">
                <AiOutlineLoading3Quarters className="w-12 h-12 text-purple-600 animate-spin" />
              </div>
            ) : formData.image_url ? (
              <button
                type="button"
                className="w-full h-full"
                onClick={() => imageRef.current.click()}
              >
                <img
                  src={formData.image_url}
                  alt="Event header"
                  className="w-full h-full object-cover"
                />
              </button>
            ) : (
              <div className="w-full h-full bg-gradient-to-r from-purple-300 to-blue-300 flex items-center justify-center">
                <label
                  htmlFor="header-image-upload"
                  className="cursor-pointer flex flex-col items-center"
                >
                  <RxUpload className="w-12 h-12 text-white mb-2" />
                  <span className="text-white text-lg font-semibold">
                    Upload Header Image
                  </span>
                </label>
              </div>
            )}

            <input
              ref={imageRef}
              id="header-image-upload"
              type="file"
              accept="image/*"
              className="hidden"
              required
              onChange={(e) => handleImageUpload(e)}
            />
          </div>

          <div className="px-4 py-8 sm:px-10">
            <div className="mb-10 text-center">
              <h1 className="text-4xl font-extrabold text-gray-900 mb-2">
                Create Your Epic Event
              </h1>
              <p className="text-xl text-gray-600">
                Let's make something unforgettable
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-2">
                <div className="col-span-2">
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Give your event a catchy name"
                  />
                </div>

                <div className="col-span-2">
                  <label
                    htmlFor="description"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Description
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows={3}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Describe your amazing event"
                  ></textarea>
                </div>

                <div>
                  <label
                    htmlFor="capacity"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Capacity
                  </label>
                  <input
                    type="number"
                    name="capacity"
                    id="capacity"
                    value={formData.capacity}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="How many can attend?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="venue"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Venue
                  </label>
                  <input
                    type="text"
                    name="venue"
                    id="venue"
                    value={formData.venue}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Where's it happening?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="organized_by"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Organized By
                  </label>
                  <input
                    type="text"
                    name="organized_by"
                    id="organized_by"
                    value={formData.organized_by}
                    onChange={handleChange}
                    required
                    className="mt-1 block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                    placeholder="Who's behind this awesome event?"
                  />
                </div>

                <div>
                  <label
                    htmlFor="event_date"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Event Date
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="date"
                      name="event_date"
                      id="event_date"
                      value={formData.event_date}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      required
                      className={`block w-full border-2 ${
                        dateError ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>
                  {dateError && (
                    <span className="text-sm text-red-600 flex items-center gap-1 p-1">
                      <MdError />
                      {dateError}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="start_time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Start Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="time"
                      name="start_time"
                      id="start_time"
                      value={formData.start_time}
                      onChange={handleChange}
                      required
                      className={`text-purple-600 block w-full border-2 ${
                        startTimeError ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>
                  {startTimeError && (
                    <span className="text-sm text-red-600 flex items-center gap-1 p-1">
                      <MdError />
                      {startTimeError}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="end_time"
                    className="block text-sm font-medium text-gray-700"
                  >
                    End Time
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <input
                      type="time"
                      name="end_time"
                      id="end_time"
                      value={formData.end_time}
                      onChange={handleChange}
                      required
                      className={`text-purple-600 block w-full border-2 ${
                        endTimeError ? "border-red-300" : "border-gray-300"
                      } rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent`}
                    />
                  </div>
                  {endTimeError && (
                    <span className="text-sm text-red-600 flex items-center gap-1 p-1">
                      <MdError />
                      {endTimeError}
                    </span>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="category"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Category
                  </label>
                  <div className="mt-1 relative rounded-md shadow-sm">
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      required
                      className="block w-full border-2 border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent appearance-none"
                    >
                      <option value="">Select a category</option>
                      <option value="Conference">Conference</option>
                      <option value="Seminar">Seminar</option>
                      <option value="Workshop">Workshop</option>
                      <option value="Party">Party</option>
                      <option value="Other">Other</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                      <HiChevronDown
                        className="h-5 w-5 text-gray-400"
                        aria-hidden="true"
                      />
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
  );
}

export default CreateEvent;
