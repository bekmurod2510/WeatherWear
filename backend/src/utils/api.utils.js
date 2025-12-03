const axios = require('axios');

/**
 * Fetch weather data from OpenWeather API
 * @param {string} location - City name
 * @returns {Promise<Object>} Weather data
 */
const fetchWeatherData = async (location) => {
  try {
    const apiKey = process.env.OPENWEATHER_API_KEY;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(location)}&appid=${apiKey}&units=metric`;
    
    const response = await axios.get(url);
    
    if (response.status !== 200) {
      throw new Error('Failed to fetch weather data');
    }
    
    const data = response.data;
    
    return {
      location: data.name,
      country: data.sys.country,
      temperature: data.main.temp,
      feelsLike: data.main.feels_like,
      humidity: data.main.humidity,
      conditions: data.weather[0].main,
      description: data.weather[0].description,
      icon: data.weather[0].icon,
      windSpeed: data.wind.speed
    };
  } catch (error) {
    if (error.response?.status === 404) {
      throw new Error('Location not found');
    }
    if (error.response?.status === 401) {
      throw new Error('Invalid API key');
    }
    throw new Error(`Weather API error: ${error.message}`);
  }
};

/**
 * Generate outfit recommendations based on weather
 * @param {number} temperature - Temperature in Celsius
 * @param {string} conditions - Weather conditions
 * @param {string} style - Clothing style preference
 * @returns {Object} Outfit recommendations
 */
const generateOutfitRecommendation = (temperature, conditions, style = 'casual') => {
  let baseOutfit = [];
  let accessories = [];
  let outerwear = [];
  
  // Temperature-based recommendations
  if (temperature > 25) {
    // Hot weather
    baseOutfit = ['T-shirt', 'Shorts', 'Sandals'];
    accessories = ['Sunglasses', 'Sun hat', 'Sunscreen'];
  } else if (temperature > 18) {
    // Warm weather
    baseOutfit = ['T-shirt', 'Jeans or light pants', 'Sneakers'];
    accessories = ['Light jacket (optional)', 'Cap'];
  } else if (temperature > 10) {
    // Cool weather
    baseOutfit = ['Long-sleeve shirt', 'Jeans', 'Closed shoes'];
    outerwear = ['Light jacket', 'Sweater'];
    accessories = ['Scarf (optional)'];
  } else if (temperature > 0) {
    // Cold weather
    baseOutfit = ['Thermal underwear', 'Sweater', 'Warm pants'];
    outerwear = ['Winter jacket', 'Gloves', 'Beanie'];
    accessories = ['Scarf', 'Warm socks'];
  } else {
    // Freezing weather
    baseOutfit = ['Thermal layers', 'Fleece jacket', 'Insulated pants'];
    outerwear = ['Heavy winter coat', 'Insulated gloves', 'Winter hat'];
    accessories = ['Thermal socks', 'Face mask', 'Hand warmers'];
  }
  
  // Condition-based adjustments
  if (conditions.toLowerCase().includes('rain')) {
    outerwear.push('Raincoat', 'Umbrella', 'Waterproof shoes');
    accessories.push('Waterproof bag');
  }
  
  if (conditions.toLowerCase().includes('snow')) {
    outerwear.push('Snow boots', 'Waterproof gloves');
    accessories.push('Ice scraper', 'Traction cleats');
  }
  
  if (conditions.toLowerCase().includes('wind')) {
    accessories.push('Windproof jacket', 'Secure hat');
  }
  
  // Style adjustments
  if (style === 'formal') {
    baseOutfit = baseOutfit.map(item => 
      item.includes('T-shirt') ? 'Dress shirt' : 
      item.includes('Shorts') ? 'Dress pants' : 
      item.includes('Sneakers') ? 'Dress shoes' : 
      item.includes('Jeans') ? 'Chinos or slacks' : item
    );
  } else if (style === 'sporty') {
    baseOutfit = baseOutfit.map(item => 
      item.includes('T-shirt') ? 'Athletic shirt' : 
      item.includes('Jeans') ? 'Athletic pants' : 
      item.includes('Sneakers') ? 'Running shoes' : item
    );
  }
  
  return {
    baseOutfit,
    outerwear: outerwear.length > 0 ? outerwear : ['None needed'],
    accessories,
    recommendation: `For ${conditions.toLowerCase()} weather at ${temperature.toFixed(1)}°C`
  };
};

/**
 * Convert temperature between Celsius and Fahrenheit
 * @param {number} temp - Temperature
 * @param {string} from - Original unit ('celsius' or 'fahrenheit')
 * @param {string} to - Target unit ('celsius' or 'fahrenheit')
 * @returns {number} Converted temperature
 */
const convertTemperature = (temp, from, to) => {
  if (from === to) return temp;
  
  if (from === 'celsius' && to === 'fahrenheit') {
    return (temp * 9/5) + 32;
  }
  
  if (from === 'fahrenheit' && to === 'celsius') {
    return (temp - 32) * 5/9;
  }
  
  return temp;
};

module.exports = {
  fetchWeatherData,
  generateOutfitRecommendation,
  convertTemperature
};