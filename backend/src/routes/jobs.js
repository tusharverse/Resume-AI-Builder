const express = require('express');
const router = express.Router();
const jobController = require('../controllers/jobController');
const auth = require('../middleware/auth');

// Fetch job status (protected)
router.get('/:id', auth, jobController.getJob);


module.exports = router;
