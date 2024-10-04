const { create_event } = require("../controllers/event");

const router = require("express").Router();

router.post("/create_event", create_event);
router.get("/get_events", get_events);
router.get("/get_event/:id", get_event);
router.put("/update_event/:id", update_event);
router.delete("/delete_event/:id", delete_event);

module.exports = router;