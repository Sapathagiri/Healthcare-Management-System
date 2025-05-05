// // app.js
// const express = require('express');
// const cors = require('cors');
// const helmet = require('helmet');
// const compression = require('compression');
// const morgan = require('morgan');

// // Import routes
// const authRoutes = require('./src/routes/auth.routes');
// const userRoutes = require('./src/routes/user.routes');

// // Error handling middleware
// // const { errorHandler } = require('./src/middleware/error.middleware');

// class App {
//   constructor() {
//     this.app = express();
//     this.initializeMiddlewares();
//     this.initializeRoutes();
//     this.initializeErrorHandling();
//   }

//   initializeMiddlewares() {
//     // Security middlewares
//     this.app.use(helmet());
//     this.app.use(cors());

//     // Parsing middlewares
//     this.app.use(express.json());
//     this.app.use(express.urlencoded({ extended: true }));

//     // Compression and logging
//     this.app.use(compression());
//     this.app.use(morgan('dev'));
//   }

//   initializeRoutes() {
//     // Base routes
//     this.app.get('/', (req, res) => {
//       res.json({ 
//         message: 'Hospital Management API', 
//         status: 'Running' 
//       });
//     });

//     // API routes
//     this.app.use('/api/auth', authRoutes);
//     this.app.use('/api/users', userRoutes);
//   }

//   initializeErrorHandling() {
//     // 404 handler
//     this.app.use((req, res, next) => {
//       res.status(404).json({
//         success: false,
//         message: 'Route not found'
//       });
//     });

//     // Global error handler
//     this.app.use(errorHandler);
//   }

//   getApp() {
//     return this.app;
//   }
// }

// module.exports = new App();


const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const morgan = require('morgan');
const connectDB = require('./src/config/db');

// Load env vars
// At the top of your entry file (index.js or app.js)
require('dotenv').config();
// Connect to database
connectDB();

// Route files
const authRoutes = require('./src/routes/auth.routes');
const patientRoutes = require('./src/routes/patient.routes');
const reportRoutes = require('./src/routes/report.routes');
const invoiceRoutes = require('./src/routes/invoice.routes');
const appointmentRoutes = require('./src/routes/Appointment.routes');
const doctorRoutes = require('./src/routes/Doctor.routes');
const dashboardRoutes = require("./src/routes/Dashboard.routes")

const app = express();

// Body parser
app.use(express.json());

// Dev logging middleware
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Enable CORS
app.use(cors());

// Mount routers
app.use('/api/auth', authRoutes);
app.use('/api/patients', patientRoutes);
app.use('/api/reports', reportRoutes);
app.use('/api/invoices', invoiceRoutes);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/doctors', doctorRoutes);
app.use('/api/dashboard',dashboardRoutes);


// Base route
app.get('/', (req, res) => {
  res.json({
    success: true,
    message: 'API running successfully'
  });
});

// Simple error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({
    success: false,
    message: 'Server error'
  });
});

// Handle 404 routes
app.use((req, res) => {
  res.status(404).json({
    success: false,
    message: 'Route not found'
  });
});

module.exports = app;