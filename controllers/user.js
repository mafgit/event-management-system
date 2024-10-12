const db = require("../db");

const get_users = async (req, res) => {
  try {
    const [results] = await db.query("SELECT * FROM users");
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const get_user = async (req, res) => {
  try {
    const { id } = req.params;
    const [results] = await db.query("SELECT * FROM users WHERE user_id = ?", [
      id,
    ]);
    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const create_user = async (req, res) => {
  try {
    const { first_name, last_name, email, password } = req.body;
    const result = await db.query(
      "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
      [first_name, last_name, email, password]
    );
    res
      .status(201)
      .json({ message: "User created", userId: result[0].insertId });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const update_user = async (req, res) => {
  try {
    const { id } = req.params;
    const { first_name, last_name, email, password } = req.body;
    const [result] = await db.query(
      "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?",
      [first_name, last_name, email, password, id]
    );
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User updated" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

const delete_user = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await db.query("DELETE FROM users WHERE user_id = ?", [
      id,
    ]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  get_users,
  get_user,
  create_user,
  update_user,
  delete_user,
};
