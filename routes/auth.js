const { signup, signin, google, signout } = require("../controllers/auth.js");
const { verifyToken, verifyAdmin } = require("../utils/verifyUser.js");
const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout); // verify token?

module.exports = router;
