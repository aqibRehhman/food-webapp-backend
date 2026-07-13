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

const editUsers = async (req, res) => {
    try {
        const updatedUser = await usersSchema.findByIdAndUpdate(
            req.id,
            req.body,
            { returnDocument: "after", runValidators: true }
        ).select("-password");

        if (!updatedUser) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            });
        }

        return res.status(200).json({
            success: true,
            message: "User updated successfully",
            user: updatedUser
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

const resetPassword = async (req, res) => {
    try {
        const { email, newPassword, answer } = req.body;

        if (!newPassword || !email || !answer) {
            return res.status(400).json({
                success: false,
                message: "Incomplete Data"
            })
        } if (answer !== process.env.ANSWER) {
            return res.status(401).json({
                success: false,
                message: "Invalid answer"
            })
        }
        const user = await usersSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "Email not found",
            });
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user.password = hashedPassword;
        await user.save();
        return res.status(200).json({
            success: true,
            message: "Password reset successfully",
        });

    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err.message
        });
    }
};

module.exports = { getUsers, editUsers, resetPassword };