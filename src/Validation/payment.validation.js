const { body, param,validationResult } = require("express-validator");

const validatePayment = [
    param("id")
        .notEmpty()
        .withMessage("شناسه سفارش الزامی است")
        .isInt({ min: 1 })
        .withMessage("شناسه سفارش باید یک عدد صحیح مثبت باشد")
];
const validatePaymentVerify = [
  body("paymentId")
    .notEmpty()
    .withMessage("شناسه پرداخت الزامی است")
    .isInt({ min: 1 })
    .withMessage("شناسه پرداخت باید یک عدد صحیح مثبت باشد")
];
const checkValidation = (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
        return res.status(400).json({
            errors: errors.array()
        });
    }

    next();
};

module.exports = {
   validatePayment,
   validatePaymentVerify,
   checkValidation
};