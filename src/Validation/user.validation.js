
const { body, validationResult } = require("express-validator");
const validateRegister = [

    body("username")
        .trim()
        .notEmpty()
        .withMessage("نام کاربری الزامی است")
        .isString()
        .withMessage("نام کاربری باید رشته باشد")
        .isLength({ min: 2, max: 15 })
        .withMessage("نام کاربری باید بین 2 تا 15 کاراکتر باشد")
        .matches(/^[A-Za-zآ-ی\s]+$/)
        .withMessage("نام کاربری نباید شامل عدد باشد"),

    body("email")
        .trim()
        .notEmpty()
        .withMessage("ایمیل الزامی است")
        .isEmail()
        .withMessage("فرمت ایمیل صحیح نیست")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("رمز عبور الزامی است")
        .isString()
        .withMessage("رمز عبور باید رشته باشد")
        .isLength({ min: 5, max: 29 })
        .withMessage("رمز عبور باید بین5 تا 29 کاراکتر باشد")

];


const validateLogin=[
    body("email")
        .trim()
        .notEmpty()
        .withMessage("ایمیل الزامی است")
        .isEmail()
        .withMessage("فرمت ایمیل صحیح نیست")
        .normalizeEmail(),

    body("password")
        .notEmpty()
        .withMessage("رمز عبور الزامی است")
        .isString()
        .withMessage("رمز عبور باید رشته باشد")
        .isLength({ min: 5, max: 29 })
        .withMessage("رمز عبور باید بین 5 تا 29 کاراکتر باشد")
]

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
    validateRegister,
    validateLogin,
    checkValidation
};