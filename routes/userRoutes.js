const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const authorization = require('../middlewares/authorization');

router.get('/getUsers', authorization, userController.getUsers);
router.patch('/editUsers', authorization, userController.editUsers);
router.post('/resetPassword', userController.resetPassword);

module.exports = router;