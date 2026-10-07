 const Product = require("./Product.model");
const Category = require("./category.model");
const Order=require("./order.model");
const OrderItem=require("./orderItem.model");
const User=require("./user.model");
const Cart=require("./Cart.model");
const CartItem=require("./cartItem.model");
const payment=require("../Models/payment.model")

Category.hasMany(Product, {
    foreignKey:"categoryId"
});
Product.belongsTo(Category, {
    foreignKey:"categoryId"
});


Order.hasMany(OrderItem, {
    foreignKey:"orderId"
});
OrderItem.belongsTo(Order, {
    foreignKey:"orderId"
});


User.hasMany(Order,{
foreignKey:"userId"
});

Order.belongsTo(User, {
  foreignKey:"userId"
});

// User.hasOne(payment,{
//   foreignKey:"orderId"
// });
// payment.belongsTo(User,{
//   foreignKey:"orderId"
// });
Order.hasOne(payment, {
    foreignKey: "orderId"
});

payment.belongsTo(Order, {
    foreignKey: "orderId"
});

User.hasOne(Cart,{
foreignKey:"userId"
});
Cart.belongsTo(User,{
foreignKey:"userId"
});



Cart.hasMany(CartItem, {
  foreignKey:"cartId"
});

CartItem.belongsTo(Cart, {
  foreignKey:"cartId"
});


Product.hasMany(CartItem, {
  foreignKey: "productId"
});

CartItem.belongsTo(Product, {
  foreignKey: "productId"
});


Product.hasMany(OrderItem, {
  foreignKey:"productId"
});

OrderItem.belongsTo(Product, {
  foreignKey:"productId"
});

module.exports = {
    Product,
    Category,
    Order,
    OrderItem,
    User,
    Cart,
    CartItem
};










