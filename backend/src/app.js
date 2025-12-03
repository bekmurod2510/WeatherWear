const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
require('dotenv').config();

const authRoutes = require('./routes/auth.routes');
const weatherRoutes = require('./routes/weather.routes');
const outfitRoutes = require('./routes/outfit.routes');
const errorMiddleware = require('./middleware/error.middleware');

const app = express();

// CORS configuration
const corsOptions = {
  origin: function (origin, callback) {
    // Allow these origins
    const allowedOrigins = [
      'https://weather-wear-omega.vercel.app',
      'https://weatherwear-frontend.onrender.com', // If you also have Render frontend
      'http://localhost:5173'
    ];
    
    // Allow requests with no origin (like mobile apps or curl)
    if (!origin || allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      console.log('Blocked by CORS:', origin);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true, // THIS IS CRITICAL
  optionsSuccessStatus: 200
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/weather', weatherRoutes);
app.use('/api/outfit', outfitRoutes);

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', timestamp: new Date().toISOString() });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Endpoint not found' });
});

// Error middleware
app.use(errorMiddleware);

module.exports = app;