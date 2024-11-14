const db = require("../db");

const get_tickets = (req, res) => {
  const { id } = req.params;

  // const query = "SELECT * FROM tickets WHERE event_id = ?";
  const query = `SELECT 
  t.ticket_name,
  t.price,
  t.capacity,
  (t.capacity - IFNULL(COUNT(r.registration_id), 0)) AS tickets_left
FROM 
  tickets t
LEFT JOIN 
  registrations r 
  ON t.ticket_name = r.ticket_name AND r.status = 'Confirmed'
WHERE 
  t.event_id = ?
GROUP BY 
  t.ticket_name;
`;
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tickets" });
    }

    res.status(200).json({ tickets: result });
  });
};

// const get_ticket = (req, res) => {
//   const ticketId = req.params.id;

//   const query = "SELECT * FROM tickets WHERE ticket_id = ?";
//   db.query(query, [ticketId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Error fetching ticket" });
//     }
//     if (result.length === 0) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }
//     res.status(200).json(result[0]);
//   });
// };

const create_ticket = (req, res) => {
  const { id } = req.params;
  const { ticket_name, price, capacity } = req.body;

  const query =
    "INSERT INTO tickets (event_id, ticket_name, price, capacity) VALUES (?, ?, ?, ?)";
  db.query(query, [id, ticket_name, price, capacity], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating ticket" });
    }
    res.status(201).json({ message: "Ticket created successfully!" });
  });
};

// const update_ticket = (req, res) => {
//   const ticketId = req.params.id;
//   const { ticketType, price } = req.body;

//   const query =
//     "UPDATE tickets SET ticket_type = ?, price = ? WHERE ticket_id = ?";
//   db.query(query, [ticketType, price, ticketId], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Error updating ticket" });
//     }
//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Ticket not found" });
//     }
//     res.status(200).json({ message: "Ticket updated successfully!" });
//   });
// };

const delete_ticket = (req, res) => {
  const { id, ticket_id } = req.params;

  const query = "DELETE FROM tickets WHERE ticket_id = ? and event_id = ?";
  db.query(query, [ticket_id, id], (err, result) => {
    if (err) {
      console.log(err);

      return res.status(500).json({ message: "Error deleting ticket" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket deleted successfully!" });
  });
};

module.exports = {
  get_tickets,
  //   get_ticket,
  create_ticket,
  //   update_ticket,
  delete_ticket,
};
