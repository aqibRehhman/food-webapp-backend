const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    userName: {
        type: String,
        required: [true, 'Name is required'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        trim: true,
        unique: true,
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        trim: true,
    },
    address: {
        type: String,
        trim: true
    },
    phone: {
        type: String,
        trim: true
    },
    userType: {
        type: String,
        required: [true, 'user type is required'],
        default: 'client',
        enum: ['client', 'admin', 'vendor', 'driver'],
    },
    profile: {
        type: String,
        default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS_m3IECfrQBoNJ3BBSgk6qMYVwfOaFwHd4k-OmHdtCQHdxp4KeEwTdXwao&s=10',
    }
}, { timeStamps: true });

module.exports = mongoose.model('users', usersSchema);