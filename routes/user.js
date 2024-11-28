const router = require("express").Router();
const {
  get_users,
  get_user,
  create_user,
  update_user,
  delete_user,
  update_admin,
} = require("../controllers/user");
const { verifyAdmin, verifyToken } = require("../utils/verifyUser");

router.get("/get_users", get_users);
router.get("/get_user/:id", get_user);
router.post("/create_user", create_user);
router.put("/update_user/:id", update_user);
router.delete("/delete_user/:id", verifyToken, verifyAdmin, delete_user);
router.put("/update_admin/:id", verifyToken, verifyAdmin, update_admin);

module.exports = router;
