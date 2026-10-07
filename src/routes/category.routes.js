
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");

const adminMiddleware = require("../middleware/admin.middleware");

const {
    validategategory,
    checkValidation,
    validateCategoryUpdate,
} = require("../Validation/category.validation");

const {
    createCategory,
    getCategory,
    getCategoryById,
    updatecategory,
    deleteCategory
} = require("../controllers/category.controller");


router.post(
    "/",
    authMiddleware,
    adminMiddleware,
    validategategory,
    checkValidation,
    createCategory
);


router.get(
    "/",
    getCategory
);


router.get(
    "/:id",
    checkValidation,
    getCategoryById
);


router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateCategoryUpdate,
    checkValidation,
    updatecategory
);


router.delete(
    "/:id",
    authMiddleware,
    adminMiddleware,
    checkValidation,
    deleteCategory
);


module.exports = router;

