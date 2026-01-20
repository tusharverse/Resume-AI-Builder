const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const auth = require('../middleware/auth');

router.get('/:id', auth, userController.getUser);
router.patch('/:id', auth, userController.updateUser);

module.exports = router;
