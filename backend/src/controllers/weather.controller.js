const { PrismaClient } = require('@prisma/client');
const { fetchWeatherData } = require('../utils/api.utils');
const { isValidLocation } = require('../utils/validation.utils');

const prisma = new PrismaClient();

/**
 * Get current weather for location
 */
const getCurrentWeather = async (req, res, next) => {
  try {
    const { location } = req.body;
    const userId = req.userId;
    
    if (!location || !isValidLocation(location)) {
      return res.status(400).json({ error: 'Valid location is required' });
    }
    
    // Fetch weather data
    const weatherData = await fetchWeatherData(location);
    
    // Get user preferences for temperature unit
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId }
    });
    
    // Save search to history
    await prisma.searchHistory.create({
      data: {
        userId,
        location: weatherData.location,
        temperature: weatherData.temperature,
        conditions: weatherData.conditions,
        recommendations: { placeholder: 'Will be generated with outfit suggestions' }
      }
    });
    
    res.status(200).json({
      message: 'Weather data retrieved successfully',
      data: weatherData,
      preferences: preferences || { temperatureUnit: 'celsius' }
    });
  } catch (error) {
    if (error.message.includes('Location not found')) {
      return res.status(404).json({ error: error.message });
    }
    next(error);
  }
};

/**
 * Get user's search history
 */
const getSearchHistory = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { limit = 10 } = req.query;
    
    const history = await prisma.searchHistory.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
      take: parseInt(limit),
      select: {
        id: true,
        location: true,
        temperature: true,
        conditions: true,
        createdAt: true
      }
    });
    
    res.status(200).json({
      message: 'Search history retrieved',
      data: history
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getCurrentWeather,
  getSearchHistory
};