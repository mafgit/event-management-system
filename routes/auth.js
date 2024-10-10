const { signup, signin, google, signout } = require("../controllers/auth.js");

const router = require("express").Router();

router.post("/signup", signup);
router.post("/signin", signin);
router.post("/google", google);
router.post("/signout", signout)

module.exports = router;