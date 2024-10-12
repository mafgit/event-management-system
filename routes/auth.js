const {
  signup,
  signin,
  google,
  signout,
  get_login_data,
} = require("../controllers/auth.js");
const { verifyToken, verifyAdmin } = require("../utils/verifyUser.js");
const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout); // verify token?
router.get("/get_login_data", verifyToken, get_login_data);

module.exports = router;
