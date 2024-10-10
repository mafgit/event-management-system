const router = require("express").Router();
const {
  get_tickets,
  get_ticket,
  create_ticket,
  update_ticket,
  delete_ticket,
} = require("../controllers/ticket");

router.get("/get_tickets", get_tickets);
router.get("/get_ticket/:id", get_ticket);
router.post("/create_ticket", create_ticket);
router.put("/update_ticket/:id", update_ticket);
router.delete("/delete_ticket/:id", delete_ticket);

module.exports = router;
