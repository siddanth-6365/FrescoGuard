const express = require("express");
const { createUser, loginUser, getUser } = require("../controller/user");
const catchAsync = require('../utils/CatchAsync');
const router = express.Router();

router.post("/createuser", createUser);
router.post("/login", loginUser);

router.get("/logout", (req, res) => {
  res.clearCookie("token").json("User logged out");
});

router.route("/getuser/:id")
    .get(catchAsync(getUser));

module.exports = router;
