 const express = require("express");
 const router = express.Router();
 const authMiddleware=require("../middleware/auth.middleware")
 const {createCart, getCart}=require("../controllers/Cart.controller");
 router.post("/",authMiddleware,createCart);

router.get("/", authMiddleware, getCart);

 module.exports=router
