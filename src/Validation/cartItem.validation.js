
const { body,param,validationResult } = require("express-validator");


const validateCartItem = [

  body("productId")
    .notEmpty()
    .withMessage("شناسه محصول الزامی است")
    .isInt({ min: 1 })
    .withMessage("شناسه محصول باید یک عدد صحیح مثبت باشد"),


  body("quantity")
    .notEmpty()
    .withMessage("تعداد محصول الزامی است")
    .isInt({ min: 1 })
    .withMessage("تعداد محصول باید یک عدد صحیح مثبت باشد"),

];
const validateCartItemUpdate = [
  body("quantity")
    .notEmpty()
    .withMessage("تعداد محصول الزامی است")
    .isInt({ min: 1 })
    .withMessage("تعداد محصول باید یک عدد صحیح مثبت باشد"),
];

const validateCartItemId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("شناسه آیتم سبد خرید باید عدد صحیح مثبت باشد")
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
  validateCartItem,
  validateCartItemUpdate,
  validateCartItemId,
  checkValidation
};

