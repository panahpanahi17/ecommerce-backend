const { query } = require("express-validator");
const validateProductQuery = [
    query("page")
        .optional()
        .isInt({ min: 1 })
        .withMessage("page باید عدد صحیح مثبت باشد"),

    query("limit")
        .optional()
        .isInt({ min: 1 })
        .withMessage("limit باید عدد صحیح مثبت باشد"),
    query("minPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("حداقل قیمت باید عددی غیرمنفی باشد"),

    query("maxPrice")
    .optional()
    .isFloat({ min: 0 })
    .withMessage("حداکثر قیمت باید عددی غیرمنفی باشد"),

    query("categoryId")
    .optional()
    .isInt({ min: 1 })
    .withMessage("شناسه دسته‌بندی باید عدد صحیح مثبت باشد"),
    
    query("sort")
    .optional()
    .isIn(["price_asc", "price_desc"])
    .withMessage("مقدار sort نامعتبر است"),
];

module.exports = {
    validateProductQuery
};