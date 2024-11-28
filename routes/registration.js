const {
  create_registration,
  get_registrations,
  get_registration,
  update_registration,
  delete_registration,
  update_status,
} = require("../controllers/registration.js");

const { verifyAdmin, verifyToken } = require("../utils/verifyUser");

const router = require("express").Router();

// router.post("/create_registration", create_registration);
router.get("/get_registrations", get_registrations);
router.get("/get_registration/:id", get_registration);
router.put(
  "/update_registration/:id",
  verifyToken,
  verifyAdmin,
  update_registration
);
router.put("/update_status/:id", verifyToken, verifyAdmin, update_status);
// router.delete("/delete_registration/:id", delete_registration);

module.exports = router;
