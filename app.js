const express = require('express');
const app = express();
const testRoutes = require('./routes/testRoutes');
const authRoutes = require('./routes/authRoutes');

app.use(express.json());
app.use('/api/v1/test', testRoutes);
app.use('/api/v1/auth', authRoutes);

module.exports = app;