const express = require('express');
const router = express.Router();
const outfitController = require('../controllers/outfit.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

router.post('/suggest', outfitController.getOutfitSuggestions);
router.post('/preferences', outfitController.updatePreferences);

module.exports = router;