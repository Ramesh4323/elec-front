const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/database');

// Load environment variables
dotenv.config();

const app = express();

const requiredEnvVars = ['MONGO_URI', 'JWT_SECRET'];
const missingEnvVars = requiredEnvVars.filter((envName) => !process.env[envName]);

const allowedOrigins = [
  'https://3ro23r9.netlify.app',
  process.env.FRONTEND_URL,
  'http://localhost:3000',
].filter(Boolean);

const corsOptions = {
  origin(origin, callback) {
    // Allow server-to-server or curl/postman requests with no origin header.
    if (!origin) {
      return callback(null, true);
    }

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    return callback(new Error(`CORS blocked for origin: ${origin}`));
  },
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
  optionsSuccessStatus: 204,
};

// Middleware
app.use(cors(corsOptions));
app.options(/.*/, cors(corsOptions));

app.use((req, res, next) => {
  if (req.method === 'OPTIONS') {
    console.log(`CORS preflight: ${req.method} ${req.originalUrl} from ${req.headers.origin || 'no-origin'}`);
  }
  next();
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
app.use('/api/products', require('./routes/products'));
app.use('/api/users', require('./routes/users'));
app.use('/api/cart', require('./routes/cart'));
app.use('/api/orders', require('./routes/orders'));

// Default route
app.get('/', (req, res) => {
  res.send('API is running...');
});

app.get('/api/health', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server healthy',
    uptime: process.uptime(),
  });
});

app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: `Route not found: ${req.originalUrl}`,
  });
});

app.use((err, req, res, next) => {
  const isCorsError = err.message && err.message.startsWith('CORS blocked for origin:');
  console.error('Unhandled request error:', err.message);

  res.status(isCorsError ? 403 : 500).json({
    success: false,
    message: isCorsError ? err.message : 'Internal server error',
  });
});

const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    if (missingEnvVars.length > 0) {
      throw new Error(`Missing required environment variables: ${missingEnvVars.join(', ')}`);
    }

    await connectDB();

    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
      console.log(`CORS allowed origins: ${allowedOrigins.join(', ')}`);
    });
  } catch (error) {
    console.error('Server startup failed:', error.message);
    process.exit(1);
  }
};

process.on('unhandledRejection', (reason) => {
  console.error('Unhandled Rejection:', reason);
});

process.on('uncaughtException', (error) => {
  console.error('Uncaught Exception:', error);
  process.exit(1);
});

startServer();
