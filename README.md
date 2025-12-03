🌤️ WeatherWear

Smart Clothing Recommendations Based on Real-Time Weather Data

WeatherWear is a full-stack web application that provides personalized outfit suggestions based on real-time weather conditions. Never be underdressed or overdressed again!

✨ Features
🔐 Authentication & User Management

    JWT-based authentication with httpOnly cookies

    Secure password hashing with bcrypt

    User registration with email verification

    Password strength validation

    Persistent login sessions

🌡️ Weather Intelligence

    Real-time weather data from OpenWeather API

    Global location coverage (any city worldwide)

    Temperature in Celsius/Fahrenheit

    Weather conditions (rain, snow, clear, etc.)

    Humidity, wind speed, and feels-like temperature

👕 Smart Outfit Recommendations

    AI-powered clothing suggestions

    Style preferences (casual, formal, sporty, business, outdoor)

    Temperature-based clothing layers

    Weather condition adjustments

    Personalized recommendations based on user history

📊 User Experience

    Search history tracking

    User preferences management

    Responsive design for all devices

    Dark/light theme support

    Intuitive dashboard with weather insights

🛡️ Security

    Protected API endpoints

    SQL injection prevention with Prisma

    XSS protection

    CSRF protection with same-site cookies

    Environment variable configuration

🛠️ Tech Stack
Frontend

    React 18 - UI library with hooks

    Vite - Build tool and dev server

    Tailwind CSS - Utility-first CSS framework

    DaisyUI - Component library for Tailwind

    React Router DOM v6 - Client-side routing

    Axios - HTTP client for API calls

Backend

    Node.js - JavaScript runtime

    Express.js - Web application framework

    PostgreSQL - Relational database (Neon serverless)

    Prisma ORM - Database toolkit and migrations

    JWT - JSON Web Tokens for authentication

    bcryptjs - Password hashing

    axios - HTTP client for external API calls

External Services

    OpenWeather API - Weather data provider

    Neon.tech - Serverless PostgreSQL hosting

Architecture

weatherwear/
├── frontend/                 # React Vite application
│   ├── public/              # Static assets
│   └── src/
│       ├── components/      # React components
│       │   ├── Auth/        # Login, Signup, ProtectedRoute
│       │   ├── Homepage/    # WeatherForm, Display, Suggestions
│       │   └── Layout/      # Navbar, Footer
│       ├── hooks/           # Custom React hooks
│       ├── App.jsx          # Main application component
│       └── index.css        # Global Tailwind styles
│
├── backend/                 # Express.js API server
│   ├── src/
│   │   ├── controllers/     # Route controllers
│   │   ├── routes/          # API route definitions
│   │   ├── middleware/      # Auth and error middleware
│   │   └── utils/           # Helper functions
│   ├── prisma/             # Database schema and migrations
│   └── server.js           # Application entry point
│
└── README.md               # This file

Installation
Prerequisites

    Node.js (v16 or higher)

    npm or yarn

    PostgreSQL (or Neon serverless account)

    OpenWeather API account