const db = require("../db");
const moment = require("moment");

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
      tags,
    } = req.body;
    console.log(tags);
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

        // insert tags
        tags.forEach((tag_name) => {
          let q2 = `insert ignore into event_tags(event_id, tag_name) values(?, ?);`;
          db.execute(q2, [results.insertId, tag_name], (err, results) => {
            if (err) {
              console.log(err);
            }
          });
        });

        return res
          .status(201)
          .json({ success: true, event_id: results.insertId });
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

const get_organized_by = async (req, res) => {
  try {
    const q = "SELECT * FROM events where organized_by = ?;";
    db.query(q, [req.params.id], (err, results) => {
      if (err) throw err;
      res.status(200).json({ success: true, events: results });
    });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};

const get_attended_by_me = async (req, res) => {
  try {
    const q =
      "SELECT * FROM events where event_id in (select event_id from attendance where user_id = ?);";
    db.query(q, [req.user.id], (err, results) => {
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
      if (err) throw err;
      if (result.length === 0)
        return res
          .status(404)
          .json({ success: false, message: "Event not found" });

      db.query(
        "select * from event_tags where event_id = ?",
        [id],
        (err2, result2) => {
          if (err2) {
            res.status(500).json({ success: false, error: err2.message });
            throw err2;
          }

          return res
            .status(200)
            .json({ success: true, event: { ...result[0], tags: result2 } });
        }
      );
    });
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
};

const get_can_review = (req, res) => {
  const { id } = req.params;
  const q = `select * from attendance where event_id = ? and user_id = ?;`;

  db.query(q, [id, req.user.id], (error, results) => {
    if (error) {
      res.status(500).json({ error: error });
      throw error;
    }

    if (results.length === 0) {
      return res.json({ attended: false, reviewed: false });
    } else {
      db.query(
        "select * from reviews where event_id = ? and user_id = ?;",
        [id, req.user.id],
        (error2, results2) => {
          if (error2) {
            res.status(500).json({ error: error2 });
            throw error2;
          }

          if (results2.length === 0) {
            return res.json({ attended: true, reviewed: false });
          } else {
            return res.json({ attended: true, reviewed: true });
          }
        }
      );
    }
  });
};

const get_analytics = (req, res) => {
  const { id } = req.params;

  // name
  const q1 = "select name from events where event_id = ?;";
  db.query(q1, [id], (error1, results1) => {
    if (error1) {
      res.status(500).json({ error: error1 });
      throw error1;
    }
    // users
    const q2 = `select u.*, r.*, t.*, a.created_at as 'attendance_created_at' from users u
inner join registrations r on u.user_id = r.user_id
left join attendance a on a.user_id = r.user_id
inner join tickets t on r.ticket_id = t.ticket_id
where r.event_id = ? and t.event_id = ? and r.status = 'Confirmed';`;

    db.query(q2, [id, id], (error2, results2) => {
      if (error2) {
        res.status(500).json({ error: error2 });
        throw error2;
      }

      res.json({ name: results1[0].name, results: results2 });
    });
  });
};

const mark_present = (req, res) => {
  const { user_id, id } = req.params;
  const q = `insert ignore into attendance(user_id, event_id) values(?, ?);`;
  db.query(q, [user_id, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
      throw error;
    }

    res.json(results);
  });
};

const mark_absent = (req, res) => {
  const { user_id, id } = req.params;
  const q = `delete from attendance where user_id = ? and event_id = ?`;
  db.query(q, [user_id, id], (error, results) => {
    if (error) {
      res.status(500).json(error);
      throw error;
    }

    res.json(results);
  });
};

const get_ticket_types = (req, res) => {
  const { id } = req.params;
  const q = `select * from tickets where event_id = ?;`;
  db.query(q, [id], (error, results) => {
    if (error) {
      res.status(500).json(error);
      throw error;
    }

    res.json(results);
  });
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

const get_categories = (req, res) => {
  db.query("select name from categories", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
};

const get_tags = (req, res) => {
  db.query("select name from tags", (err, results) => {
    if (err) {
      return res.status(500).json({ message: "Server error" });
    }

    res.json(results);
  });
};

const get_event_tags = (req, res) => {
  db.query(
    "select tag_name from event_tags where event_id = ?",
    [req.params.id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ message: "Server error" });
      }

      res.json(results);
    }
  );
};

const update_event = async (req, res) => {
  try {
    let { id } = req.params;
    let {
      name,
      description,
      capacity,
      venue,
      event_date,
      start_time,
      end_time,
      category,
      status,
      verified,
      image_url,
      tags,
    } = req.body;

    event_date = moment(event_date).format("YYYY-MM-DD HH:mm:ss");
    start_time = moment(event_date).format("HH:mm:ss");
    end_time = moment(event_date).format("HH:mm:ss");

    let q =
      "UPDATE events SET name = ?, description = ?, capacity = ?, venue = ?, event_date = ?, start_time = ?, end_time = ?, category = ?, status = ?, verified = ?, image_url = ? WHERE event_id = ?;";

    db.execute(
      q,
      [
        name,
        description,
        capacity,
        venue,
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

        // delete tags of that event
        let q1 = `delete from event_tags where event_id = ?;`;
        db.execute(q1, [id], (err, results) => {
          if (err) throw err;

          // insert tags
          tags.forEach((tag_name) => {
            let q2 = `insert ignore into event_tags(event_id, tag_name) values(?, ?);`;
            db.execute(q2, [id, tag_name], (err, results) => {
              if (err) {
                console.log(err);
              }
            });
          });
        });

        return res
          .status(200)
          .json({ success: true, message: "Event updated successfully" });
      }
    );
  } catch (error) {
    console.log(error);

    return res.status(500).json({ success: false, error: error.message });
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
  get_organized_by,
  get_attended_by_me,
  get_analytics,
  mark_present,
  mark_absent,
  get_categories,
  get_tags,
  get_event_tags,
  get_can_review,
};
