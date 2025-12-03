const express = require('express');
const router = express.Router();
const weatherController = require('../controllers/weather.controller');
const authMiddleware = require('../middleware/auth.middleware');

// All routes require authentication
router.use(authMiddleware);

router.post('/current', weatherController.getCurrentWeather);
router.get('/history', weatherController.getSearchHistory);

module.exports = router;