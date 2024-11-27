const router = require("express").Router();
const {
  get_reviews,
  get_review,
  create_review,
  update_review,
  delete_review,
  get_all_reviews,
} = require("../controllers/review");

router.get("/get_all_reviews", get_all_reviews);
router.get("/get_reviews/:id", get_reviews);
router.get("/get_review/:id", get_review);
router.post("/create_review", create_review);
router.put("/update_review/:id", update_review);
router.delete("/delete_review/:reviewId", delete_review);

module.exports = router;
