const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

router.get('/getUsers', authorization, userController.getUsers);

module.exports = router;