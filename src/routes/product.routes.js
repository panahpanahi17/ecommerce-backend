
const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");
const {validateproduct,validateProductId,validateProductUpdate,checkValidation}=require("../Validation/product.validation");

const{validateProductQuery}=require("../Validation/productQuery.validation");

const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct
} = require("../controllers/product.controller");

router.post("/",authMiddleware,adminMiddleware ,validateproduct,checkValidation,createProduct);

router.get("/", validateProductQuery,checkValidation,getProducts);

router.get("/:id",validateProductId,checkValidation,getProductById);

router.put(
    "/:id",
    authMiddleware,
    adminMiddleware,
    validateProductId,
    validateProductUpdate,
    checkValidation,
    updateProduct
);


router.delete("/:id", authMiddleware,adminMiddleware,validateProductId,checkValidation,deleteProduct);

module.exports = router;