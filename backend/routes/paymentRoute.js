const express = require("express");

const {
  checkout,
  paymentVerification,
} = require("../controllers/paymentController.js");

const { isAuthenticatedUser } = require("../middleware/auth");

const router = express.Router();


router.route("/checkout").post(isAuthenticatedUser, checkout);

router.route("/paymentverification").post(isAuthenticatedUser, paymentVerification);

module.exports = router;
