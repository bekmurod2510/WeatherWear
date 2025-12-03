/**
 * Global error handling middleware
 */
const errorMiddleware = (error, req, res, next) => {
  console.error('Error:', error);
  
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal server error';
  
  // Don't expose internal errors in production
  const response = process.env.NODE_ENV === 'production' && statusCode === 500
    ? { error: 'Internal server error' }
    : { error: message, ...(error.details && { details: error.details }) };
  
  res.status(statusCode).json(response);
};

module.exports = errorMiddleware;