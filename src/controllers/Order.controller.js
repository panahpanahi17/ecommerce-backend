// 
const Order = require("../Models/order.model");
const OrderItem = require("../Models/orderItem.model");
const Cart = require("../Models/Cart.model");
const CartItem = require("../Models/cartItem.model");
const Product = require("../Models/Product.model");
const sequelize = require("../config/database");


// ========================================
// 1. ثبت سفارش
// ========================================

const createOrder = async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    // گرفتن کاربر فعلی از توکن
    const userId = req.user.id;

    // پیدا کردن Cart کاربر
    const cart = await Cart.findOne({
      where: {
        userId: userId
      },
      transaction
    });

    if (!cart) {
      await transaction.rollback();

      return res.status(404).json({
        message: "سبد خرید پیدا نشد"
      });
    }

    // پیدا کردن CartItem های این Cart
    const cartItems = await CartItem.findAll({
      where: {
        cartId: cart.id
      },
      transaction
    });

    if (cartItems.length === 0) {
      await transaction.rollback();

      return res.status(400).json({
        message: "سبد خرید خالی است"
      });
    }

    // مبلغ کل سفارش
    let totalPrice = 0;

    // اطلاعات OrderItem ها
    const orderItemsData = [];

    // نگه‌داشتن محصولات بررسی‌شده برای کاهش موجودی
    const productsToUpdate = [];

    // بررسی محصولات داخل Cart
    for (const item of cartItems) {
      // پیدا کردن محصول و قفل‌کردن ردیف آن
      const product = await Product.findByPk(
        item.productId,
        {
          transaction,
          lock: transaction.LOCK.UPDATE
        }
      );

      // اگر محصول پیدا نشد
      if (!product) {
        await transaction.rollback();

        return res.status(404).json({
          message: "یکی از محصولات سبد خرید پیدا نشد"
        });
      }

      // بررسی موجودی
      if (product.stock < item.quantity) {
        await transaction.rollback();

        return res.status(400).json({
          message: `موجودی محصول ${product.name} کافی نیست`
        });
      }

      // محاسبه قیمت این محصول
      const itemTotal = Number(product.price) * item.quantity;

      totalPrice += itemTotal;

      // نگه‌داشتن اطلاعات برای OrderItem
      orderItemsData.push({
        productId: product.id,
        quantity: item.quantity,
        price: product.price
      });

      // نگه‌داشتن خود محصول برای کاهش موجودی
      productsToUpdate.push({
        product,
        quantity: item.quantity
      });
    }

    // ساخت Order
    const order = await Order.create(
      {
        userId: userId,
        totalPrice: totalPrice,
        status: "pending"
      },
      {
        transaction
      }
    );

    // ساخت OrderItem ها
    for (const item of orderItemsData) {
      await OrderItem.create(
        {
          orderId: order.id,
          productId: item.productId,
          quantity: item.quantity,
          price: item.price
        },
        {
          transaction
        }
      );
    }

    // کم کردن موجودی محصولات بررسی‌شده
    for (const item of productsToUpdate) {
      await item.product.decrement("stock", {
        by: item.quantity,
        transaction
      });
    }

    // خالی کردن Cart
    await CartItem.destroy({
      where: {
        cartId: cart.id
      },
      transaction
    });

    // نهایی کردن Transaction
    await transaction.commit();

    // پاسخ
    return res.status(201).json({
      message: "سفارش با موفقیت ثبت شد",
      order: order
    });

  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    next(error);
  }
};



// ========================================
// 2. دیدن همه سفارش‌های کاربر
// ========================================

const getOrders = async (req, res,next) => {

    try {

        // گرفتن شناسه کاربر از توکن
        const userId = req.user.id;


        // پیدا کردن سفارش‌های این کاربر
        const orders = await Order.findAll({
            where: {
                userId: userId
            }
        });


        // اگر سفارشی وجود نداشت
        if (orders.length === 0) {

            return res.status(404).json({
                message: "شما هنوز سفارشی ثبت نکرده‌اید"
            });
        }


        return res.status(200).json({
            message: "تمام سفارش‌های شما",
            orders: orders
        });

    } catch (error) {

        next(error);
    }
};



