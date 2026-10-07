
const { DataTypes, ENUM } = require("sequelize");
const sequelize = require("../config/database");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING,
        allowNull: false
    },

    email: {
        type: DataTypes.STRING,
        allowNull: false
    },

    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    role: {
    type: DataTypes.ENUM("user", "admin"),
    allowNull: false,
    defaultValue: "user"
}
});

module.exports = User;