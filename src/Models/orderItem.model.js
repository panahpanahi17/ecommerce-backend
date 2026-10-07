  const{DataTypes}=require("sequelize");
 const sequelize = require("../config/database");
 const orderItem=sequelize.define("orderItem",{
          orderId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
          productId : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
          quantity : {
        type: DataTypes.INTEGER,
        allowNull: false
    },
          price : {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },
 });
 module.exports=orderItem