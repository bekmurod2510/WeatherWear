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

    const allowedOrigins = [
      'https://weather-wear-omega.vercel.app',
      'http://localhost:5173'
    ];

    if (!origin) {
      console.log('No origin - allowing');
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      console.log('Origin allowed:', origin);
      return callback(null, true);
    }

    if (process.env.NODE_ENV !== 'production') {
      if (origin.includes('localhost') || origin.includes('127.0.0.1')) {
        console.log('Localhost allowed in development:', origin);
        return callback(null, true);
      }
    }

    console.log('Blocked by CORS:', origin);
    return callback(new Error(`Not allowed by CORS: ${origin}`));
  },
  credentials: true,
  optionsSuccessStatus: 200,
  allowedHeaders: ['Content-Type', 'Authorization']
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