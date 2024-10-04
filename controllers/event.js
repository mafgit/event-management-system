const db = require("../db");

const create_event = (req, res) => {
  const {
    name,
    description,
    capacity,
    venue,
    organized_by,
    event_date,
    start_time,
    end_time,
    category,
    status,
    verified,
    image_url,
  } = req.body;

  const q =
    "INSERT INTO events (name, description, capacity, venue, organized_by, event_date, start_time, end_time, category, status, verified, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";
  db.execute(
    q,
    [
      name,
      description,
      capacity,
      venue,
      organized_by,
      event_date,
      start_time,
      end_time,
      category,
      status,
      verified,
      image_url,
    ],
    (err, results) => {
      if (err) res.status(500).json({ success: false, error: error.message });
      else res.status(201).json({ success: true, event_id: results.insertId });
    }
  );
};

module.exports = {
  create_event,
};
