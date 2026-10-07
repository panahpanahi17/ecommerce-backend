
const express = require("express");

const router = express.Router();

const authMiddleware = require("../middleware/auth.middleware");
const adminMiddleware = require("../middleware/admin.middleware");

const {
    status,
    checkValidation,
    validateOrderId
} = require("../Validation/order.validation");

const {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
} = require("../controllers/Order.controller");


// ثبت سفارش توسط کاربر لاگین‌شده
router.post(
    "/",
    authMiddleware,
    createOrder
);


// دیدن همه سفارش‌های خود کاربر
router.get(
    "/",
    authMiddleware,
    getOrders
);


// دیدن همه سفارش‌ها توسط ادمین
// باید قبل از /:id باشد
router.get(
    "/all",
    authMiddleware,
    adminMiddleware,
    getAllOrders
);


// دیدن جزئیات یک سفارش مشخص
router.get(
    "/:id",
    authMiddleware,
    validateOrderId,
    checkValidation,
    getOrderById
);


// تغییر وضعیت سفارش توسط ادمین
router.put(
    "/:id/status",
    authMiddleware,
    adminMiddleware,
    validateOrderId,
    status,
    checkValidation,
    updateOrderStatus
);


// لغو سفارش توسط همان کاربر
router.put(
    "/:id/cancel",
    authMiddleware,
    validateOrderId,
    checkValidation,
    cancelOrder
);


module.exports = router;

