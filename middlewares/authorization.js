const jwt = require("jsonwebtoken");
require('dotenv').config();

module.exports = async (req, res, next) => {
    try {
        const token = req.headers["authorization"].split(" ")[1];
        jwt.verify(token, process.env.SECRET_KEY, (err, decode) => {
            if (err) {
                return res.status(401).json({
                    success: false,
                    message: "unauthorized",
                    error: err
                });
            } else {
                req.id = decode?.id;
                next();
            }
        })
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server errorr",
            error: err
        });
    }
}