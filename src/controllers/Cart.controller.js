 const Cart=require("../Models/Cart.model");
 

 const createCart = async (req, res,next) => { 
    try { 
        const userId = req.user.id; 
 
        const existingCart = await Cart.findOne({ 
            where: { 
                userId: userId 
            } 
        }); 
 
        if (existingCart) { 
            return res.status(200).json({ 
                message: "سبد خرید از قبل وجود دارد", 
                cart: existingCart 
            }); 
        } 
        
        const cart = await Cart.create({ 
            userId: userId 
        }); 
 
        res.status(201).json({ 
            message: "سبد خرید ایجاد شد", 
            cart: cart 
        }); 
 
    } catch (error) { 
      next(error);  
    } 
};
const getCart = async (req, res,next) => {
    try {
        const userId = req.user.id;

        const cart = await Cart.findOne({
            where: {
                userId: userId
            }
        });

        if (!cart) {
            return res.status(404).json({
                message: "سبد خرید پیدا نشد"
            });
        }

        return res.status(200).json({
            cart: cart
        });

    } catch (error) {
        next(error);
    }
};
module.exports = {
    createCart,
    getCart
};