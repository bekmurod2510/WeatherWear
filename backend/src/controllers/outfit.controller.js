const { PrismaClient } = require('@prisma/client');
const { generateOutfitRecommendation, convertTemperature } = require('../utils/api.utils');

const prisma = new PrismaClient();

/**
 * Get outfit suggestions based on weather
 */
const getOutfitSuggestions = async (req, res, next) => {
  try {
    const { location, temperature, conditions } = req.body;
    const userId = req.userId;
    
    if (!location || temperature === undefined || !conditions) {
      return res.status(400).json({ 
        error: 'Location, temperature, and conditions are required' 
      });
    }
    
    // Get user preferences
    const preferences = await prisma.userPreferences.findUnique({
      where: { userId }
    });
    
    const clothingStyle = preferences?.clothingStyle || 'casual';
    
    // Generate outfit recommendations
    const outfitRecommendations = generateOutfitRecommendation(
      temperature,
      conditions,
      clothingStyle
    );
    
    // Update the latest search with recommendations
    const latestSearch = await prisma.searchHistory.findFirst({
      where: { userId, location },
      orderBy: { createdAt: 'desc' }
    });
    
    if (latestSearch) {
      await prisma.searchHistory.update({
        where: { id: latestSearch.id },
        data: { recommendations: outfitRecommendations }
      });
    }
    
    res.status(200).json({
      message: 'Outfit suggestions generated',
      data: outfitRecommendations,
      preferences: preferences || { temperatureUnit: 'celsius', clothingStyle: 'casual' }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Update user preferences
 */
const updatePreferences = async (req, res, next) => {
  try {
    const userId = req.userId;
    const { temperatureUnit, clothingStyle } = req.body;
    
    // Validate temperature unit
    if (temperatureUnit && !['celsius', 'fahrenheit'].includes(temperatureUnit)) {
      return res.status(400).json({ 
        error: 'Temperature unit must be "celsius" or "fahrenheit"' 
      });
    }
    
    // Validate clothing style
    const validStyles = ['casual', 'formal', 'sporty', 'business', 'outdoor'];
    if (clothingStyle && !validStyles.includes(clothingStyle)) {
      return res.status(400).json({ 
        error: `Clothing style must be one of: ${validStyles.join(', ')}` 
      });
    }
    
    // Update or create preferences
    const preferences = await prisma.userPreferences.upsert({
      where: { userId },
      update: {
        temperatureUnit,
        clothingStyle
      },
      create: {
        userId,
        temperatureUnit: temperatureUnit || 'celsius',
        clothingStyle: clothingStyle || 'casual'
      }
    });
    
    res.status(200).json({
      message: 'Preferences updated successfully',
      data: preferences
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getOutfitSuggestions,
  updatePreferences
};