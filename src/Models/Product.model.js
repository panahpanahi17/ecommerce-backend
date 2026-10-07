 const{DataTypes}=require("sequelize");
 const sequelize = require("../config/database");
 const product=sequelize.define("product",{
        name: {
        type: DataTypes.STRING,
        allowNull: false
    },

    description: {
        type: DataTypes.TEXT
    },

    price: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
    },

    stock: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
    },

    image: {
        type: DataTypes.STRING
    },

    categoryId: {
        type: DataTypes.INTEGER
    }
 })
module.exports=product