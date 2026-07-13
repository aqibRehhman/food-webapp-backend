const usersSchema = require("../models/usersSchema");
const bcrypt = require('bcrypt');
const jwt = require("jsonwebtoken");

require('dotenv').config();

const signup = async (req, res) => {
    try {
        const { userName, email, password } = req.body;
        if (!userName || !email || !password) {
            return res.status(400).json({
                success: false,
                message: "Incomplete Data"
            })
        }
        const isEmailExist = await usersSchema.findOne({ email });
        if (isEmailExist) {
            return res.status(409).json({
                success: false,
                message: "Email already exist",
            });
        }
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const createdUser = await usersSchema.create({ ...req.body, password: hashedPassword });
        const user = await usersSchema.findById(createdUser._id);
        user.password = undefined;
        return res.status(201).json({
            success: true,
            message: "user created successfully",
            user
        });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        }
        const user = await usersSchema.findOne({ email });
        if (!user) {
            return res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
        const isMatch = await bcrypt.compare(password, user?.password);
        if (!isMatch) {
            return res.status(401).json({
                success: false,
                message: "Invalid Credentials"
            })
        }
        const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
            expiresIn: '1d'
        })
        user.password = undefined;
        return res.status(200).json({ message: 'Login Successfull', user, jwt: token });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        });
    }
}

const allUsers = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({
                success: false,
                message: "Bad Request"
            })
        } if (process.env.ADMIN_EMAIL !== email || process.env.ADMIN_PASS !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid admin credentials"
            })
        }
        const users = await usersSchema.find().select('-password');
        if (!users) {
            return res.status(404).json({
                success: false,
                message: "Users not found"
            })
        }
        return res.status(200).json({ message: 'Successfull', users });
    } catch (err) {
        return res.status(500).json({
            success: false,
            message: "Internal server error",
            error: err
        });
    }
}

module.exports = { signup, login, allUsers };