// ========================================
// 3. دیدن یک سفارش مشخص
// ========================================

const getOrderById = async (req, res,next) => {

    try {

        // کاربر فعلی
        const userId = req.user.id;

        // id سفارش از URL
        const orderId = req.params.id;


        // پیدا کردن سفارش
        const order = await Order.findOne({
            where: {
                id: orderId,
                userId: userId
            }
        });


        // اگر سفارش پیدا نشد
        if (!order) {

            return res.status(404).json({
                message: "این سفارش برای شما وجود ندارد"
            });
        }


        // پیدا کردن آیتم‌های سفارش
        const orderItems = await OrderItem.findAll({
            where: {
                orderId: order.id
            }
        });


        return res.status(200).json({
            message: "جزئیات سفارش",
            order: order,
            orderItems: orderItems
        });

    } catch (error) {
        next(error);

    }
};

const updateOrderStatus = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { status } = req.body;

        const order = await Order.findByPk(id);

        if (!order) {
            return res.status(404).json({
                message: "سفارش پیدا نشد"
            });
        }

        const allowedTransitions = {
            pending: [],
            paid: ["processing"],
            processing: ["shipped"],
            shipped: ["delivered"],
            delivered: [],
            cancelled: []
        };

        if (!allowedTransitions[order.status].includes(status)) {
            return res.status(400).json({
                message: "تغییر وضعیت سفارش مجاز نیست"
            });
        }

        order.status = status;

        await order.save();

        return res.status(200).json({
            message: "وضعیت سفارش با موفقیت تغییر کرد",
            order: order
        });

    } catch (error) {
        next(error);
    }
};

// ========================================
// 4. لغو سفارش
// ========================================

const cancelOrder = async (req, res, next) => {
  let transaction;

  try {
    transaction = await sequelize.transaction();

    const userId = req.user.id;
    const orderId = req.params.id;

    // پیدا کردن سفارش متعلق به کاربر
    const order = await Order.findOne({
      where: {
        id: orderId,
        userId: userId
      },
      transaction,
      lock: transaction.LOCK.UPDATE
    });

    if (!order) {
      await transaction.rollback();

      return res.status(404).json({
        message: "این سفارش برای شما وجود ندارد"
      });
    }

    // فعلاً فقط سفارش پرداخت‌نشده قابل لغو است
    if (order.status !== "pending") {
      await transaction.rollback();

      return res.status(400).json({
        message: "فقط سفارش‌های در انتظار پرداخت قابل لغو هستند"
      });
    }

    // پیدا کردن آیتم‌های سفارش
    const orderItems = await OrderItem.findAll({
      where: {
        orderId: order.id
      },
      transaction
    });

    // بازگرداندن موجودی محصولات
    for (const item of orderItems) {
      const product = await Product.findByPk(
        item.productId,
        { transaction }
      );

      if (!product) {
        throw new Error(
          `محصول با شناسه ${item.productId} پیدا نشد`
        );
      }

      await product.increment("stock", {
        by: item.quantity,
        transaction
      });
    }

    // لغو سفارش
    order.status = "cancelled";
    await order.save({ transaction });

    // نهایی کردن تمام تغییرات
    await transaction.commit();

    return res.status(200).json({
      message: "سفارش با موفقیت لغو شد",
      order: order
    });

  } catch (error) {
    if (transaction && !transaction.finished) {
      await transaction.rollback();
    }

    next(error);
  }
};
const getAllOrders = async (req, res,next) => {
    try {
        const orders = await Order.findAll();

        return res.status(200).json({
            message: "تمام سفارش‌ها",
            orders: orders
        });

    } catch (error) {
        next(error);
    }
};

// ========================================
// Export
// ========================================

module.exports = {
    createOrder,
    getOrders,
    getOrderById,
    cancelOrder,
    getAllOrders,
    updateOrderStatus
};