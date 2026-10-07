const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const{ validateCartItem,validateCartItemId,validateCartItemUpdate,checkValidation}=require("../Validation/cartItem.validation");


const {
    createItem,
    getCartItems,
    updateItems,
    deleteItem
} = require("../controllers/Cartitem.controller");

router.post("/", authMiddleware, validateCartItem,checkValidation,createItem);

router.get("/", authMiddleware, getCartItems);

router.put("/:id", authMiddleware,validateCartItemUpdate,validateCartItemId,checkValidation, updateItems);

router.delete("/:id", authMiddleware,validateCartItemId,checkValidation,deleteItem);

module.exports = router;