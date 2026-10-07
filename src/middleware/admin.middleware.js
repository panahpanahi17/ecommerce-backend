
const auth=require("../middleware/auth.middleware")
const adminMiddleware = (req, res, next) => {

    if (req.user.role !== "admin") {
        return res.status(403).json({
            message: "شما ادمین نیستید"
        });
    }

    next();
};

module.exports = adminMiddleware;