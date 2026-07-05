const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.DB_URL);
        console.log('Connected to DB:', conn.connection.name);
    } catch (err) {
        console.error('Connection Failed Error:', err);
        process.exit(1);
    }
}
module.exports = connectDB;