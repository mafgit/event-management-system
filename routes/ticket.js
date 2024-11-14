const router = require("express").Router();
const {
  get_tickets,
  // get_ticket,
  create_ticket,
  // update_ticket,
  delete_ticket,
} = require("../controllers/ticket");
const { verifyAdminOrOrganizer, verifyToken } = require("../utils/verifyUser");

router.get(
  "/get_tickets/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  get_tickets
);
// router.get("/get_ticket/:id", get_ticket);
router.post(
  "/create_ticket/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  create_ticket
);
// router.put("/update_ticket/:id", update_ticket);
router.delete(
  "/delete_ticket/:id/:ticket_id",
  verifyToken,
  verifyAdminOrOrganizer,
  delete_ticket
);

module.exports = router;
