
const Payment = require("../Models/payment.model");
const Order = require("../Models/order.model");
const sequelize = require("../config/database");


// ساخت Payment
const createPayment = async (req, res, next) => {
    try {
        const userId = req.user.id;
        const orderId = req.params.id;

        // پیدا کردن سفارش متعلق به کاربر
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId: userId
            }
        });

        if (!order) {
            return res.status(404).json({
                message: "سفارش پیدا نشد"
            });
        }

        // سفارش باید pending باشد
        if (order.status !== "pending") {
            return res.status(400).json({
                message: "این سفارش در وضعیت قابل پرداخت نیست"
            });
        }

        // بررسی اینکه قبلاً برای این سفارش Payment ساخته نشده باشد
        const existingPayment = await Payment.findOne({
            where: {
                orderId: order.id
            }
        });

        if (existingPayment) {
            return res.status(400).json({
                message: "برای این سفارش قبلاً درخواست پرداخت ایجاد شده است"
            });
        }

        // ساخت Payment
        const payment = await Payment.create({
            orderId: order.id,
            amount: order.totalPrice,
            status: "pending",
            authority: `MOCK-${Date.now()}`
        });

        return res.status(201).json({
            message: "درخواست پرداخت ایجاد شد",
            payment
        });

    } catch (error) {
        next(error);
    }
};


// تأیید Payment
const verifyPayment = async (req, res, next) => {
    let transaction;

    try {
        transaction = await sequelize.transaction();

        const userId = req.user.id;
        const paymentId = req.body.paymentId;

        // پیدا کردن Payment
        const payment = await Payment.findByPk(paymentId, {
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!payment) {
            await transaction.rollback();

            return res.status(404).json({
                message: "درخواست پرداخت پیدا نشد"
            });
        }

        // پیدا کردن سفارش متعلق به همان کاربر
        const order = await Order.findOne({
            where: {
                id: payment.orderId,
                userId: userId
            },
            transaction,
            lock: transaction.LOCK.UPDATE
        });

        if (!order) {
            await transaction.rollback();

            return res.status(404).json({
                message: "سفارش پیدا نشد"
            });
        }

        // Payment باید pending باشد
        if (payment.status !== "pending") {
            await transaction.rollback();

            return res.status(400).json({
                message: "این پرداخت در وضعیت قابل تأیید نیست"
            });
        }

        // Order باید pending باشد
        if (order.status !== "pending") {
            await transaction.rollback();

            return res.status(400).json({
                message: "این سفارش در وضعیت قابل پرداخت نیست"
            });
        }

        // تأیید آزمایشی Payment
        payment.status = "paid";

        await payment.save({
            transaction
        });

        // تغییر وضعیت Order
        order.status = "paid";

        await order.save({
            transaction
        });

        await transaction.commit();

        return res.status(200).json({
            message: "پرداخت آزمایشی با موفقیت تأیید شد",
            payment,
            order
        });

    } catch (error) {

        if (transaction && !transaction.finished) {
            await transaction.rollback();
        }

        next(error);
    }
};


module.exports = {
    createPayment,
    verifyPayment
};