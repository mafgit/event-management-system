const router = require("express").Router();
const {
  get_tickets,
  // get_ticket,
  create_ticket,
  // update_ticket,
  delete_ticket,
  register_ticket,
  unregister_ticket,
  get_tickets_with_status,
  get_all_tickets,
} = require("../controllers/ticket");
const { verifyAdminOrOrganizer, verifyToken } = require("../utils/verifyUser");

router.get("/get_tickets/:id", get_tickets);
router.get("/get_all_tickets", get_all_tickets);
router.get(
  "/get_tickets_with_status/:id",
  verifyToken,
  get_tickets_with_status
);
// router.get("/get_ticket/:id", get_ticket);
router.post(
  "/create_ticket/:id",
  verifyToken,
  verifyAdminOrOrganizer,
  create_ticket
);
router.post("/register_ticket", verifyToken, register_ticket);
router.delete("/unregister_ticket", verifyToken, unregister_ticket);
// router.put("/update_ticket/:id", update_ticket);
router.delete(
  "/delete_ticket/:id/:ticket_id",
  verifyToken,
  verifyAdminOrOrganizer,
  delete_ticket
);

module.exports = router;
