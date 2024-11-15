const db = require("../db");

const get_reviews = (req, res) => {
  const id = req.params.id;

  const query =
    "SELECT r.*, concat(u.first_name, ' ', u.last_name) as name FROM reviews r inner join users u on r.user_id = u.user_id WHERE event_id = ?";
  db.query(query, [id], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching reviews" });
    }

    res.status(200).json(result);
  });
};

const get_review = (req, res) => {
  const reviewId = req.params.reviewId;

  const query = "SELECT * FROM reviews WHERE review_id = ?";
  db.query(query, [reviewId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error fetching review" });
    }
    if (result.length === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json(result[0]);
  });
};

const create_review = (req, res) => {
  const { eventId, userId, text, rating } = req.body;

  const query =
    "INSERT INTO reviews (event_id, user_id, text, rating) VALUES (?, ?, ?, ?)";
  db.query(query, [eventId, userId, text, rating], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error creating review" });
    }
    res.status(201).json({ message: "Review created successfully!" });
  });
};

const update_review = (req, res) => {
  const reviewId = req.params.reviewId;
  const { text, rating } = req.body;

  const query = "UPDATE reviews SET text = ?, rating = ? WHERE review_id = ?";
  db.query(query, [text, rating, reviewId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error updating review" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review updated successfully!" });
  });
};

const delete_review = (req, res) => {
  const reviewId = req.params.reviewId;

  const query = "DELETE FROM reviews WHERE review_id = ?";
  db.query(query, [reviewId], (err, result) => {
    if (err) {
      return res.status(500).json({ message: "Error deleting review" });
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ message: "Review not found" });
    }
    res.status(200).json({ message: "Review deleted successfully!" });
  });
};

module.exports = {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
};
