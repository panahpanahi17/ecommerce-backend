const express = require("express");
const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const {
  validatePayment,
  validatePaymentVerify,
  checkValidation
} = require("../Validation/payment.validation");

const {
  createPayment,
  verifyPayment
} = require("../controllers/Payment.controller");

// ایجاد درخواست پرداخت

// تأیید پرداخت
router.post(
  "/verify",
  authMiddleware,
  validatePaymentVerify,
  checkValidation,
  verifyPayment
);
router.post(
  "/:id",
  authMiddleware,
  validatePayment,
  checkValidation,
  createPayment
);

module.exports = router;