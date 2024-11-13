const db = require("../db");

const get_users = (req, res) => {
  db.query("SELECT * FROM users", [], (error, results) => {
    if (error) {
      return;
      res.status(500).json({ error: error.message });
    }

    res.status(200).json(results);
  });
};

const get_user = (req, res) => {
  const { id } = req.params;
  db.query("SELECT * FROM users WHERE user_id = ?", [id], (error, results) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }

    if (results.length === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(results[0]);
  });
};

const create_user = (req, res) => {
  const { first_name, last_name, email, password } = req.body;
  db.query(
    "INSERT INTO users (first_name, last_name, email, password) VALUES (?, ?, ?, ?)",
    [first_name, last_name, email, password],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }
      res
        .status(201)
        .json({ message: "User created", userId: result[0].insertId });
    }
  );
};

const update_user = (req, res) => {
  const { id } = req.params;
  const { first_name, last_name, email, password } = req.body;
  db.query(
    "UPDATE users SET first_name = ?, last_name = ?, email = ?, password = ? WHERE user_id = ?",
    [first_name, last_name, email, password, id],
    (error, result) => {
      if (error) {
        return res.status(500).json({ error: error.message });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated" });
    }
  );
};

const delete_user = (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM users WHERE user_id = ?", [id], (error, result) => {
    if (error) {
      return res.status(500).json({ error: error.message });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted" });
  });
};

module.exports = {
  get_users,
  get_user,
  create_user,
  update_user,
  delete_user,
};
