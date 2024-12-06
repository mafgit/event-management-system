const db = require("../db");

const get_all_tickets = (req, res) => {
  const query = "SELECT * FROM tickets";

  db.query(query, (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tickets" });
    }

    res.status(200).json(result);
  });
};

const get_tickets = (req, res) => {
  const { id } = req.params;

  // const query = "SELECT * FROM tickets WHERE event_id = ?";
  const query = `SELECT 
  t.ticket_id,
  t.ticket_name,
  t.price,
  t.capacity,
  (t.capacity - IFNULL(COUNT(r.registration_id), 0)) AS tickets_left
FROM 
  tickets t
LEFT JOIN 
  registrations r 
  ON t.ticket_id = r.ticket_id AND r.status = 'Confirmed'
WHERE 
  t.event_id = ?
GROUP BY 
  t.ticket_id;
`;
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching tickets" });
    }

    res.status(200).json({ tickets: result });
  });
};

const get_tickets_with_status = (req, res) => {
  const { id } = req.params;

  const query = `SELECT 
  t.ticket_id,
  t.ticket_name,
  t.price,
  t.capacity,
  EXISTS (
    SELECT 1 
    FROM registrations r 
    WHERE r.ticket_id = t.ticket_id 
      AND r.user_id = ?
  ) AS has_registered,
  EXISTS (
    SELECT 1 
    FROM registrations r 
    WHERE r.ticket_id = t.ticket_id 
      AND r.user_id = ?
      AND r.status = 'Confirmed'
  ) AS has_paid
FROM 
  tickets t
WHERE 
  t.event_id = ?;

`;
  db.query(query, [req.user.id, req.user.id, id], (err, result) => {
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
      console.log(err);
      if(err.sqlState === '45000'){
        return res.status(500).json({ message: "Ticket capacity exceeds remaining event capacity!" });
      }
      return res.status(500).json({ message: "Error creating ticket" });
    }
     res.status(201).json({ message: "Ticket created successfully!" });
  });
};

const update_ticket = (req, res) => {
  const ticketId = req.params.id;
  const { ticket_name, price, capacity } = req.body;

  const query =
    "UPDATE tickets SET ticket_name = ?, price = ?, capacity = ? WHERE ticket_id = ?";
  db.query(query, [ticket_name, price, capacity, ticketId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating ticket" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket updated successfully!" });
  });
};

const delete_ticket = (req, res) => {
  const { ticket_id } = req.params;
  // don't delete if payments have been done
  const q =
    'select * from registrations where ticket_id = ? and status = "Confirmed";';
  db.query(q, [ticket_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting ticket (1)" });
    }
    if (result.length > 0) {
      return res.status(400).json({ message: "Ticket has payments" });
    }

    const query = "DELETE FROM tickets WHERE ticket_id = ?";
    db.query(query, [ticket_id], (err, result) => {
      if (err) {
        console.log(err);

        return res.status(500).json({ message: "Error deleting ticket" });
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "Ticket not found" });
      }
      res.status(200).json({ message: "Ticket deleted successfully!" });
    });
  });
};

// const register_ticket = (req, res) => {
//   const { id, ticket_id } = req.body;

//   // if capacity - tickets_bought = 0, reject
//   const query1 = `select * from registrations where event_id = ? and user_id = ?;`; // if found, reject
//   db.query(query1, [id, req.user.id], (err, result) => {
//     if (err) {
//       return res.status(500).json({ message: "Error registering ticket (1)" });
//     }
//     if (result.length > 0) {
//       return res.status(400).json({ message: "Ticket already registered" });
//     }

//     const query2 = `select count(*) as tickets_bought from registrations where event_id = ? and ticket_id = ? and status = 'Confirmed';`;
//     db.query(query2, [id, ticket_id], (err2, result2) => {
//       if (err2) {
//         console.log(err2);

//         return res
//           .status(500)
//           .json({ message: "Error registering ticket (2)" });
//       }

//       const query3 = `select capacity, price from tickets where event_id = ? and ticket_id = ?;`;
//       db.query(query3, [id, ticket_id], (err3, result3) => {
//         if (err3) {
//           console.log(err3);

//           return res
//             .status(500)
//             .json({ message: "Error registering ticket (3)" });
//         }

//         if (result2[0].tickets_bought >= result3[0].capacity) {
//           return res.status(400).json({ message: "Ticket sold out" });
//         }

//         const query4 =
//           "INSERT INTO registrations (event_id, user_id, ticket_id, status, amount) VALUES (?, ?, ?, ?, ?)";
//         db.query(
//           query4,
//           [id, req.user.id, ticket_id, "Pending", result3[0].price],
//           (err4, result4) => {
//             if (err4) {
//               console.log(err4);

//               return res
//                 .status(500)
//                 .json({ message: "Error registering ticket (4)" });
//             }
//             return res.status(201).json({
//               message: "Ticket registered, but pending until payment!",
//             });
//           }
//         );
//       });
//     });
//   });
// };

// show: transaction
const register_ticket = async (req, res) => {
  const { id, ticket_id } = req.body;

  try {
    // getting db connection
    const connection = await db.promise().getConnection();

    try {
      await connection.beginTransaction();

      // if already registered, reject
      const query1 = `SELECT * FROM registrations WHERE event_id = ? AND user_id = ?;`;
      const [result1] = await connection.execute(query1, [id, req.user.id]);

      if (result1.length > 0) {
        throw new Error("Ticket already registered");
      }

      // counting tickets that have been bought
      const query2 = `SELECT COUNT(*) AS tickets_bought FROM registrations WHERE event_id = ? AND ticket_id = ? AND status = 'Confirmed';`;
      const [result2] = await connection.execute(query2, [id, ticket_id]);

      // getting capacity and price from tickets
      const query3 = `SELECT capacity, price FROM tickets WHERE event_id = ? AND ticket_id = ?;`;
      const [result3] = await connection.execute(query3, [id, ticket_id]);

      if (result2[0].tickets_bought >= result3[0].capacity) {
        throw new Error("Ticket sold out");
      }

      // inserting registration
      const query4 = `INSERT INTO registrations (event_id, user_id, ticket_id, status, amount) VALUES (?, ?, ?, ?, ?);`;
      const [result4] = await connection.execute(query4, [
        id,
        req.user.id,
        ticket_id,
        "Pending",
        result3[0].price,
      ]);

      // commit
      await connection.commit();
      connection.release();

      res.status(201).json({
        message: "Ticket registered, but pending until payment!",
      });
    } catch (error) {
      // Rollback the transaction in case of error
      await connection.rollback();
      connection.release();
      res.status(400).json({ message: error.message });
    }
  } catch (error) {
    // Handle unexpected errors
    res.status(500).json({ message: "Error registering ticket", error });
  }
};

const unregister_ticket = (req, res) => {
  const { id, ticket_name, ticket_id } = req.body;
  // console.log(id, ticket_name);

  const query = `DELETE FROM registrations WHERE event_id = ? and user_id = ? and ticket_id = ?;`;
  db.query(query, [id, req.user.id, ticket_id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error unregistering ticket" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Ticket not found" });
    }
    res.status(200).json({ message: "Ticket unregistered successfully!" });
  });
};

module.exports = {
  get_tickets,
  //   get_ticket,
  create_ticket,
  update_ticket,
  delete_ticket,
  register_ticket,
  unregister_ticket,
  get_tickets_with_status,
  get_all_tickets,
};
