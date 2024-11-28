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

const update_status = async (req, res) => {
  const { status } = req.body;
  const { id } = req.params;
  const query = "UPDATE registrations SET status=? where registration_id=?";

  db.execute(
    query,
    [status == "Pending" ? "Confirmed" : "Pending", id],
    (error, result) => {
      // if (result.affectedRows === 0) {
      //   return res.status(404).json({ message: "Registration not found" });
      // }
      if (error) {
        console.log(error);

        return res
          .status(500)
          .json({ message: "Error updating status", error });
      }

      return res.status(200).json({ message: "Status updated successfully" });
    }
  );
};

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
