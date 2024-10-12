const db = require("../db");

const create_registration = async (req, res) => {
  const { a, b, c } = req.body;
  const query = "INSERT INTO registrations (a,b,c) VALUES (?,?,?)";

  try {
    const [result] = await db.execute(query, [a, b, c]);
    res
      .status(201)
      .json({
        message: "Registration created successfully",
        id: result.insertId,
      });
  } catch (error) {
    res.status(500).json({ message: "Error creating registration", error });
  }
};

const get_registrations = async (req, res) => {
  const query = "SELECT * FROM registrations";

  try {
    const [rows] = await db.execute(query);
    res.status(200).json(rows);
  } catch (error) {
    res.status(500).json({ message: "Error fetching registrations", error });
  }
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
  const { name, email, event_id } = req.body;
  // name ???
  const { id } = req.params;
  const query = "UPDATE registration SET a=?, b=?, c=?";

  try {
    const [result] = await db.execute(query, [a, b, c]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json({ message: "Registration updated successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error updating registration", error });
  }
};

const delete_registration = async (req, res) => {
  const { id } = req.params;
  const query = "DELETE FROM registrations WHERE registration_id = ?";

  try {
    const [result] = await db.execute(query, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Registration not found" });
    }
    res.status(200).json({ message: "Registration deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting registration", error });
  }
};

module.exports = {
  create_registration,
  get_registrations,
  get_registration,
  update_registration,
  delete_registration,
};
