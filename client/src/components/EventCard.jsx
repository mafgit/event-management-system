import { FaPeopleGroup } from "react-icons/fa6";

const EventCard = () => {
  return (
    <div className="w-[250px] border-slate-200 border-[1px] rounded-sm flex flex-col">
      <div className="relative h-[125px] w-full">
        <img
          src="/form-bg-1.jpg"
          alt="event-pic"
          className="w-full h-full object-cover absolute left-0 top-0 z-10"
        />
        <h1 className="z-30 absolute text-white bottom-2 left-2 text-lg">
          Event Name
        </h1>
        <div className="absolute left-0 top-0 w-full h-full opacity-50 bg-black z-20"></div>
      </div>
      <div className="p-2 flex flex-col gap-1">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" /> 250
          </div>

          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" /> 250
          </div>

          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" /> 250
          </div>

          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" /> 250
          </div>

          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" /> 250
          </div>
        </div>
        <button className="bg-gradient-to-r from-blue-600 text-white to-pink-800 w-full p-1 rounded-md">
          Open Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
