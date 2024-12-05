const db = require("../db");

const create_registration = async (req, res) => {
  const { a, b, c } = req.body;

  const query = "INSERT INTO registrations (a,b,c) VALUES (?,?,?)";

  try {
    const [result] = await db.execute(query, [a, b, c]);
    res.status(201).json({
      message: "Registration created successfully",
      id: result.insertId,
    });
  } catch (error) {
    res.status(500).json({ message: "Error creating registration", error });
  }
};

const get_registrations = async (req, res) => {
  const query = "SELECT * FROM registrations";

  // try {
  //   const [rows] = await db.execute(query);

  //   res.status(200).json(rows);
  // } catch (error) {
  //   console.log(error);

  //   res.status(500).json({ message: "Error fetching registrations", error });
  // }

  db.execute(query, (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error fetching registrations", error });
    }
    res.status(200).json(result);
  });
};

const get_registration = async (req, res) => {
  const query = "SELECT * FROM registrations WHERE registration_id = ?";
  const { id } = req.params;

  try {
    const [rows] = await db.execute(query, [id]);
    if (rows.length === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json(rows[0]);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registration", error });
  }
};

const update_registration = async (req, res) => {
  const { event_id, user_id, ticket_id, status, amount } = req.body;
  // name ???
  const { id } = req.params;
  const query =
    "UPDATE registrations SET event_id=?,user_id=?,ticket_id=?,status=?,amount=? where registration_id=?";

  db.execute(
    query,
    [event_id, user_id, ticket_id, status, amount, id],
    (error, result) => {
      // if (result.affectedRows === 0) {
      //   return res.status(404).json({ message: "Registration not found" });
      // }
      if (error) {
        console.log(error);

        return res
          .status(500)
          .json({ message: "Error updating registration", error });
      }

      return res
        .status(200)
        .json({ message: "Registration updated successfully" });
    }
  );
};

// const update_status = async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;
//   const query = "UPDATE registrations SET status=? where registration_id=?";

//   db.execute(
//     query,
//     [status == "Pending" ? "Confirmed" : "Pending", id],
//     (error, result) => {
//       // if (result.affectedRows === 0) {
//       //   return res.status(404).json({ message: "Registration not found" });
//       // }
//       if (error) {
//         console.log(error);

//         return res
//           .status(500)
//           .json({ message: "Error updating status", error });
//       }

//       return res.status(200).json({ message: "Status updated successfully" });
//     }
//   );
// };

const update_status = (req, res) => {
  const { status } = req.body;
  const { id } = req.params;

  const registrationQuery =
    "SELECT ticket_id, status FROM registrations WHERE registration_id = ?";

  db.execute(registrationQuery, [id], (error, registration) => {
    if (error) {
      console.error(error);
      return res
        .status(500)
        .json({ message: "Error fetching registration", error });
    }

    if (registration.length === 0) {
      console.log("err1");
      return res.status(404).json({ message: "Registration not found" });
    }

    const ticketId = registration[0].ticket_id;
    const currentStatus = registration[0].status;

    if (currentStatus === "Confirmed" && status === "Pending") {
      console.log("err2");
      return res
        .status(400)
        .json({ message: "Registration is already confirmed" });
    }

    if (status === "Pending") {
      const ticketQuery = `
        SELECT 
          capacity, 
          (capacity - (
            SELECT COUNT(*) 
            FROM registrations 
            WHERE ticket_id = ? AND status = 'Confirmed'
          )) AS tickets_left
        FROM tickets 
        WHERE ticket_id = ?
      `;

      db.execute(ticketQuery, [ticketId, ticketId], (error, ticket) => {
        if (error) {
          console.error(error);
          return res
            .status(500)
            .json({ message: "Error fetching ticket information", error });
        }

        if (ticket.length === 0) {
          console.log("err3");
          return res.status(404).json({ message: "Ticket not found" });
        }

        if (ticket[0].tickets_left <= 0) {
          console.log("err4");
          return res
            .status(400)
            .json({ message: "No tickets available for confirmation" });
        }

        const updateQuery =
          "UPDATE registrations SET status=? WHERE registration_id=?";
        db.execute(
          updateQuery,
          [currentStatus == "Pending" ? "Confirmed" : "Pending", id],
          (error, result) => {
            if (error) {
              console.error(error);
              return res
                .status(500)
                .json({ message: "Error updating status", error });
            }

            return res
              .status(200)
              .json({ message: "Status updated successfully" });
          }
        );
      });
    } else {
      const updateQuery =
        "UPDATE registrations SET status=? WHERE registration_id=?";
      db.execute(
        updateQuery,
        [currentStatus == "Pending" ? "Confirmed" : "Pending", id],
        (error, result) => {
          if (error) {
            console.error(error);
            return res
              .status(500)
              .json({ message: "Error updating status", error });
          }

          return res
            .status(200)
            .json({ message: "Status updated successfully" });
        }
      );
    }
  });
};

// const update_status = async (req, res) => {
//   const { status } = req.body;
//   const { id } = req.params;

//   try {
//     const connection = await db.promise().getConnection();

//     try {
//       await connection.beginTransaction();

//       // using for update to lock rows during a transaction
//       const lockQuery = `SELECT status, ticket_id FROM registrations WHERE registration_id=? FOR UPDATE`;
//       const [registration] = await connection.execute(lockQuery, [id]);
//       console.log("registration: ", registration);

//       if (registration.length === 0) {
//         throw new Error("Registration not found");
//       }

//       // Check the current status
//       if (registration[0].status === "Confirmed" && status === "Confirmed") {
//         throw new Error("Registration is already confirmed");
//       }
//       // if (registration[0].status === "Pending" && status === "Pending") {
//       //   throw new Error("Registration is already pending");
//       // }

//       // Check ticket availability
//       const ticketQuery = `SELECT
//   capacity,
//   (capacity - (
//     SELECT COUNT(*)
//     FROM registrations
//     WHERE ticket_id = ? AND status = 'Confirmed'
//   )) AS tickets_left
// FROM tickets
// WHERE ticket_id = ? FOR UPDATE`;

//       const [ticket] = await connection.execute(ticketQuery, [
//         registration[0].ticket_id,
//         registration[0].ticket_id,
//       ]);

//       if (ticket.length === 0) {
//         throw new Error("Ticket not found");
//       }

//       if (ticket[0].tickets_left < 1 && status === "Confirmed") {
//         throw new Error("No tickets available");
//       }

//       // Update the registration status
//       const updateStatusQuery = `UPDATE registrations SET status=? WHERE registration_id=?`;
//       const [result] = await connection.execute(updateStatusQuery, [
//         status,
//         id,
//       ]);

//       if (result.affectedRows === 0) {
//         throw new Error("Failed to update registration status");
//       }

//       await connection.commit();
//       connection.release();

//       res.status(200).json({ message: "Status updated successfully" });
//     } catch (error) {
//       await connection.rollback();
//       connection.release();
//       console.log("error: ", error);

//       res.status(400).json({ message: error.message });
//     }
//   } catch (error) {
//     res.status(500).json({ message: "Error updating status", error });
//   }
// };

const delete_registration = (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM registrations WHERE registration_id = ?";

  db.query(query, [id], (error, result) => {
    if (error) {
      return res
        .status(500)
        .json({ message: "Error deleting registration", error });
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json({ message: "Registration deleted successfully" });
  });
};

module.exports = {
  create_registration,
  get_registrations,
  get_registration,
  update_registration,
  delete_registration,
  update_status,
};
