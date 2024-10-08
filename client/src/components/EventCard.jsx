import { FaBuilding, FaPeopleGroup } from "react-icons/fa6";

const EventCard = ({
  image_url = "form-bg-1.jpg",
  name = "My Event",
  capacity = 100,
  venue = "Abcd, efgh, ijkl",
  edit = false,
}) => {
  return (
    <div className="border-slate-200 border rounded-xl flex flex-col justify-between min-h-[125px] group overflow-hidden">
      <div className="relative h-[125px] w-full overflow-hidden">
        <img
          src={image_url}
          alt="event-pic"
          className="w-full h-full object-cover rounded-t-xl absolute left-0 top-0 z-10 group-hover:scale-110 transition ease-linear duration-150"
        />
        {/* <div className="rounded-t-xl absolute left-0 top-0 w-full h-full opacity-50 bg-black z-20 "></div> */}
      </div>
      <div className="p-2 flex flex-col gap-2">
        <h1 className="text-lg font-bold text-center">{name}</h1>
        <div className="flex flex-wrap gap-3 justify-center items-center">
          <div className="flex gap-1 justify-center items-center">
            <FaPeopleGroup className="text-blue-600" />
            {capacity}
          </div>

          <div className="flex gap-1 justify-center items-center">
            <FaBuilding className="text-blue-600" />
            {venue}
          </div>
        </div>
        {edit && (
          <button className="btn border-[1px] bg-gray-100 border-blue-600 text-black w-full p-1 rounded-md">
            Edit Event
          </button>
        )}
        <button className="btn bg-gradient-to-r from-blue-600 text-white to-pink-800 w-full p-1 rounded-md">
          Show Event
        </button>
      </div>
    </div>
  );
};

export default EventCard;
