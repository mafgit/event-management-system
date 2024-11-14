const {
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
} = require("../controllers/event.js");
const {
  verifyToken,
  verifyAdmin,
  verifyOrganizer,
  verifyAdminOrOrganizer,
} = require("../utils/verifyUser.js");
const router = require("express").Router();

router.post("/create_event", verifyToken, create_event);
router.get("/get_events", get_events);
router.get("/get_organized_by/:id", get_organized_by);
router.get("/get_attended_by_me", verifyToken, get_attended_by_me);
router.get(
  "/get_analytics/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  get_analytics
);
router.get(
  "/mark_present/:id/:user_id",
  verifyToken,
  verifyAdminOrOrganizer,
  mark_present
);
router.get(
  "/mark_absent/:id/:user_id",
  verifyToken,
  verifyAdminOrOrganizer,
  mark_absent
);
router.get("/get_event/:id", get_event);
router.get("/get_featured", get_featured);
router.get("/get_upcoming", get_upcoming);
router.put(
  "/update_event/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  update_event
);
router.delete(
  "/delete_event/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  delete_event
);

module.exports = router;
