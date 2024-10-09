const { create_event, get_events, get_event, get_featured, get_upcoming, update_event, delete_event } = require("../controllers/event.js");

const router = require("express").Router();

router.post("/create_event", create_event);
router.get("/get_events", get_events);
router.get("/get_event/:id", get_event);
router.get("/get_featured", get_featured);
router.get("/get_upcoming", get_upcoming);
router.put("/update_event/:id", update_event);
router.delete("/delete_event/:id", delete_event);

module.exports = router;
