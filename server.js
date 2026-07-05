const app = require('./app');
require('dotenv').config();
const connectDB = require('./config/db');

connectDB();
app.listen(process.env.PORT, () => {
    console.log('Server is running on 3000');
})