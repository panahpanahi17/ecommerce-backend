const { body, validationResult } = require("express-validator");
const validategategory=[
    body("name")
        .trim()
        .notEmpty()
        .withMessage("نام دسته‌بندی الزامی است")

        .isString()
        .withMessage("نام دسته‌بندی باید رشته باشد")

        .isLength({ min: 2, max: 30 })
        .withMessage("نام دسته‌بندی باید بین 2 تا 30 کاراکتر باشد")

        .matches(/^[A-Za-zآ-ی\s]+$/)
        .withMessage("نام دسته‌بندی نباید شامل عدد یا کاراکتر غیرمجاز باشد")
];
const validateCategoryUpdate = [
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام دسته‌بندی الزامی است")
    .isString()
    .withMessage("نام دسته‌بندی باید رشته باشد")
    .isLength({ min: 2, max: 30 })
    .withMessage("نام دسته‌بندی باید بین 2 تا 30 کاراکتر باشد"),
];
const checkValidation = (req,res,next) => {

 const errors= validationResult(req);

 if (!errors.isEmpty()) {

 return res.status(400).json({

errors: errors.array()
});
}
next();

}; 
module.exports = {
    validategategory,
    validateCategoryUpdate,
    checkValidation
};