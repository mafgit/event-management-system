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
        window.location.reload();
        toast.success("Ticket created successfully!");
        console.log(res);
      })
      .catch((err) => {
        toast.error(err.response.data.message);
        console.log(err);
      });
  };

  useEffect(() => {
    axios
      .get("/tickets/get_tickets/" + id)
      .then((res) => {
        setTickets(res.data.tickets);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [id]);

  return (
    <div className="flex justify-center items-center flex-col">
      <form
        className="flex flex-col gap-3 items-center justify-center mt-10 bg-gray-200 p-8 rounded-md"
        onSubmit={handleSubmit}
      >
        <h1 className="font-bold text-xl">Create Ticket Type</h1>

        <div className="flex flex-col gap-2">
          <label className="text-center">Ticket Name:</label>
          <input
            className="bg-gray-100 px-4 py-2 rounded-full"
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
            className="bg-gray-100 px-4 py-2 rounded-full"
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
            className="bg-gray-100 px-4 py-2 rounded-full"
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

      <div className="bg-gray-200 rounded-md p-8 flex flex-col items-center justify-center my-10">
        <h1 className="font-bold text-xl mb-5">Ticket Types</h1>
        <table className="text-center">
          <thead>
            <tr>
              <th className="px-5 text-left">Name</th>
              <th className="px-5 text-left">Price</th>
              <th className="px-5 text-left">Capacity</th>
              <th className="px-5 text-left">Action</th>
            </tr>
          </thead>

          <tbody>
            {tickets.map((ticket) => {
              return (
                <tr key={ticket.ticket_id}>
                  <td className="p-5">
                    <p className=" bg-purple-500 text-white p-1 w-max rounded-full px-3 text-center">
                      {ticket.ticket_name}
                    </p>
                  </td>
                  <td className="p-5">{ticket.price}</td>
                  <td className="p-5">{ticket.capacity}</td>
                  <td className="p-5">
                    <button
                      className="btn bg-red-600 px-3 py-[3px] rounded-full text-white"
                      onClick={() => {
                        // axios
                        //   .delete(
                        //     "/tickets/delete_ticket_type/" +
                        //       id +
                        //       "/" +
                        //       ticket.ticket_id
                        //   )
                        //   .then((res) => {
                        //     window.location.reload();
                        //     toast.success("Ticket deleted successfully!");
                        //   })
                        //   .catch((err) => {
                        //     console.log(err);
                        //     toast.error("Couldn't delete this ticket type");
                        //   });
                        axios
                          .delete("/tickets/delete_ticket/" + ticket.ticket_id)
                          .then((res) => {
                            window.location.reload();
                            toast.success("Ticket deleted successfully!");
                          })
                          .catch((err) => {
                            //     console.log(err);
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
          </tbody>
        </table>
      </div>
      <ToastContainer />
    </div>
  );
};

export default TicketTypes;
