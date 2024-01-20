const express = require("express");
const router = express.Router();
const catchAsync = require('../utils/CatchAsync');

const {sendAlertEmail} =require("../controller/Alert/alertMail")

router.route("/sendalert")
    .post(catchAsync(sendAlertEmail))

module.exports = router;