
const errorMiddleware = (err, req, res, next) => {
    console.error(err);

    return res.status(500).json({
        message: "Internal Server Error"
    });
};

module.exports = errorMiddleware;