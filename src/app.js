 const express = require("express");
const app = express();
const productRoutes = require("./routes/product.routes");
const categoryRoutes=require("./routes/category.routes");
const cartRoutes=require("./routes/Cart.routes");
const cartItemRoutes = require("./routes/Cartitem.routes");
const authRoutes = require("./routes/auth.routes");
const order=require("./routes/order.routes");
const paymentRoutes=require("./routes/payment.routes")
app.use(express.json());
app.use("/api/auth",authRoutes);
app.use("/products",productRoutes);
app.use("/category",categoryRoutes);
app.use("/cart",cartRoutes);
app.use("/cart-items", cartItemRoutes);
app.use("/order",order);
app.use("/payment",paymentRoutes);

module.exports = app;