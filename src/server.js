
const app=require("./app")

const sequelize = require("./config/database");
require("./Models")
sequelize.authenticate()
    .then(() => {
        console.log("Database connected successfully");

        return sequelize.sync();
    })
    .then(() => {
        console.log("Database synced successfully");

        app.listen(3000, () => {
            console.log("Server is running on port 3000");
        });
    })
    .catch((error) => {
        console.log("Startup failed:", error);
    });
