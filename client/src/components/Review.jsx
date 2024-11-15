import { useContext } from "react";
import { FaStar, FaUser, FaRegStar, FaTrash } from "react-icons/fa6";
import { AuthContext } from "../App";
import axios from "axios";

const Review = ({ review_id, name, user_id, text, rating }) => {
  const { userId } = useContext(AuthContext);

  return (
    <div className="flex flex-col bg-gray-200 max-w-[500px] rounded-md p-4 min-w-[400px]">
      <div className="flex items-center">
        <FaUser />
        <h1 className="ml-3">{name}</h1>

        <div className="flex gap-1 ml-auto">
          {Array(rating)
            .fill(1)
            .map((i) => (
              <FaStar className="text-yellow-500" />
            ))}
          {rating < 5 &&
            Array(5 - rating)
              .fill(1)
              .map((i) => <FaRegStar className="text-yellow-500" />)}

          {userId == user_id && (
            <FaTrash
              className="text-red-500 ml-2 btn"
              onClick={() => {
                axios
                  .delete("/reviews/delete_review/" + review_id)
                  .then((res) => {
                    window.location.reload();
                  });
              }}
            />
          )}
        </div>
      </div>
      <p className="italic text-gray-600">{text}</p>
    </div>
  );
};

export default Review;
