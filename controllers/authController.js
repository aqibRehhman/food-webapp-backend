const usersSchema = require("../models/usersSchema");
const bcrypt = require('bcrypt');

const signup = async (req, res) => {
    const { userName, email, password } = req.body;
    if (!userName || !email || !password) {
        res.send(400).json({
            success: false,
            message: "Incomplete Data"
        })
    }

    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const createdUser = await usersSchema.create({ ...req.body, password: hashedPassword });
    const user = await usersSchema.findById(createdUser._id);
    res.status(201).json({
        success: true,
        message: "user created successfully",
        user
    });
}

module.exports = { signup };