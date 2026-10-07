 const{DataTypes}=require("sequelize");
 const sequelize = require("../config/database");
 const order=sequelize.define("order",{
        userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
        status : {
        type: DataTypes.ENUM(
        "pending",
        "paid",
        "processing",
        "shipped",
        "delivered",
        "cancelled"
    ),
        allowNull: false
    },
        totalPrice : {
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    }
 })
 module.exports=order;