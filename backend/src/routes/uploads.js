const express = require('express');
const router = express.Router();
const uploadController = require('../controllers/uploadController');
const auth = require('../middleware/auth');

router.post('/presign', auth, uploadController.presign);
router.post('/resume', auth, uploadController.uploadResume);

module.exports = router;
