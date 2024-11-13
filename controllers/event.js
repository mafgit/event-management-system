const db = require("../db");

const create_event = async (req, res) => {
  try {
    const {
      name,
      description,
      capacity,
      venue,
      event_date,
      start_time,
      end_time,
      category,
      image_url,
    } = req.body;
    const verified = req.body.verified ?? false;
    const status = req.body.verified ?? "Upcoming"; //Canceled, Featured, Completed, Postponed

    const q =
      "INSERT INTO events (name, description, capacity, venue, organized_by, event_date, start_time, end_time, category, status, verified, image_url) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?);";

    db.execute(
      q,
      [
        name,
        description,
        capacity,
        venue,
        req.user.id,
        event_date,
        start_time,
        end_time,
        category,
        status,
        verified,
        image_url,
      ],
      (err, results) => {
        if (err) throw err;
        res.status(201).json({ success: true, event_id: results.insertId });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_events = async (req, res) => {
  try {
    const q = "SELECT * FROM events;";
    db.query(q, (err, results) => {
      if (err) throw err;
      res.status(200).json({ success: true, events: results });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_event = async (req, res) => {
  try {
    const { id } = req.params;
    const q =
      "SELECT e.*, concat(u.first_name, ' ', u.last_name) as organizer_name FROM events e inner join users u on e.organized_by = u.user_id WHERE e.event_id = ?;";
    db.query(q, [id], (err, result) => {
      console.log(result);

      if (err) throw err;
      if (result.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      res.status(200).json({ success: true, event: result[0] });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_featured = async (req, res) => {
  try {
    const q =
      "SELECT * FROM events WHERE event_date >= CURDATE() ORDER BY Attendees DESC, event_date ASC LIMIT 10;";
    db.query(q, (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      res.status(200).json({ success: true, event: result[0] });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_upcoming = async (req, res) => {
  try {
    const q =
      "SELECT * FROM events WHERE event_date >= CURDATE() ORDER BY event_date DESC LIMIT 3;";
    db.query(q, (err, result) => {
      if (err) throw err;
      if (result.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      res.status(200).json({ success: true, event: result[0] });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const update_event = async (req, res) => {
  try {
    const { id } = req.params;
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
      "UPDATE events SET name = ?, description = ?, capacity = ?, venue = ?, organized_by = ?, event_date = ?, start_time = ?, end_time = ?, category = ?, status = ?, verified = ?, image_url = ? WHERE id = ?;";

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
        id,
      ],
      (err, results) => {
        if (err) throw err;
        if (results.affectedRows === 0)
          return res
            .status(404)
            .json({ success: false, message: "Event not found" });
        res
          .status(200)
          .json({ success: true, message: "Event updated successfully" });
      }
    );
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const delete_event = async (req, res) => {
  try {
    const { id } = req.params;
    const q = "DELETE FROM events WHERE id = ?;";
    db.execute(q, [id], (err, results) => {
      if (err) throw err;
      if (results.affectedRows === 0)
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });
      res
        .status(200)
        .json({ success: true, message: "Event deleted successfully" });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

module.exports = {
  create_event,
  get_events,
  get_event,
  get_featured,
  get_upcoming,
  update_event,
  delete_event,
};
