 const{DataTypes}=require("sequelize");
 const sequelize = require("../config/database");
 const payment=sequelize.define("pament",{

    orderId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },

    amount: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    status: {
        type: DataTypes.ENUM(
            "pending",
            "paid",
            "failed"
        ),
        allowNull: false,
        defaultValue: "pending"
    },

    authority: {
        type: DataTypes.STRING,
        allowNull: true
    }


 })
 module.exports=payment