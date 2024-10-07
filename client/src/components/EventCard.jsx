import { FaPeopleGroup } from "react-icons/fa6";

const EventCard = ({event}) => {
  return (
    <div className="border-slate-200 border rounded-xl flex flex-col justify-between min-h-[17rem] group overflow-hidden">
      <div className="relative h-[125px] w-full overflow-hidden">
        <img
          src={event.image_url}
          alt="event-pic"
          className="w-full h-full object-cover rounded-t-xl absolute left-0 top-0 z-10 group-hover:scale-110 transition ease-linear duration-150"
        />
        <h1 className="z-30 absolute text-white bottom-2 left-2 text-lg">
          {event.name}
        </h1>
        <div className="rounded-t-xl absolute left-0 top-0 w-full h-full opacity-50 bg-black z-20 "></div>
      </div>
      <div className="p-2 flex flex-col gap-4">
        <div className="flex flex-wrap gap-2 justify-center items-center">
          <div className="flex gap-1 justify-center items-center">
            {event.capacity}<FaPeopleGroup className="text-blue-600" /> 250
          </div>

          <div className="flex gap-1 justify-center items-center">
            {event.venue}<FaPeopleGroup className="text-blue-600" /> 250
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
          Show Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
