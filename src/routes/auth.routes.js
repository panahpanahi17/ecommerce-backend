const express = require("express");
 const router = express.Router();
 const{register,login}=require("../controllers/auth.controller");
 const {validateRegister,validateLogin, checkValidation}=require("../Validation/user.validation")


 router.post("/register",validateRegister,checkValidation,register);
 
 router.post("/login",validateLogin,checkValidation,login);
 module.exports=router