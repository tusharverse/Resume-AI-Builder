const express = require('express');
const router = express.Router();
const resumeController = require('../controllers/resumeController');
const auth = require('../middleware/auth');

router.post('/', auth, resumeController.createResume);
router.get('/', auth, resumeController.listResumes);
router.get('/public/:token', resumeController.getPublicResume); // public access by token
router.get('/:id', auth, resumeController.getResume);
router.patch('/:id', auth, resumeController.updateResume);
router.delete('/:id', auth, resumeController.deleteResume);
router.post('/:id/duplicate', auth, resumeController.duplicateResume);
router.post('/:id/share', auth, resumeController.shareResume);
router.post('/:id/export', auth, resumeController.exportResume); // create export job

module.exports = router;
