const usersSchema = require("../models/usersSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const user = await usersSchema.findById(req.id).select("-password");
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User found",
            user
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = { getUsers };