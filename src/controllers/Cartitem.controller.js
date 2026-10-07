const CartItem = require("../Models/cartItem.model");
const Cart = require("../Models/Cart.model");
const Product = require("../Models/Product.model");

const createItem = async (req, res,next) => {
    try {
        // 1. شناسه کاربر را از کاربری که لاگین کرده می‌گیریم
        const userId = req.user.id;

        // 2. محصول و تعداد موردنظر را از Body می‌گیریم
        const { productId,quantity} = req.body;

        // 3. Cart مربوط به این کاربر را پیدا می‌کنیم
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        // اگر Cart نداشت
        if (!cart) {
            return res.status(404).json({
                message: "سبد خرید پیدا نشد"
            });
        }

        // 4. محصول را پیدا می‌کنیم
        const product = await Product.findByPk(productId);

        // اگر محصول وجود نداشت
        if (!product) {
            return res.status(404).json({
                message: "محصول پیدا نشد"
            });  
        }

        // 5. بررسی موجودی محصول
        if (product.stock < quantity) {
            return res.status(400).json({
                message: "موجودی محصول کافی نیست"
            });
        }

        // 6. بررسی می‌کنیم محصول قبلاً داخل Cart هست یا نه
        const existingItem = await CartItem.findOne({
            where: {
                cartId: cart.id,
                productId: productId
            }
        });

        // 7. اگر قبلاً وجود داشت، تعداد را افزایش می‌دهیم
        if (existingItem) {

            // تعداد جدید
            const newQuantity = existingItem.quantity + quantity;

            // بررسی موجودی برای تعداد جدید
            if (newQuantity > product.stock) {
                return res.status(400).json({
                    message: "موجودی محصول برای این تعداد کافی نیست"
                });
            }

            existingItem.quantity = newQuantity;

            await existingItem.save();

            return res.status(200).json({
                message: "تعداد محصول در سبد خرید افزایش یافت",
                cartItem: existingItem
            });
        }

        // 8. اگر محصول قبلاً داخل Cart نبود، CartItem جدید می‌سازیم
        const cartItem = await CartItem.create({
            cartId: cart.id,
            productId: productId,
            quantity: quantity
        });

        // 9. نتیجه را برمی‌گردانیم
        res.status(201).json({
            message: "محصول به سبد خرید اضافه شد",
            cartItem: cartItem
        });

    } catch (error) {
        next(error);  
    }
};
const getCartItems = async (req, res,next) => {
    try {
        // 1. گرفتن شناسه کاربر از Token
        const userId = req.user.id;

        // 2. پیدا کردن Cart مربوط به کاربر
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        // اگر Cart وجود نداشت
        if (!cart) {
            return res.status(404).json({
                message: "سبد خرید پیدا نشد"
            });
        }

        // 3. پیدا کردن CartItemهای این Cart
        const cartItems = await CartItem.findAll({
            where: {
                cartId: cart.id
            },
            include: [
                {
                    model: Product
                }
            ]
        });

        // 4. برگرداندن CartItemها
        return res.status(200).json({
            cartItems: cartItems
        });

    } catch (error) {
        next(error);  
    }
};

const updateItems = async (req, res,next) => {
    try {
        // 1. شناسه کاربر فعلی
        const userId = req.user.id;

        // 2. شناسه CartItem از URL
        const cartItemId = req.params.id;

        // 3. تعداد جدید از Body
        const { quantity } = req.body;

        // 4. پیدا کردن Cart کاربر
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        // اگر Cart نداشت
        if (!cart) {
            return res.status(404).json({
                message: "سبد خرید پیدا نشد"
            });
        }

        // 5. پیدا کردن CartItem متعلق به همین Cart
        const cartItem = await CartItem.findOne({
            where: {
                id: cartItemId,
                cartId: cart.id
            }
        });

        // اگر این CartItem متعلق به این Cart نبود
        if (!cartItem) {
            return res.status(404).json({
                message: "این محصول در سبد خرید شما وجود ندارد"
            });
        }

         const product = await Product.findByPk(cartItem.productId);
        

        // اگر Product وجود نداشت
        if (!product) {
            return res.status(404).json({
                message: "محصول پیدا نشد"
            });
        }

        // 7. بررسی موجودی
        if (quantity > product.stock) {
            return res.status(400).json({
                message: "موجودی محصول برای این تعداد کافی نیست"
            });
        }

        // 8. تغییر تعداد
        cartItem.quantity = quantity;

        // 9. ذخیره تغییر در Database
        await cartItem.save();

        // 10. برگرداندن نتیجه
        return res.status(200).json({
            message: "تعداد محصول با موفقیت تغییر کرد",
            cartItem: cartItem
        });

    } catch (error) {
        next(error);  
    }
};
const deleteItem = async (req, res,next) => {
    try {
        // 1. گرفتن ID کاربر فعلی
        const userId = req.user.id;

        // 2. گرفتن ID آیتم از URL
        const cartItemId = req.params.id;

        // 3. پیدا کردن Cart مربوط به این کاربر
        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        // اگر کاربر Cart نداشت
        if (!cart) {
            return res.status(404).json({
                message: "شما سبد خرید ندارید"
            });
        }

        // 4. پیدا کردن CartItem مربوط به همین Cart
        const cartItem = await CartItem.findOne({
            where: {
                id: cartItemId,
                cartId: cart.id
            }
        });

        // اگر CartItem پیدا نشد
        if (!cartItem) {
            return res.status(404).json({
                message: "این محصول در سبد خرید شما نیست"
            });
        }

        // 5. حذف CartItem
        await cartItem.destroy();

        // 6. ارسال پاسخ
        return res.status(200).json({
            message: "محصول با موفقیت حذف شد"
        });

    } catch (error) {
        next(error);  
    }
};
module.exports = {
    createItem,
    getCartItems,
    updateItems,
   deleteItem 
};