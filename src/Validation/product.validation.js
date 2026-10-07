
const { body,param,validationResult } = require("express-validator");
const validateproduct = [

  // name
  body("name")
    .trim()
    .notEmpty()
    .withMessage("نام محصول الزامی می‌باشد")
    .isString()
    .withMessage("نام محصول باید رشته باشد")
    .isLength({ min: 2, max: 15 })
    .withMessage("نام محصول باید بین 2 تا 15 کاراکتر باشد")
    .matches(/^[A-Za-zآ-ی\s]+$/)
    .withMessage("نام محصول فقط باید شامل حروف و فاصله باشد"),

  // description
  body("description")
    .trim()
    .notEmpty()
    .withMessage("توضیح محصول الزامی است")
    .isString()
    .withMessage("توضیحات باید رشته باشد"),

  // price
  body("price")
    .notEmpty()
    .withMessage("قیمت محصول الزامی است")
    .isInt({ min: 0 }),

  // stock
  body("stock")
    .notEmpty()
    .withMessage("موجودی محصول الزامی است")
    .isInt({ min: 0 })
    .withMessage("موجودی باید یک عدد صحیح غیرمنفی باشد"),
];

const validateProductId = [
    param("id")
        .isInt({ min: 1 })
        .withMessage("شناسه محصول باید عدد صحیح مثبت باشد")
];
const validateProductUpdate = [
    body("name")
        .optional()
        .trim()
        .isString()
        .withMessage("نام محصول باید رشته باشد")
        .isLength({ min: 2, max: 15 })
        .withMessage("نام محصول باید بین 2 تا 15 کاراکتر باشد")
        .matches(/^[A-Za-zآ-ی\s]+$/)
        .withMessage("نام محصول فقط باید شامل حروف و فاصله باشد"),

    body("description")
        .optional()
        .trim()
        .isString()
        .withMessage("توضیحات باید رشته باشد"),

    body("price")
        .optional()
        .isFloat({ min: 0 })
        .withMessage("قیمت باید عدد غیرمنفی باشد"),

    body("stock")
        .optional()
        .isInt({ min: 0 })
        .withMessage("موجودی باید یک عدد صحیح غیرمنفی باشد"),

    body("image")
        .optional()
        .isString()
        .withMessage("آدرس تصویر باید رشته باشد")
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
  validateproduct,
  checkValidation,
  validateProductId,
  validateProductUpdate
};