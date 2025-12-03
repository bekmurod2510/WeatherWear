const jwt = require('jsonwebtoken');
const { getCookie } = require('../utils/cookie.utils');

/**
 * Authentication middleware
 * Verifies JWT token from cookies
 */
const authMiddleware = async (req, res, next) => {
  try {
    const token = getCookie(req, 'token');
    
    if (!token) {
      return res.status(401).json({ error: 'Authentication required' });
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.userId;
    
    next();
  } catch (error) {
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({ error: 'Invalid token' });
    }
    
    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({ error: 'Token expired' });
    }
    
    return res.status(500).json({ error: 'Authentication error' });
  }
};

module.exports = authMiddleware;