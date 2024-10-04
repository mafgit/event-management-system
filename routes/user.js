const router = require("express").Router();
const { get_users } = require("../controllers/user");

router.get("/get_users", get_users);
// router.get("/get_user/:id", get_user);
// router.post("/create_user", create_user);
// router.put("/update_user/:id", update_user);
// router.delete("/delete_user/:id", delete_user);

module.exports = router;
