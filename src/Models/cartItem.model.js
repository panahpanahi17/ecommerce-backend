   const{DataTypes}=require("sequelize");
 const sequelize = require("../config/database");
const CartItem=sequelize.define("CartItem",{
       cartId : {
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
});
module.exports=CartItem