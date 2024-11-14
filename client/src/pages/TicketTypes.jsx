import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";

const TicketTypes = () => {
  const [tickets, setTickets] = useState([]);
  const { id } = useParams();
  // create usestate for form inputs

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [capacity, setCapacity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    axios
      .post("/tickets/create_ticket/" + id, {
        ticket_name: name,
        price,
        capacity,
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/tickets/get_tickets/" + id)
      .then((res) => {
        setTickets(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center flex-col">
      <form
        className="flex flex-col gap-3 items-center justify-center mt-10"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl">Create Ticket Type</h1>

        <div className="flex flex-col gap-2">
          <label className="text-center">Ticket Name:</label>
          <input
            className="bg-gray-300 px-4 py-2 rounded-full"
            type="text"
            name=""
            id=""
            placeholder="Ticket Name"
            required
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-center">Ticket Price:</label>
          <input
            className="bg-gray-300 px-4 py-2 rounded-full"
            type="number"
            name=""
            id=""
            placeholder="Ticket Price"
            required
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-2">
          <label className="text-center">Capacity:</label>
          <input
            className="bg-gray-300 px-4 py-2 rounded-full"
            type="number"
            name=""
            id=""
            placeholder="Capacity"
            required
            onChange={(e) => setCapacity(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-600 text-white w-full p-2 rounded-full"
        >
          Create ticket type
        </button>
      </form>

      <h1 className="font-bold text-xl mt-10">Ticket Types</h1>
      <table>
        <tr>
          <th className="p-5">Name</th>
          <th className="p-5">Price</th>
          <th className="p-5">Capacity</th>
          <th className="p-5">Action</th>
        </tr>

        {tickets.map((ticket) => {
          return (
            <tr>
              <td className="p-5">{ticket.ticket_name}</td>
              <td className="p-5">{ticket.price}</td>
              <td className="p-5">{ticket.capacity}</td>
              <td
                className="p-5"
                onClick={() => {
                  axios
                    .delete(
                      "/tickets/delete_ticket/" + id + "/" + ticket.ticket_id
                    )
                    .then((res) => {
                      window.location.reload();
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              >
                <button
                  onClick={() => {
                    axios
                      .delete(
                        "/tickets/delete_ticket_type/" +
                          id +
                          "/" +
                          ticket.ticket_id
                      )
                      .then((res) => {
                        window.location.reload();
                      })
                      .catch((err) => {
                        console.log(err);
                        toast.error("Couldn't delete this ticket type");
                      });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </table>
      <ToastContainer />
    </div>
  );
};

export default TicketTypes;
