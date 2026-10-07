
const {
    body,
    param,
    validationResult
} = require("express-validator");


const status = [
    body("status")
        .notEmpty()
        .withMessage("پر کردن این فیلد الزامی می‌باشد")
        .isIn([
            "pending",
            "paid",
            "processing",
            "shipped",
            "delivered",
            "cancelled"
        ])
        .withMessage("وضعیت سفارش نامعتبر است")
];


const validateOrderId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("شناسه سفارش نامعتبر است")
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
    status,
    validateOrderId,
    checkValidation
};

